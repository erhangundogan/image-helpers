import 'whatwg-fetch';
import murmurhash from 'murmurhash';
import createImage, { ImageType } from './createImage';

export interface RequestImageOptionsPropsType {
  generateHash?: boolean;
  fetchOptions?: RequestInit;
}

const requestImage = async (
  url: string,
  options: RequestImageOptionsPropsType = { generateHash: false, fetchOptions: {} }
): Promise<ImageType> => {
  try {
    const { generateHash, fetchOptions } = options;
    const requestOptions: RequestInit = { cache: 'force-cache', mode: 'cors', ...fetchOptions };
    const response = await fetch(url, requestOptions);
    const blob = await response.blob();
    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.addEventListener('load', () => {
        const dataUrl = String(reader.result);
        let hash = null;
        if (generateHash) {
          hash = murmurhash.v3(dataUrl);
        }
        return resolve(createImage(dataUrl, { url, dataUrl, size: blob.size, type: blob.type, hash }));
      });
      reader.readAsDataURL(blob);
    });
  } catch (err) {
    return createImage(url);
  }
};

export default requestImage;
