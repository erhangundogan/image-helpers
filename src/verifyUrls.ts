import invalidateUrl from './invalidateUrl';
import testUrl from './testUrl';

export interface VerifyUrlsPropsType {
  maxFileSize?: number;
  ignoreRequestErrors?: boolean;
  testUrls?: boolean
}

const verifyUrls = async (urls: Array<string>, options: VerifyUrlsPropsType = {}): Promise<Array<string>> => {
  const verifiedUrls = new Set<string>();

  if (!Array.isArray(urls) || urls.length === 0) {
    return [];
  }

  // maxFileSize 10MB (10485760 = 10 * 1024 * 1024)
  const { maxFileSize = 10485760, ignoreRequestErrors = false, testUrls = false } = options;

  const urlSet = new Set(urls);
  for (const url of urlSet) {
    try {
      const normalizedUrl = invalidateUrl(url);

      if (!testUrls) {
        verifiedUrls.add(normalizedUrl);
        continue;
      }
      if (await testUrl(normalizedUrl, maxFileSize)) {
        verifiedUrls.add(normalizedUrl);
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
