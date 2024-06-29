export function verifyRegex(regex: any, value: string, errorMessage: string) {
  if (!regex.test(value)) {
    throw new Error(errorMessage);
  }
}
