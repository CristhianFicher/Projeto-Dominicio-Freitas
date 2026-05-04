import { createHmac, timingSafeEqual } from 'crypto';

const SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

const base64Url = (value: string) => Buffer.from(value).toString('base64url');

const sign = (payload: string) => createHmac('sha256', SECRET).update(payload).digest('base64url');

export const createToken = (data: Record<string, unknown>) => {
  const header = base64Url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = base64Url(JSON.stringify({ ...data, iat: Math.floor(Date.now() / 1000) }));
  const signature = sign(`${header}.${body}`);
  return `${header}.${body}.${signature}`;
};

export const verifyToken = (token: string) => {
  const [header, body, signature] = token.split('.');
  if (!header || !body || !signature) return null;

  const expected = sign(`${header}.${body}`);
  const sigBuffer = Buffer.from(signature);
  const expBuffer = Buffer.from(expected);
  if (sigBuffer.length !== expBuffer.length) return null;
  const isValid = timingSafeEqual(sigBuffer, expBuffer);
  if (!isValid) return null;

  return JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as Record<string, unknown>;
};
