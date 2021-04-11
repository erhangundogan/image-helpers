import verifyUrls from '../verifyUrls';
import testUrl from '../testUrl';

jest.mock('../testUrl');

describe('verifyUrls', () => {
  afterEach(() => jest.clearAllMocks());

  test('empty result', async () => {
    await expect(verifyUrls([])).resolves.toEqual([]);
    await expect(verifyUrls(null)).resolves.toEqual([]);
    await expect(verifyUrls(undefined)).resolves.toEqual([]);
  })

  test.only('return URLs having requiredOrigin', async () => {
    await expect(verifyUrls([
      'http://www.google.com',
      'https://www.google.com/',
      'http://www.github.com',
      'https://www.github.com/foo'
    ], { requiredOrigin: 'https://www.github.com/' })).resolves.toEqual([
      'https://www.github.com/foo'
    ]);
  })

  test('unique urls return', async () => {
    await expect(verifyUrls([
      'https://www.github.com',
      'https://www.github.com/',
      'https://www.github.com/foo'
    ])).resolves.toEqual([
      'https://www.github.com/',
      'https://www.github.com/foo'
    ]);
  })

  test('unique urls with test', async () => {
    (testUrl as jest.Mock).mockResolvedValue(true)
    await expect(verifyUrls([
      'https://www.github.com',
      'https://www.github.com/topics'
    ], { testUrls: true })).resolves.toEqual([
      'https://www.github.com/',
      'https://www.github.com/topics'
    ]);
  })

  test('invalid items not added', async () => {
    const errorObject = { error: '__ERROR__' };
    (testUrl as jest.Mock).mockRejectedValue(errorObject);
    // @ts-ignore
    global.console = {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn()
    }
    await expect(verifyUrls(['https://www.github.com'], { testUrls: true })).resolves.toEqual([]);
    expect(console.error).toBeCalledTimes(1);
    expect(console.error).toBeCalledWith(errorObject)
  })

  test('invalid items hides error depending on the option', async () => {
    const errorObject = { error: '__ERROR__' };
    (testUrl as jest.Mock).mockRejectedValue(errorObject);
    // @ts-ignore
    global.console = {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn()
    }
    await expect(verifyUrls(
      ['https://www.github.com'],
      { testUrls: true, ignoreRequestErrors: true }
    )).resolves.toEqual([]);
    expect(console.error).toBeCalledTimes(0);
  })
});
