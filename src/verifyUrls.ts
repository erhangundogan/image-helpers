import validateUrl from './validateUrl';
import testUrl from './testUrl';
import { VerifyUrlPropsType } from './types';

export type VerifyUrlsPropsType = VerifyUrlPropsType;

const verifyUrls = async (urls: Array<string>, options: VerifyUrlsPropsType = {}): Promise<Array<string>> => {
  const verifiedUrls = new Set<string>();

  if (!Array.isArray(urls) || urls.length === 0) {
    return [];
  }

  // maxFileSize 10MB (10485760 = 10 * 1024 * 1024)
  const { maxFileSize = 10485760, ignoreRequestErrors = false, requestUrl = false, requiredOrigin } = options;

  const urlSet = new Set(urls);
  for (const url of urlSet) {
    try {
      const validatedUrl = validateUrl(url, requiredOrigin);

      if (!validatedUrl) {
        continue;
      }

      if (!requestUrl) {
        verifiedUrls.add(validatedUrl);
        continue;
      }
      if (await testUrl(validatedUrl, maxFileSize)) {
        verifiedUrls.add(validatedUrl);
      }
    } catch (err) {
      if (!ignoreRequestErrors) {
        console.error(err);
      }
    }
  }
  return Array.from(verifiedUrls);
};

export default verifyUrls;
