export class TimeNotAvailabelError extends Error {
  constructor() {
    super('Hour not available');
  }
}