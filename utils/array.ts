export const hasIntersection = (array1: any[], array2: any[]) => {
  return !!array1.find(elem1 => array2.find(elem2 => elem2 === elem1));
};
