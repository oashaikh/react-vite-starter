/**
 * Tiny typed fetch wrapper. Replace with your real API client / TanStack Query / etc.
 */
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

export async function getJson<T>(url: string, init?: RequestInit): Promise<T> {
  const resp = await fetch(url, {
    ...init,
    headers: { Accept: "application/json", ...init?.headers },
  });
  if (!resp.ok) {
    throw new ApiError(resp.status, `${resp.status} ${resp.statusText}`);
  }
  return (await resp.json()) as T;
}
