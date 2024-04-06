import {
  badRequest
} from "./chunk-DY5NXTJR.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/check-in.ts
import { z } from "zod";
async function checkIn(app) {
  app.withTypeProvider().get("/attendees/:attendeeId/check-in", {
    schema: {
      summary: "Check in an attendee",
      tags: ["check-in"],
      params: z.object({
        attendeeId: z.string()
      }),
      response: {
        201: z.null(),
        // Sucesso, sem conteúdo na resposta
        400: z.object({
          // Para erros de solicitação incorreta
          error: z.string()
        })
      }
    }
  }, async (request, reply) => {
    const attendeeId = parseInt(request.params.attendeeId, 10);
    if (isNaN(attendeeId)) {
      return reply.status(400).send({ error: "Invalid attendeeId provided" });
    }
    const attendeeCheckIn = await prisma.checkIn.findUnique({
      where: {
        attendeeId
        // Garantindo que usamos o valor convertido
      }
    });
    if (attendeeCheckIn !== null) {
      throw new badRequest("Attendee already checked in");
    }
    await prisma.checkIn.create({
      data: {
        attendeeId
        // Garantindo que usamos o valor convertido
      }
    });
    return reply.status(201).send();
  });
}

export {
  checkIn
};
