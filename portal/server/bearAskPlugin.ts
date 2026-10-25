import type { IncomingMessage, ServerResponse } from 'node:http';
import { resolve } from 'node:path';
import type { Plugin } from 'vite';
import { loadEnv } from 'vite';
import { handleBearAsk } from './bearAskHandler';

const ASK_PATH = '/api/bear-ask';

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

export const bearAskPlugin = (): Plugin => ({
  name: 'bear-ask',
  configureServer(server) {
    const env = loadEnv(server.config.mode, server.config.root, '');
    const key = env.DEEPSEEK_API_KEY ?? '';
    const bearRoot = resolve(server.config.root, '..');

    server.middlewares.use(async (request, response, next) => {
      const url = request.url?.split('?')[0];
      if (url !== ASK_PATH) {
        next();
        return;
      }

      let question = '';
      let page = '';
      let props = '';
      if (request.method === 'POST') {
        try {
          const body = JSON.parse(await readJson(request)) as { question?: string; page?: string; props?: string };
          question = typeof body.question === 'string' ? body.question : '';
          page = typeof body.page === 'string' ? body.page.slice(0, 200) : '';
          props = typeof body.props === 'string' ? body.props.slice(0, 1200) : '';
        } catch {
          sendJson(response, 400, { error: 'Send a question.' });
          return;
        }
      }

      const result = await handleBearAsk({
        method: request.method ?? 'GET',
        question,
        page,
        props,
        ip: clientIp(request),
        key,
        bearRoot,
      });
      sendJson(response, result.status, result.body);
    });
  },
});
