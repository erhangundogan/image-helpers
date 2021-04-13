import 'whatwg-fetch';
import requestImage from './requestImage';
import createImage, { ImageType } from './createImage';

export interface FetchImageOptionsPropsType {
  tryCors?: boolean;
  generateHash?: boolean;
  fetchOptions?: RequestInit;
}

const fetchImage = async (
  imageUrl: string,
  options: FetchImageOptionsPropsType = { tryCors: false, generateHash: false, fetchOptions: {} }
): Promise<ImageType | null> => {
  if (!imageUrl) {
    return null;
  }

  if (options.tryCors) {
    return await requestImage(imageUrl, options);
  } else {
    return await createImage(imageUrl);
  }
};

export default fetchImage;
