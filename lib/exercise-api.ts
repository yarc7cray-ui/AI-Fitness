const BASE = 'https://exercisedb-api-sand-six.vercel.app'

async function fetchExternal(path: string) {
  const url = `${BASE}${path}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Exercise API error')
  return res.json()
}

export async function searchExercises(query: string) {
  return fetchExternal(`/exercises/name/${encodeURIComponent(query)}`)
}

export async function listExercisesByBodyPart(bodyPart: string) {
  return fetchExternal(`/exercises/bodyPart/${encodeURIComponent(bodyPart)}`)
}

export async function getExerciseById(id: string) {
  return fetchExternal(`/exercises/exercise/${encodeURIComponent(id)}`)
}

export async function listBodyParts() {
  return fetchExternal('/exercises/bodyPartList')
}

export async function listTargetList() {
  return fetchExternal('/exercises/targetList')
}

export async function listEquipmentList() {
  return fetchExternal('/exercises/equipmentList')
}

export async function listExercisesByTarget(target: string) {
  return fetchExternal(`/exercises/target/${encodeURIComponent(target)}`)
}

export async function listExercisesByEquipment(equipment: string) {
  return fetchExternal(`/exercises/equipment/${encodeURIComponent(equipment)}`)
}
