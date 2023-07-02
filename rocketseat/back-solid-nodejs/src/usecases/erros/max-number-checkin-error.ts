export class MaxNumberCheckinError extends Error {
  constructor() {
    super('User already checked in')
  }
}
