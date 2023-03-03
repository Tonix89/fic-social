/**
 * This function validata a string if it matches the regular expression format.
 * @param {String} userName This is string of username.
 * @returns  { boolean} Returns true if the string matches the regular expression and return false if it is not.
 */
export function validateUsername(userName) {
  const regEx = /^[a-zåøæA-ZÅØÆÑ_]{5,40}$/;
  const patternMatches = regEx.test(userName);
  return patternMatches;
}
