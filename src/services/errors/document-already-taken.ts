export class DocumentAlreadyTakenError extends Error {
  constructor() {
    super('Document Already Taken');
  }
}