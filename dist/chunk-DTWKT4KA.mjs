import {
  badRequest
} from "./chunk-DY5NXTJR.mjs";

// src/utils/error-handler.ts
import { ZodError } from "zod";
var errorHandler = (error, request, reply) => {
  const { validation, validationContext } = error;
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Errors during validation",
      errors: error.flatten().fieldErrors
    });
  }
  if (error instanceof badRequest) {
    return reply.status(400).send({ message: error.message });
  }
  return reply.status(500).send({ message: "Internal server error" });
};

export {
  errorHandler
};
