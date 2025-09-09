const BASE = 'https://exercisedb-api-sand-six.vercel.app'

export async function searchExercises(query: string) {
  const url = `${BASE}/exercises/name/${encodeURIComponent(query)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Exercise API error')
  return res.json()
}

export async function listExercisesByBodyPart(bodyPart: string) {
  const url = `${BASE}/exercises/bodyPart/${encodeURIComponent(bodyPart)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Exercise API error')
  return res.json()
}

export async function getExerciseById(id: string) {
  const url = `${BASE}/exercises/exercise/${encodeURIComponent(id)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Exercise API error')
  return res.json()
}

export async function listBodyParts() {
  const url = `${BASE}/exercises/bodyPartList`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Exercise API error')
  return res.json()
}
