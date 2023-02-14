export function validateEmail(email) {
  const regEx = /^[a-zA-Z0-9._%+-]+@(stud\.noroff|noroff)\.no$/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}
