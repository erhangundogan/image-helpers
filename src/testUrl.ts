import 'whatwg-fetch';

const imageRegex = new RegExp(/image\/.*/);

// max 10MB = 10 * 1024 * 1024 bytes
const testUrl = async (url, maxFileSize = 10485760, ignoreRequestErrors = false): Promise<boolean> => {
  try {
    const response = await fetch(url, {
      method: 'HEAD'
    });

    if (response.ok) {
      for (const [key, value] of response.headers.entries()) {
        if (key === 'content-type' && !imageRegex.test(value)) {
          throw new Error(`Response is not an image type. It has ${value} content type`);
        }
        if (key === 'content-length' && +value > maxFileSize) {
          throw new Error(`Response exceeds max file size. It has ${Math.ceil(+value / 1024)}KB`);
        }
      }
      return true;
    }
    throw new Error('Request verification failed.');
  } catch (err) {
    if (!ignoreRequestErrors) {
      console.error('testUrl failed:', err);
    }
    return false;
  }
};

export default testUrl;
