/**
 * This function validate an email address using regular expression.
 * @param {String} email This is the value of email need to validate.
 * @returns {boolean} This returns true if the value matches the regular expression and false if it is not.
 */
export function validateEmail(email) {
  const regEx = /^[a-zA-Z0-9._%+-]+@(stud\.noroff|noroff)\.no$/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}
