// src/routes/_errors/bad-request.ts
var badRequest = class extends Error {
  constructor(message) {
    super(message);
    this.name = "badRequest";
  }
};

export {
  badRequest
};
