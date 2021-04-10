import fetchImages from '../fetchImages';
import createImage from '../createImage';
import requestImage from '../requestImage';

jest.mock('../createImage');
jest.mock('../requestImage');

describe('fetchImages', () => {
  const urls = [
    'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=634&q=80'
  ];
  const imageData = {
    width: 100,
    height: 100,
    time: 1617960172222,
    url: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=634&q=80'
  };
  const imageDataWithCors = {
    width: 100,
    height: 100,
    size: 1024,
    type: 'image/jpeg',
    time: 1617960172222,
    url: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=634&q=80'
  };

  beforeEach(() => {
    (createImage as jest.Mock).mockResolvedValue(imageData);
    (requestImage as jest.Mock).mockResolvedValue(imageDataWithCors);
  });

  afterEach(() => jest.clearAllMocks());

  test('resolves empty array when there is no URL specified', async () => {
    await expect(fetchImages()).resolves.toEqual([]);
  })

  test('resolves images via Promise.allSettled', async () => {
    const spy = jest.spyOn(Promise, 'allSettled');
    await expect(fetchImages(urls)).resolves.toEqual([
      imageData
    ]);
    expect(spy).toBeCalledTimes(1);
  })

  test('resolves images via Promise.all', async () => {
    const spy = jest.spyOn(Promise, 'all');
    await expect(fetchImages(urls, { failEarly: true })).resolves.toEqual([
      imageData
    ]);
    expect(spy).toBeCalledTimes(1);
  })

  test('resolves images withC CORS', async () => {
    await expect(fetchImages(urls, { tryCors: true })).resolves.toEqual([
      imageDataWithCors
    ]);
  })
});
