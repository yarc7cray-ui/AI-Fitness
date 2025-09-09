export async function migrateFromLocal(exported: any) {
  const res = await fetch('/api/migrate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(exported) })
  const json = await res.json()
  if (json?.ok) {
    try { localStorage.setItem('migrated', 'true') } catch (e) { /* ignore */ }
  }
  return json
}
