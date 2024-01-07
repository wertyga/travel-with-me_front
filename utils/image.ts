export const getCompressedUrl = (url: string, width?: number) => {
  return width ? `${url}?width=${width}` : url;
};
