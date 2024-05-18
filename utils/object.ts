export const getTruthlyValues = (obj: Record<string, any>) => {
  const newObj = {} as any;
  for (const key in obj) {
    if (obj[key]) {
      newObj[key] = obj[key];
    }
  }

  return newObj;
};
