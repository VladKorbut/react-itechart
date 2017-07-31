export default {
  strToBool (str) {
    if (str.toString().toLowerCase() === 'true') {
      return true
    }
    return false
  },

  boolToStr (condition) {
    return (!!condition).toString().toUpperCase()
  }
}
