export function validateUrl(media) {
  try {
    new URL(media);
    return true;
  } catch (error) {
    return false;
  }
}
