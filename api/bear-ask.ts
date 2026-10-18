const ASK_LIMIT = 5;
const QUESTION_MAX = 600;
const REFUSAL = 'Ask a question about Bear.';
const DEEPSEEK_URL = 'https://api.deepseek.com/chat/completions';
const QUESTION_WORD = /[?]|\b(what|how|why|which|when|where|who|can|could|does|do|did|is|are|should|would|will|explain|describe)\b/i;
const OTHER_LIB = /\b(harbor|grid[-\s]?table|rail|compass|synapse|kiln|lingo|aerocraft|torch|ink|calendar|kanban|gitforge|lintforge|anvil|warden|forge\s?form|forge\s?query)\b/i;
const BEAR_TOPIC = /\b(bear|button|alert|theme|modal|drawer|input|select|tooltip|chart|hook|provider|component|icon|typography|card|badge|switch|checkbox|dialog|toast|accordion|tabs|avatar|chip|menu|navbar|sidebar|variant|prop|install|chat|overlay|popover|skeleton|progress|slider|radio|textarea|dropdown|breadcrumb|pagination|table|color|colour|dark|light|style)\b/i;

const counts = new Map<string, number>();

interface ApiRequest {
  method?: string;
  body?: { question?: unknown };
  headers?: Record<string, string | string[] | undefined>;
}

interface ApiResponse {
  status: (code: number) => { json: (body: unknown) => void };
}

const clientIp = (request: ApiRequest): string => {
  const forwarded = request.headers?.['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) return forwarded.split(',')[0].trim();
  if (Array.isArray(forwarded) && forwarded[0]) return forwarded[0].split(',')[0].trim();
  return 'unknown';
};

const askDeepSeek = async (key: string, question: string): Promise<string> => {
  const response = await fetch(DEEPSEEK_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'deepseek-chat',
      temperature: 0.2,
      max_tokens: 1600,
      messages: [
        {
          role: 'system',
          content: [
            'You answer only questions about Bear, the React UI kit @forgedevstack/bear.',
            `If the message is not a Bear question, reply with exactly: ${REFUSAL}`,
            'For a Bear question, write three short paragraphs and one fenced tsx example.',
            'Button color comes from variant (primary, secondary, success, warning, danger) or BearProvider theme.colors. Import from @forgedevstack/bear.',
            'Link https://bearui.com, https://forgedevstack.com/bear, and https://www.npmjs.com/package/@forgedevstack/bear.',
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

export const maxDuration = 60;

export default async function handler(request: ApiRequest, response: ApiResponse) {
  try {
    if (request.method !== 'POST') {
      response.status(405).json({ error: 'Send a question.' });
      return;
    }
    const ip = clientIp(request);
    const used = counts.get(ip) ?? 0;
    const remaining = Math.max(0, ASK_LIMIT - used);
    if (remaining === 0) {
      response.status(429).json({ error: 'This address has used its 5 questions.', remaining: 0 });
      return;
    }
    const question = typeof request.body?.question === 'string' ? request.body.question.trim() : '';
    if (!question || question.length > QUESTION_MAX) {
      response.status(400).json({ error: 'Send one short question about Bear.', remaining });
      return;
    }
    if (OTHER_LIB.test(question) || !QUESTION_WORD.test(question) || !BEAR_TOPIC.test(question)) {
      response.status(200).json({ answer: REFUSAL, remaining });
      return;
    }
    const key = process.env.DEEPSEEK_API_KEY ?? '';
    if (!key) {
      response.status(500).json({ error: 'DeepSeek is not configured.', remaining });
      return;
    }
    const answer = await askDeepSeek(key, question);
    const nextUsed = used + 1;
    counts.set(ip, nextUsed);
    response.status(200).json({
      answer,
      sources: answer === REFUSAL ? [] : [
        { label: 'bearui.com', href: 'https://bearui.com' },
        { label: 'Forge Bear', href: 'https://forgedevstack.com/bear' },
        { label: '@forgedevstack/bear', href: 'https://www.npmjs.com/package/@forgedevstack/bear' },
        { label: 'Google', href: `https://www.google.com/search?q=${encodeURIComponent(`${question} site:bearui.com`)}` },
      ],
      remaining: ASK_LIMIT - nextUsed,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Bear did not answer.';
    response.status(502).json({ error: message });
  }
}
