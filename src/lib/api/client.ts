import type { ErrorEnvelope, ResponseEnvelope } from '@xeorum/contracts';

const defaultBaseUrl = 'http://localhost:3001/api/v1';

type ApiOptions = {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  body?: unknown;
  requestId?: string;
  adminActor?: string;
};

function getAnonymousIdHeader() {
  if (typeof window === 'undefined') return {};
  const anonymousId = window.localStorage.getItem('xeorum-anonymous-id');
  return anonymousId ? { 'x-anonymous-id': anonymousId } : {};
}

export class ApiError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly error: ErrorEnvelope['error'],
    public readonly requestId?: string
  ) {
    super(error.message);
  }
}

async function apiRequest<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL ?? defaultBaseUrl}${path}`, {
    method: options.method ?? 'GET',
    headers: {
      'content-type': 'application/json',
      ...getAnonymousIdHeader(),
      ...(options.adminActor ? { 'x-admin-actor': options.adminActor } : {}),
      ...(options.requestId ? { 'x-request-id': options.requestId } : {}),
    },
    ...(options.body ? { body: JSON.stringify(options.body) } : {}),
  });

  const payload = (await response.json()) as ResponseEnvelope<T> | ErrorEnvelope;

  if (!response.ok) {
    const errorPayload = payload as ErrorEnvelope;
    throw new ApiError(response.status, errorPayload.error, errorPayload.requestId);
  }

  return (payload as ResponseEnvelope<T>).data;
}

export const apiClient = {
  get: <T>(path: string) => apiRequest<T>(path),
  post: <T>(path: string, body?: unknown, options?: Pick<ApiOptions, 'requestId' | 'adminActor'>) =>
    apiRequest<T>(path, { method: 'POST', body, ...options }),
  patch: <T>(path: string, body?: unknown, options?: Pick<ApiOptions, 'requestId' | 'adminActor'>) =>
    apiRequest<T>(path, { method: 'PATCH', body, ...options }),
  delete: <T>(path: string, body?: unknown, options?: Pick<ApiOptions, 'requestId' | 'adminActor'>) =>
    apiRequest<T>(path, { method: 'DELETE', body, ...options }),
};
