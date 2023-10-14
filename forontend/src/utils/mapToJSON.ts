export const selectedNumbersMapToJSON = (
  map: Map<string, string[]>
): string => {
  const entries = Array.from(map.entries());
  return JSON.stringify(entries);
};
