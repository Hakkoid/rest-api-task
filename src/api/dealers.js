import { apiUrl } from '../constants/api'
import { mapDealer } from '../helpers/mapping'

export async function fetchDealers(ids) {
  try {
    const response = await fetch(`${apiUrl}/dealers/?id__in=${ids.join(',')}`)
    const dealers = await response.json()

    const formatedDealers = dealers.map(mapDealer)
    return formatedDealers
  } catch (e) {
    console.error(e)

    return []
  }
}
