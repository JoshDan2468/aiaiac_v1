/**
 * Thin API boundary. Phase 1 has no backend, so every call resolves locally.
 * Point `API_BASE_URL` at the real API and flip `USE_MOCK` to false when the
 * backend lands — nothing in the UI layer needs to change.
 */
export const API_BASE_URL = "/api";
export const USE_MOCK = true;

export interface ApiResult<T> {
  ok: boolean;
  data?: T;
  error?: string;
}

export async function apiPost<TBody, TData>(
  path: string,
  body: TBody,
): Promise<ApiResult<TData>> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 700));
    return { ok: true, data: { received: true, path, body } as unknown as TData };
  }

  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) return { ok: false, error: `Request failed (${res.status})` };
    return { ok: true, data: (await res.json()) as TData };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Network error" };
  }
}