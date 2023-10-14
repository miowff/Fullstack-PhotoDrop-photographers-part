export interface BaseError extends Error {
  response: {
    status: number;
  };
}
