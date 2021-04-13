import 'whatwg-fetch';
import requestImage from './requestImage';
import createImage from './createImage';
import { FetchImagesCorsOptionsPropsType, FetchImagesOptionsPropsType, ImageType } from './types';

const fetchImages = async (
  imageUrls: string[] = [],
  options: FetchImagesOptionsPropsType = { tryCors: false, failEarly: false },
  corsOptions: FetchImagesCorsOptionsPropsType = { generateHash: false, fetchOptions: {} }
): Promise<Array<ImageType>> => {
  const promises = [];

  if (imageUrls.length === 0) {
    return [];
  }

  for (const imageUrl of imageUrls) {
    if (options.tryCors) {
      promises.push(requestImage(imageUrl, corsOptions));
    } else {
      promises.push(createImage(imageUrl));
    }
  }

  if (options?.failEarly) {
    return await Promise.all(promises);
  }

  // Promise.allSettled requires ES2020
  const result = await Promise.allSettled(promises);
  return result.reduce((arr, image) => {
    if (image.status === 'fulfilled') {
      return [...arr, image.value];
    }
    return arr;
  }, []);
};

export default fetchImages;
