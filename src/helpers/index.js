export const filterDuplicate = (arr) => {
  const hash = {}
  return arr.filter((item) => {
    if (!hash[item]) {
      hash[item] = true
      return true
    }

    return false
  })
}

export const getUrlParams = (location) => {
  const searchParams = new URLSearchParams(location.search)
  return Object.fromEntries(searchParams.entries())
}
