import 'whatwg-fetch';

export interface ImageType {
  url: string;
  width: number;
  height: number;
  time: number;
  dataUrl?: string;
  size?: number;
  type?: string;
  hash?: number | null;
}

const createImage = (url: string, imageData: any = {}): Promise<ImageType> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => {
      const data = {
        ...imageData,
        width: image.naturalWidth,
        height: image.naturalHeight,
        time: Date.now(),
        url
      };
      resolve(data);
    });
    image.addEventListener('error', (err) => {
      reject(err);
    });
    image.src = url;
  });
};

export default createImage;
