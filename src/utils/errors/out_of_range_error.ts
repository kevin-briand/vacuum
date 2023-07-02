export class OutOfRangeError extends Error {
  constructor(valueName: string) {
    super(`The ${valueName} is out of range`);
  }
}
