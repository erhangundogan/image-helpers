import createImage from '../createImage';

describe('createImage', () => {
  let dateNowSpy;
  const addEventListener = jest.fn();

  beforeEach(() => {
    dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => 1617960172222);

    const globalImage = global.Image;
    delete global.Image;
    // @ts-ignore
    global.Image = jest.fn(() => ({
      ...globalImage,
      naturalWidth: 100,
      naturalHeight: 100,
      addEventListener
    }));
  })

  afterEach(() => jest.clearAllMocks());

  afterAll(() => dateNowSpy.mockRestore());

  test('resolves if the URL points image resource', async () => {
    const url = 'https://images.unsplash.com/photo-1547986164-81d93de7929c?w=800&q=80';
    addEventListener.mockImplementation((event, callback) => {
      if (event === 'load') {
        callback({
          width: 100,
          height: 100,
          time: 1617960172222,
          url
        })
      }
    });
    await expect(createImage(url)).resolves.toEqual({
      width: 100,
      height: 100,
      time: 1617960172222,
      url
    })
  });
  test('rejects if the URL points invalid resource', async () => {
    const url = 'https://www.google.com';
    addEventListener.mockImplementation((event, callback) => {
      if (event === 'error') {
        callback({
          error: 'Cross origin request blocked'
        })
      }
    });
    await expect(createImage(url)).rejects.toEqual({
      error: 'Cross origin request blocked'
    })
  });
});
