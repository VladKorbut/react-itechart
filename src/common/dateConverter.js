let dateConverter = {
  getDDMMYYYY(date) {
    let options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    }
    return date.toLocaleString('ru', options)
  }
}

export default dateConverter