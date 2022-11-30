export function upperCaseFirstLetter(str: string) {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}

export function trimAllSpaces(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

export function updateProvidedFields<T>(model: T, input: object): T {
  Object.keys(input).map(field => (model[field] = input[field]));
  return model;
}
