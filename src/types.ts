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
export interface FetchImageOptionsPropsType {
  tryCors?: boolean;
  generateHash?: boolean;
  fetchOptions?: RequestInit;
}
export interface FetchImagesOptionsPropsType {
  tryCors?: boolean;
  failEarly?: boolean;
}
export interface FetchImagesCorsOptionsPropsType {
  generateHash?: boolean;
  fetchOptions?: RequestInit;
}
export interface RequestImageOptionsPropsType {
  generateHash?: boolean;
  fetchOptions?: RequestInit;
}
export interface VerifyUrlPropsType {
  maxFileSize?: number;
  ignoreRequestErrors?: boolean;
  requestUrl?: boolean;
  requiredOrigin?: string | undefined;
}
