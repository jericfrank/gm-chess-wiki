import { fetchApi } from '../utils/fetchApi';

function notNull<T>(value: T | null): value is T {
  return value !== null;
}

export async function batchFetch<T>(
  ids: string[],
  urlBuilder: (id: string) => string,
): Promise<T[]> {
  const fetchItem = async (id: string): Promise<T | null> => {
    try {
      const response = await fetchApi<T>(urlBuilder(id));
      return response.data;
    } catch (err) {
      console.error(`Error fetching item with id ${id}:`, err);
      return null;
    }
  };

  const results = await Promise.all(ids.map(fetchItem));

  return results.filter(notNull);
}
