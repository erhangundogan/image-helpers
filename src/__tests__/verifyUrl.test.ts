import testUrl from '../testUrl';
import verifyUrl from '../verifyUrl';

jest.mock('../testUrl');

describe('verifyUrl', () => {
  afterEach(() => jest.clearAllMocks());

  test('empty result', async () => {
    await expect(verifyUrl('')).resolves.toEqual(null);
    await expect(verifyUrl(null)).resolves.toEqual(null);
    await expect(verifyUrl(undefined)).resolves.toEqual(null);
  });

  test('resolves URL', async () => {
    await expect(verifyUrl('foo')).resolves.toEqual(null);
  });

  test('rejects URL', async () => {
    await expect(verifyUrl('https://www.google.com')).resolves.toEqual('https://www.google.com/');
  });

  test('resolves URL having requiredOrigin', async () => {
    await expect(
      verifyUrl('https://www.example.com/foo/bar', { requiredOrigin: 'https://www.example.com/' })
    ).resolves.toEqual('https://www.example.com/foo/bar');
  });

  test('rejects URL having no requiredOrigin', async () => {
    await expect(
      verifyUrl('http://www.google.com', { requiredOrigin: 'https://www.github.com/' })
    ).resolves.toEqual(null);
  });

  test('invalid items not added', async () => {
    const errorObject = { error: '__ERROR__' };
    (testUrl as jest.Mock).mockRejectedValue(errorObject);
    // @ts-ignore
    global.console = {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn()
    };
    await expect(verifyUrl('https://www.github.com', { requestUrl: true })).resolves.toEqual(null);
    expect(console.error).toBeCalledTimes(1);
    expect(console.error).toBeCalledWith(errorObject);
  });

  test('invalid items hides error depending on the option', async () => {
    const errorObject = { error: '__ERROR__' };
    (testUrl as jest.Mock).mockRejectedValue(errorObject);
    // @ts-ignore
    global.console = {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn()
    };
    await expect(
      verifyUrl('https://www.github.com', { requestUrl: true, ignoreRequestErrors: true })
    ).resolves.toEqual(null);
    expect(console.error).toBeCalledTimes(0);
  });
});
