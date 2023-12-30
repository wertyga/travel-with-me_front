type ClassNameParam =
  | Record<string, any>
  | Record<boolean, Record<string, any>>
  | null
  | undefined;

function classnames(...params: ClassNameParam[]) {
  return params.reduce((acc, style) => {
    if (!style) return acc;

    const conditionKey = Object.keys(style)[0];

    const isConditionStyle =
      conditionKey === 'true' ||
      conditionKey === 'false' ||
      conditionKey === 'undefined' ||
      conditionKey === 'null';

    if (!isConditionStyle && typeof style === 'object') {
      return { ...acc, ...style };
    }

    // Handle condition style
    if (conditionKey !== 'true') return acc;

    if (typeof style[conditionKey] === 'object')
      return { ...acc, ...style[conditionKey] };

    return acc;
  }, {});
}

export default classnames;
