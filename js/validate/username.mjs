export function validateUsername(userName) {
  const regEx = /^[a-zåøæA-ZÅØÆÑ_]{5,40}$/;
  const patternMatches = regEx.test(userName);
  return patternMatches;
}
