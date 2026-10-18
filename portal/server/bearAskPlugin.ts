import { execFile } from 'node:child_process';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { resolve } from 'node:path';
import type { Plugin } from 'vite';
import { loadEnv } from 'vite';

const ASK_PATH = '/api/bear-ask';
const ASK_LIMIT = 5;
const QUESTION_MAX = 600;
const REFUSAL = 'Ask a question about Bear.';
const DEEPSEEK_URL = 'https://api.deepseek.com/chat/completions';
const DEEPSEEK_MODEL = 'deepseek-chat';
const NPM_PACKAGE = '@forgedevstack/bear';
const DOCS = 'https://bearui.com';
const FORGE_DOCS = 'https://forgedevstack.com/bear';

const QUESTION_WORD = /[?]|\b(what|how|why|which|when|where|who|can|could|does|do|did|is|are|should|would|will|explain|describe)\b/i;
const OTHER_LIB = /\b(harbor|grid[-\s]?table|rail|compass|synapse|kiln|lingo|aerocraft|torch|ink|calendar|kanban|gitforge|lintforge|anvil|warden|forge\s?form|forge\s?query)\b/i;
const BEAR_TOPIC = /\b(bear|button|alert|theme|modal|drawer|input|select|tooltip|chart|hook|provider|component|icon|typography|card|badge|switch|checkbox|dialog|toast|accordion|tabs|avatar|chip|menu|navbar|sidebar|variant|prop|install|chat|overlay|popover|skeleton|progress|slider|radio|textarea|dropdown|breadcrumb|pagination|table|color|colour|dark|light|style)\b/i;
const STOP = new Set(['how', 'can', 'the', 'what', 'does', 'did', 'for', 'and', 'with', 'you', 'change', 'from', 'this', 'that', 'are', 'use', 'using']);

const counts = new Map<string, number>();

interface AskSource {
  label: string;
  href: string;
}

const readJson = (request: IncomingMessage): Promise<string> =>
  new Promise((resolveBody, reject) => {
    const chunks: Buffer[] = [];
    request.on('data', (chunk: Buffer) => chunks.push(chunk));
    request.on('end', () => resolveBody(Buffer.concat(chunks).toString('utf8')));
    request.on('error', reject);
  });

const sendJson = (response: ServerResponse, status: number, body: unknown) => {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(body));
};

const clientIp = (request: IncomingMessage): string => {
  const forwarded = request.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) return forwarded.split(',')[0].trim();
  return request.socket.remoteAddress ?? 'unknown';
};

const isBearQuestion = (text: string): boolean => {
  const trimmed = text.trim();
  if (OTHER_LIB.test(trimmed)) return false;
  return QUESTION_WORD.test(trimmed) && BEAR_TOPIC.test(trimmed);
};

const searchTerms = (question: string): string => {
  const words = question.toLowerCase().match(/[a-z0-9]{3,}/g) ?? [];
  return [...new Set(words.filter((word) => !STOP.has(word)))].slice(0, 6).join('|');
};

const runRg = (bearRoot: string, pattern: string): Promise<string> =>
  new Promise((done) => {
    execFile(
      'rg',
      ['-n', '-i', '-C', '2', '-m', '12', '--glob', '!**/node_modules/**', '--glob', '!**/dist/**', '--glob', '!**/portal/**', pattern, 'src'],
      { cwd: bearRoot, timeout: 5000, maxBuffer: 180_000 },
      (_error, stdout) => done((stdout ?? '').slice(0, 5000)),
    );
  });

const fetchText = async (url: string): Promise<string> => {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(7000),
    headers: {
      Accept: 'text/html,application/json',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    },
  });
  if (!response.ok) return '';
  return response.text();
};

const researchBear = async (bearRoot: string, question: string): Promise<{ notes: string; sources: AskSource[] }> => {
  const google = `https://www.google.com/search?q=${encodeURIComponent(`${question} site:bearui.com`)}`;
  const sources: AskSource[] = [
    { label: 'bearui.com', href: DOCS },
    { label: 'Forge Bear', href: FORGE_DOCS },
    { label: NPM_PACKAGE, href: `https://www.npmjs.com/package/${NPM_PACKAGE}` },
    { label: 'Google', href: google },
  ];
  const notes: string[] = [
    'Bear only. Package @forgedevstack/bear. Docs https://bearui.com. Forge docs https://forgedevstack.com/bear.',
    'Button color comes from variant (primary, secondary, success, warning, danger) or from BearProvider theme.colors. Do not answer about Harbor, Grid Table, Rail, Calendar, or any library other than Bear.',
  ];

  const [npmBody, searchHtml, sourceHits] = await Promise.all([
    fetchText('https://registry.npmjs.org/@forgedevstack%2Fbear').catch(() => ''),
    fetchText(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(`${question} site:bearui.com`)}`).catch(() => ''),
    runRg(bearRoot, searchTerms(question) || 'Button'),
  ]);

  if (npmBody.startsWith('{')) {
    try {
      const data = JSON.parse(npmBody) as { description?: string; 'dist-tags'?: { latest?: string }; readme?: string };
      notes.push(`npm ${NPM_PACKAGE}@${data['dist-tags']?.latest ?? ''} ${data.description ?? ''}`);
      if (data.readme) notes.push(data.readme.replace(/\s+/g, ' ').slice(0, 700));
    } catch {
      notes.push('npm lookup failed');
    }
  }
  if (sourceHits) notes.push(`Bear source:\n${sourceHits}`);

  const links = [...searchHtml.matchAll(/uddg=([^&"]+)/g)]
    .map((match) => decodeURIComponent(match[1]))
    .filter((href) => href.startsWith('https://bearui.com'))
    .slice(0, 3);
  for (const href of links) {
    sources.push({ label: 'bearui.com', href });
  }

  const seen = new Set<string>();
  return {
    notes: notes.join('\n\n'),
    sources: sources.filter((source) => {
      if (seen.has(source.href)) return false;
      seen.add(source.href);
      return true;
    }),
  };
};

const askDeepSeek = async (key: string, question: string, notes: string): Promise<string> => {
  const response = await fetch(DEEPSEEK_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: DEEPSEEK_MODEL,
      temperature: 0.2,
      max_tokens: 1600,
      messages: [
        {
          role: 'system',
          content: [
            'You answer only questions about Bear, the React UI kit @forgedevstack/bear.',
            'If the message is not a Bear question, including greetings, weather, or any other Forge library, reply with exactly:',
            REFUSAL,
            'For a Bear question, write three short paragraphs about the real props, then one fenced tsx example from the research.',
            'Link https://bearui.com, https://forgedevstack.com/bear, and the npm package. Do not invent props.',
            '',
            notes,
          ].join('\n'),
        },
        { role: 'user', content: question },
      ],
    }),
  });
  if (!response.ok) throw new Error(`DeepSeek ${response.status}`);
  const payload = (await response.json()) as { choices?: { message?: { content?: string } }[] };
  const answer = payload.choices?.[0]?.message?.content?.trim();
  if (!answer) throw new Error('DeepSeek empty');
  return answer;
};

export const bearAskPlugin = (): Plugin => ({
  name: 'bear-ask',
  configureServer(server) {
    const env = loadEnv(server.config.mode, server.config.root, '');
    const key = env.DEEPSEEK_API_KEY;
    const bearRoot = resolve(server.config.root, '..');

    server.middlewares.use(async (request, response, next) => {
      const url = request.url?.split('?')[0];
      if (url !== ASK_PATH || request.method !== 'POST') {
        next();
        return;
      }

      const ip = clientIp(request);
      const used = counts.get(ip) ?? 0;
      const remaining = Math.max(0, ASK_LIMIT - used);
      if (remaining === 0) {
        sendJson(response, 429, { error: 'This address has used its 5 questions.', remaining: 0 });
        return;
      }

      let question = '';
      try {
        const body = JSON.parse(await readJson(request)) as { question?: string };
        question = typeof body.question === 'string' ? body.question.trim() : '';
      } catch {
        sendJson(response, 400, { error: 'Send a question.', remaining });
        return;
      }

      if (!question || question.length > QUESTION_MAX) {
        sendJson(response, 400, { error: 'Send one short question about Bear.', remaining });
        return;
      }
      if (!isBearQuestion(question)) {
        sendJson(response, 200, { answer: REFUSAL, remaining });
        return;
      }
      if (!key) {
        sendJson(response, 500, { error: 'DeepSeek is not configured.', remaining });
        return;
      }

      try {
        const research = await researchBear(bearRoot, question);
        let answer = await askDeepSeek(key, question, research.notes);
        if (!answer.includes('```') && answer !== REFUSAL) {
          answer = await askDeepSeek(key, `${question}\n\nRewrite with a complete tsx example.`, research.notes);
        }
        const nextUsed = used + 1;
        counts.set(ip, nextUsed);
        sendJson(response, 200, {
          answer,
          sources: answer === REFUSAL ? [] : research.sources,
          remaining: ASK_LIMIT - nextUsed,
        });
      } catch {
        sendJson(response, 502, { error: 'Bear did not answer. Try again.', remaining });
      }
    });
  },
});
