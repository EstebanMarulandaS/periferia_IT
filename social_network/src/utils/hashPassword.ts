import SHA256 from "crypto-js/sha256";

export function hashPassword(password: string) {
  return SHA256(password).toString();
}
