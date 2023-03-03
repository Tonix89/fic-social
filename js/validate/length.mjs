/**
 * This function validate a string if the string matches a certain length.
 * @param {String} value The value that needs to validate.
 * @param {Number} len The valid length that value should match.
 * @returns {boolean} Return true if the value's length matches the valid length required and return false if not.
 */
export function validateLength(value, len) {
  if (value.trim().length >= len) {
    return true;
  } else {
    return false;
  }
}
