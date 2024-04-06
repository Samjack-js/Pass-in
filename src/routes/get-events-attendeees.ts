import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function getEventAttendees(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get<{
        Params: { eventId: string; };
        Querystring: { pageIndex: number; };
    }>('/events/:eventId/attendees', {
        schema: {
            summary: 'Get event attendees',
            tags: ['events'],
            params: z.object({
                eventId: z.string().uuid(),
            }),
            querystring: z.object({
                query: z.string().nullish(),
                pageIndex: z.string().nullish().default('0').transform(val => Number(val)),
            }),
            response: {
                200: z.object({
                    attendees: z.array(
                        z.object({
                            id: z.number(),
                            name: z.string(),
                            email: z.string().email(),
                            createdAt: z.date(),
                            checkInAt: z.date().nullable(),
                        })
                    ),
                }),
            },
        }
    }, async (request, reply) => {
        const { eventId } = request.params;
        const { pageIndex, query } = request.query as { pageIndex: number, query: string | null | undefined };

        const attendees = await prisma.attendee.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                CheckIn: {
                    select: {
                        createdAt: true
                    }
                }
            },
            where: query ? {
                eventId,
                name: { contains: query }
            } : { 
                eventId 
            },
            take: 10,
            skip: pageIndex * 10,
            orderBy: {
                createdAt: 'desc'
            }
        });

        return reply.send({
            attendees: attendees.map(attendee => ({
                id: attendee.id.toString(), // Supondo que `id` é numérico e convertendo para string
                name: attendee.name,
                email: attendee.email,
                createdAt: attendee.createdAt,
                checkInAt: attendee.CheckIn?.createdAt,
            }))
        });
    });
}
