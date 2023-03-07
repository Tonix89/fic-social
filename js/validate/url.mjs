/**
 * This function validate the url if it is a valid url or not.
 * @param {URL} media The url of the media.
 * @returns {boolean} Returns true if the media URL is valid url and retrun false if it is not.
 */
export function validateUrl(media) {
  try {
    new URL(media);
    return true;
  } catch (error) {
    return false;
  }
}
