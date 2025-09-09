import useSWR from 'swr'

const fetcher = (url: string, init?: RequestInit) => fetch(url, init).then(r => r.json())

export function useWorkouts(params?: { from?: string, to?: string }) {
  const qs = params ? `?${new URLSearchParams(Object.fromEntries(Object.entries(params).filter(([,v])=>v!=null)) as any).toString()}` : ''
  const { data, error, mutate } = useSWR(`/api/workouts${qs}`, fetcher)
  return { workouts: data?.workouts || [], loading: !error && !data, error, mutate }
}

export async function createWorkout(payload: any) {
  const res = await fetch('/api/workouts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
  return res.json()
}

export async function updateWorkout(payload: any) {
  const res = await fetch('/api/workouts', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
  return res.json()
}

export async function deleteWorkout(id: string) {
  const res = await fetch(`/api/workouts?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
  return res.json()
}
