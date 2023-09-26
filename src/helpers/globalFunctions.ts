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
