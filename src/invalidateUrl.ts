import * as URI from 'uri-js';

const invalidateUrl = (url) => {
  const parsedUrl = URI.parse(url);
  if (parsedUrl.reference !== 'absolute') {
    return null;
  }
  // normalize URL
  return URI.normalize(url);
}

export default invalidateUrl;
