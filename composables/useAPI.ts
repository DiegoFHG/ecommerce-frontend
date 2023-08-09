export default async function useAPI<T>(url: string, options?: object) {
  return useFetch<T>(url, {
    baseURL: useRuntimeConfig().public.apiURL,
    ...options,
  });
}
