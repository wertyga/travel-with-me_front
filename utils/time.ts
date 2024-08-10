export function secToTime(sec: number, noH?: boolean) {
  // Seconds
  const m = Math.floor(sec / 60);
  const h = Math.floor(m / 60);
  const s = sec - h * 60 * 60 - m * 60;

  return `${noH ? '' : `${h}:`}${m}:${s < 10 ? `0${s}` : s}`;
}
