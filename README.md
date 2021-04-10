image-helpers
=============

[![License][license-src]][license-href]

Helper methods to receive and create HTMLImageElements 

# Methods

## fetchImages

```typescript
export interface FetchImagesOptionsPropsType {
  tryCors?: boolean;
  failEarly?: boolean;
}
export interface FetchImagesCorsOptionsPropsType {
  generateHash?: boolean;
  fetchOptions?: RequestInit;
}
const fetchImages = async (
  imageUrls: string[] = [],
  options: FetchImagesOptionsPropsType = { tryCors: false, failEarly: false },
  corsOptions: FetchImagesCorsOptionsPropsType = { generateHash: false, fetchOptions: { cache: 'force-cache' } }
): Promise<Array<ImageType>> => {}
```

## verifyUrls

```typescript
export interface VerifyUrlsPropsType {
  maxFileSize?: number;
  ignoreRequestErrors?: boolean;
  testUrls?: boolean
}
const verifyUrls = async (urls: Array<string>, options: VerifyUrlsPropsType = {}): Promise<Array<string>> => {}
```

# Install
```bash
npm install image-helpers
```

# Development
```bash
git clone git@github.com:erhangundogan/image-helpers.git
cd image-helpers
npm i
npm run build
npm run test
```

[license-src]: https://img.shields.io/badge/license-MIT-brightgreen.svg
[license-href]: LICENSE.md
