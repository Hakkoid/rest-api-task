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
