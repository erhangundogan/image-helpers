import validateUrl from './validateUrl';
import testUrl from './testUrl';

export interface VerifyUrlPropsType {
  maxFileSize?: number;
  ignoreRequestErrors?: boolean;
  requestUrl?: boolean;
  requiredOrigin?: string | undefined;
}

const verifyUrl = async (url: string, options: VerifyUrlPropsType = {}): Promise<string> => {
  if (!url) {
    return null;
  }

  // maxFileSize 10MB (10485760 = 10 * 1024 * 1024)
  const { maxFileSize = 10485760, ignoreRequestErrors = false, requestUrl = false, requiredOrigin } = options;

  try {
    const validatedUrl = validateUrl(url, requiredOrigin);

    if (!validatedUrl) {
      return null;
    }

    if (!requestUrl) {
      return validatedUrl;
    }

    if (await testUrl(validatedUrl, maxFileSize)) {
      return validatedUrl;
    }
  } catch (err) {
    if (!ignoreRequestErrors) {
      console.error(err);
    }
  }

  return null;
};

export default verifyUrl;
