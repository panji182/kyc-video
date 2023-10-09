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

export const decrypt = (cipherText: string, secretKey: string) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return data;
};
