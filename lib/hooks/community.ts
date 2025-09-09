import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export function useCommunity(params?: { limit?: number }) {
  const qs = params ? `?${new URLSearchParams(Object.fromEntries(Object.entries(params).filter(([,v])=>v!=null)) as any).toString()}` : ''
  const { data, error, mutate } = useSWR(`/api/community${qs}`, fetcher)
  return { posts: data?.posts || [], loading: !error && !data, error, mutate }
}

export async function createPost(payload: any) {
  const res = await fetch('/api/community', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
  return res.json()
}

export async function updatePost(payload: any) {
  const res = await fetch('/api/community', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
  return res.json()
}

export async function deletePost(id: string) {
  const res = await fetch(`/api/community?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
  return res.json()
}
