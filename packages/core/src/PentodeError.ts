export default class PentodeError extends Error {
  [index: string]: any;

  constructor(error: object) {
    super();
    Object.keys(error).forEach((key) => {
      this[key] = error[key];
    });
  }
}
