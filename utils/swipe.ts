export const isSwipeByX = (
  start: { x: number; y: number },
  current: { x: number; y: number }
) => {
  const differenceX = start.x - current.x;
  const differenceY = start.y - current.y;

  return Math.abs(differenceX) > Math.abs(differenceY);
};
