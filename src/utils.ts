const uppercaseFirst = (str: string) =>
  (str[0] || '').toUpperCase() + str.slice(1);

export const pascalCase = (str: string) =>
  str
    .split(/[_\s]+/g)
    .map((word) => uppercaseFirst(word))
    .join('');

export const lowercaseFirst = (str: string) =>
  (str[0] || '').toLowerCase() + str.slice(1);
