import testUrl from '../testUrl';

describe('testUrl', () => {
  const fetch = jest.fn();

  beforeEach(() => {
    delete global.fetch;
    global.fetch = fetch;
  });

  test('URL test is OK', async () => {
    fetch.mockResolvedValue({
      ok: true,
      headers: []
    });
    await expect(testUrl('https://www.example.com')).resolves.toEqual(true);
  });

  test('URL test is OK', async () => {
    fetch.mockResolvedValue({
      ok: true,
      headers: [
        { 'content-type': 'image/jpeg' },
        { 'content-length': 1048576 }
      ]
    });
    await expect(testUrl('https://www.example.com')).resolves.toEqual(true);
  });

  test('URL test is not OK', async () => {
    // @ts-ignore
    global.console = {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn()
    }
    fetch.mockResolvedValue({
      ok: false
    });
    await expect(testUrl('https://www.example.com')).resolves.toEqual(false);
    expect(console.error).toBeCalledTimes(1);
  });

  test('URL test is not OK', async () => {
    // @ts-ignore
    global.console = {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn()
    }
    fetch.mockRejectedValue({ error: 'ERROR' });
    await expect(testUrl('https://www.example.com')).resolves.toEqual(false);
    expect(console.error).toBeCalledTimes(1);
  });
});
