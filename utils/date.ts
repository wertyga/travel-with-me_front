export const getBeautifyDateTime = (timestamp: string | Date) => {
  const date = new Date(timestamp)
    .toLocaleDateString()
    .split('.')
    .slice(0, 2)
    .join('.');
  const time = new Date(timestamp)
    .toLocaleTimeString()
    .split(':')
    .slice(0, 2)
    .join(':');

  return {
    date,
    time,
  };
};
