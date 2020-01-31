import { apiUrl } from './../constants/api'

export async function getDealers(ids) {
  const response = await fetch(`${apiUrl}/dealers/?id__in=${ids.join(',')}`)
  const dealers = await response.json()

  return dealers
}
