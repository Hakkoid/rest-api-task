import { apiUrl } from '../constants/api'
import { mapVehicle } from '../helpers/mapping'

const options = {
  headers: {
    'X-CS-Dealer-Id-Only': '1',
  },
}

const defaultParams = {
  state: 'active',
  hidden: 'false',
  group: 'new',
}

export async function fetchVehicles(page = 0, pageSize = 10) {
  const params = {
    ...defaultParams,
    page,
    per_page: pageSize,
  }

  const query = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')

  try {
    const response = await fetch(`${apiUrl}/vehicles/?${query}`, options)
    const vehicles = await response.json()
    const formatedVehicles = vehicles.map(mapVehicle)

    const totalCount = response.headers.get('X-Total-Count')

    return {
      vehicles: formatedVehicles,
      totalCount: parseInt(totalCount, 10),
    }
  } catch (e) {
    console.error(e)

    return {
      vehicles: [],
      totalCount: null,
    }
  }
}
