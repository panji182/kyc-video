import CryptoJS from 'crypto-js';

export const toRem = (pxValue: number) => {
  // maesurement for spacing
  //1rem = 16px
  const rem = pxValue / 16;
  return `${rem}rem`;
};

export const toEm = (pxValue: number) => {
  // maesurement for font size
  //1em = 16px
  const em = pxValue / 16;
  return `${em}em`;
};

export const encrypt = (obj: any, secretKey: string) => {
  return CryptoJS.AES.encrypt(JSON.stringify(obj), secretKey).toString();
};

export const encryptString = (str: string, secretKey: string) => {
  return CryptoJS.AES.encrypt(str, secretKey).toString();
};

export const decrypt = (cipherText: string, secretKey: string) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return data;
};

export const decryptString = (cipherText: string, secretKey: string) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const getHTTPRequests = async (
  url: string,
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' = 'GET',
  headers?: any,
  token?: string,
  body?: any
) => {
  const tokenContent = token ? { Authorization: `Bearer ${token}` } : {};
  const headersContent = headers ?? {};
  const headersParam =
    headers || token
      ? {
          ...headersContent,
          ...tokenContent,
        }
      : {};
  const bodyParam = body ? { body: JSON.stringify({ ...body }) } : {};
  const response = await fetch(`${process.env.BASE_API_URL}${url}`, {
    method,
    ...headersParam,
    ...bodyParam,
  });

  return await response.json();
};
