import SHA256 from "crypto-js/sha256";

export const validatePassword = (
  password: string,
  passwordHash: string
): boolean => {
  if (SHA256(password).toString() === passwordHash) {
    return true;
  }
  return false;
};
