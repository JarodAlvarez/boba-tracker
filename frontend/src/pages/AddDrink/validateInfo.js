// Used to validate user entries
// All sections of the drink form must be filled out
export default function validateInfo(values) {
  let errors = {}

  if (!values.date) {
    errors.date = 'Date required'
  }

  if (!values.drink) {
    errors.drink = 'Drink name required'
  }

  if (!values.price) {
    errors.price = 'Price required'
  }

  if (!values.sweetness) {
    errors.sweetness = 'Sweetness level required'
  }

  const pattern = /^([0-9]{2}-[0-9]{2}-[0-9]{4}$)/
  const validDate = pattern.test(values.date)
  if (!validDate) {
    errors.date = 'Date must be in mm-dd-yyyy format!'
  }

  const value = parseFloat(values.sweetness)
  if (
    value != 0 &&
    value != 0.25 &&
    value != 0.5 &&
    value != 0.75 &&
    value != 1.0
  ) {
    errors.sweetness =
      'Sweetness must have value of 0, 0.25, 0.50, 0.75, or 1.0'
  }

  return errors
}
