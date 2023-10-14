export const jsonToMap = (jsonString: string): Map<string, string[]> => {
  const parsedEntries: [any, any][] = JSON.parse(jsonString);
  return new Map(parsedEntries);
};
