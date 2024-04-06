import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { badRequest } from "./_errors/bad-request";

export async function checkIn(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get('/attendees/:attendeeId/check-in', {
        schema: {
            summary: 'Check in an attendee',
            tags: ['check-in'],
            params: z.object({
                attendeeId: z.string(),
            }),
            response: {
                201: z.null(), // Sucesso, sem conteúdo na resposta
                400: z.object({ // Para erros de solicitação incorreta
                    error: z.string(),
                }),
            }
        }
    }, async (request, reply) => {
        const attendeeId = parseInt(request.params.attendeeId, 10);
        if (isNaN(attendeeId)) {
            return reply.status(400).send({ error: 'Invalid attendeeId provided' });
        }

        const attendeeCheckIn = await prisma.checkIn.findUnique({
            where: {
                attendeeId: attendeeId // Garantindo que usamos o valor convertido
            }
        });

        if (attendeeCheckIn !== null) {
            // Usar reply para enviar a resposta em caso de erro
            throw new badRequest('Attendee already checked in');
        }

        await prisma.checkIn.create({
            data: {
                attendeeId: attendeeId, // Garantindo que usamos o valor convertido
            }
        });

        // Enviar resposta vazia com status 201 para indicar sucesso
        return reply.status(201).send();
    });
}
