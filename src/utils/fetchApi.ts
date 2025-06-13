export async function fetchApi<T>(url: string): Promise<{ data: T | null; error: string | null }> {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network response was not ok');
    const json = await res.json();
    return { data: json, error: null };
  } catch (err) {
    return { data: null, error: (err as Error).message };
  }
}
