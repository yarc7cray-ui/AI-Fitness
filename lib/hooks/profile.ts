import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export function useProfile() {
  const { data, error, mutate } = useSWR('/api/profile', fetcher)
  return { profile: data?.profile, loading: !error && !data, error, mutate }
}
