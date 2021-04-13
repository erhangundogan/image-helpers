import fetchImage from '../fetchImage';
import createImage from '../createImage';
import requestImage from '../requestImage';

jest.mock('../createImage');
jest.mock('../requestImage');

describe('fetchImage', () => {
  const url = 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=600&q=80';
  const newImageData = {
    height: 100,
    width: 100,
    time: 1617960172222,
    url: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=600&q=80'
  };
  const newImageDataWithCors = {
    width: 100,
    height: 100,
    size: 1024,
    type: 'image/jpeg',
    time: 1617960172222,
    url: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=600&q=80'
  };

  beforeEach(() => {
    (createImage as jest.Mock).mockResolvedValue(newImageData);
    (requestImage as jest.Mock).mockResolvedValue(newImageDataWithCors);
  });

  afterEach(() => jest.clearAllMocks());

  test('resolves null when there is no URL specified', async () => {
    await expect(fetchImage('')).resolves.toEqual(null);
  });

  test('resolves images via Promise.allSettled', async () => {
    await expect(fetchImage(url)).resolves.toEqual(newImageData);
  });

  test('resolves images with CORS', async () => {
    await expect(fetchImage(url, { tryCors: true })).resolves.toEqual(newImageDataWithCors);
  });
});
