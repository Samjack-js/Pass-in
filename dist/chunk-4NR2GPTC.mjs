import {
  generateSlug
} from "./chunk-J47YQUYU.mjs";
import {
  badRequest
} from "./chunk-DY5NXTJR.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/create-event.ts
import z from "zod";
async function createEvent(app) {
  app.withTypeProvider().post("/events", {
    schema: {
      summary: "Create a new event",
      tags: ["events"],
      body: z.object({
        title: z.string({ invalid_type_error: "O titulo precisa ser um texto" }).min(4),
        details: z.string().nullable(),
        maximumAttendees: z.number().positive().int().nullable().optional()
      }),
      response: {
        201: z.object({
          eventId: z.string().uuid()
        })
      }
    }
  }, async (request, reply) => {
    const {
      title,
      details,
      maximumAttendees
    } = request.body;
    const slug = generateSlug(title);
    const eventWithSameSlug = await prisma.event.findUnique({
      where: {
        slug
      }
    });
    if (eventWithSameSlug !== null) {
      throw new badRequest("Event with same slug already exists");
    }
    const event = await prisma.event.create({
      data: {
        title,
        details,
        maximumAttendees,
        slug
      }
    });
    return reply.status(201).send({ eventId: event.id });
  });
}

export {
  createEvent
};
