import { handleBearAsk } from '../portal/server/bearAskHandler';

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

export const maxDuration = 60;

export default async function handler(request: ApiRequest, response: ApiResponse) {
  const raw = request.body?.question;
  const result = await handleBearAsk({
    method: request.method ?? 'GET',
    question: typeof raw === 'string' ? raw : '',
    ip: clientIp(request),
    key: process.env.DEEPSEEK_API_KEY ?? '',
    bearRoot: process.cwd(),
  });
  response.status(result.status).json(result.body);
}
