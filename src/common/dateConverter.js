let dateConverter = {
  getDDMMYYYY(dateSting) {
    const date = new Date(dateSting);
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    }
    return date.toLocaleString('ru', options)
  }
}

export default dateConverter