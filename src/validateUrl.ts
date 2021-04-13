import * as URI from 'uri-js';

const validateUrl = (url, requiredOrigin) => {
  try {
    const parsedUrl = URI.parse(url);
    if (parsedUrl.reference !== 'absolute') {
      return null;
    }
    const normalizedUrl = URI.normalize(url);

    if (requiredOrigin) {
      const { scheme, host } = URI.parse(requiredOrigin);
      const originUrl = URI.serialize({ scheme: parsedUrl.scheme, host: parsedUrl.host });
      if (!URI.equal(originUrl, URI.serialize({ scheme, host }))) {
        return null;
      }
    }
    return normalizedUrl;
  } catch (err) {
    return null;
  }
};

export default validateUrl;
