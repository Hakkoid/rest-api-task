import { apiUrl } from './../constants/api'

const options = {
  headers: {
    'X-CS-Dealer-Id-Only': '1'
  }
}

const defaultParams = {
  state: 'active',
  hidden: 'false',
  group: 'new'
}

export async function getVehicles(page = 0, pageSize = 10) {
  const params = {
    ...defaultParams,
    page,
    per_page: pageSize
  }
  
  const query = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')

  const response = await fetch(`${apiUrl}/vehicles/?${query}`, options)
  const cars = await response.json()
  const totalCount = response.headers.get('X-Total-Count')

  return {
    cars,
    totalCount
  }
}
