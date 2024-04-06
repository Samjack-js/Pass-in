import {
  errorHandler
} from "./chunk-DTWKT4KA.mjs";
import {
  checkIn
} from "./chunk-TSDOROUK.mjs";
import {
  createEvent
} from "./chunk-4NR2GPTC.mjs";
import "./chunk-J47YQUYU.mjs";
import {
  getAttendeBadge
} from "./chunk-JQUVW76Z.mjs";
import {
  getEvent
} from "./chunk-I6R4LRUY.mjs";
import {
  getEventAttendees
} from "./chunk-GGXQETFO.mjs";
import {
  registerForEvent
} from "./chunk-ZY7MRQFU.mjs";
import "./chunk-DY5NXTJR.mjs";
import "./chunk-JV6GRE7Y.mjs";

// src/server.ts
import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from "fastify-type-provider-zod";
var app = fastify();
app.register(fastifyCors, {
  origin: "*"
});
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "Pass-In",
      description: "API for Pass-In",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUi, {
  routePrefix: "/docs"
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeBadge);
app.register(checkIn);
app.register(getEventAttendees);
app.setErrorHandler(errorHandler);
app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("HTTP server running on http://localhost:3333");
});
