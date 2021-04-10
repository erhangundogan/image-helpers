import requestImage from '../requestImage';
import createImage from '../createImage';

jest.mock('../createImage');

describe('requestImage', () => {
  const fetch = jest.fn();
  const FileReader = jest.fn();
  const addEventListener = jest.fn();
  const readAsDataURL = jest.fn();
  const imageData = {
    size: 1024,
    type: 'image/jpeg',
    time: 1617960172222,
    url: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=634&q=80'
  };

  beforeEach(() => {
    delete global.fetch;
    global.fetch = fetch;
    delete global.FileReader;
    // @ts-ignore
    global.FileReader = FileReader;
    // @ts-ignore
    (createImage as jest.Mock).mockResolvedValue(imageData);
    fetch.mockResolvedValue({ blob: jest.fn(() => new Blob()) });
    FileReader.mockImplementation(() => ({
      addEventListener,
      readAsDataURL
    }));
    readAsDataURL.mockImplementation(() => void 0);
    addEventListener.mockImplementation((event, callback) => callback(imageData));
  });

  afterAll(() => jest.clearAllMocks());

  const url = 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=634&q=80';

  test('resolves with default options', async () => {
    await expect(requestImage(url)).resolves.toEqual(imageData);
    expect(fetch).toBeCalledWith(url, { 'cache': 'force-cache' });
  });
});
