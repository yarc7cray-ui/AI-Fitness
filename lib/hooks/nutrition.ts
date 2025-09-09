import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export function useMeals(params?: { from?: string, to?: string }) {
  const qs = params ? `?${new URLSearchParams(Object.fromEntries(Object.entries(params).filter(([,v])=>v!=null)) as any).toString()}` : ''
  const { data, error, mutate } = useSWR(`/api/meals${qs}`, fetcher)
  return { meals: data?.meals || [], loading: !error && !data, error, mutate }
}

export async function createMeal(payload: any) {
  const res = await fetch('/api/meals', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
  return res.json()
}

export async function updateMeal(payload: any) {
  const res = await fetch('/api/meals', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
  return res.json()
}

export async function deleteMeal(id: string) {
  const res = await fetch(`/api/meals?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
  return res.json()
}
