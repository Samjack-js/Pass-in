import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function registerForEvent(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/events/:eventId/attendees', {
    schema: {
        body: z.object({
            name: z.string().min(4),
            email: z.string().email(),
        }),
        params: z.object({
            eventId: z.string().uuid(),
            }),
            response: {
                201: z.object({
                    attendeeId: z.number(),
                })
            }
        }
    }, async (request, reply) => {
        const { eventId } = request.params
        const { name, email } = request.body

        const ateendeeFromEmail = await prisma.attendee.findUnique({
            where: {
                eventId_email: {
                    email,
                    eventId
                }
            }
        })

        if (ateendeeFromEmail !== null) {
            throw new Error(
                `Attendee with email ${email} already exists.`
            )
        }

        const [event, amountOfAttendees] =await Promise.all([
            prisma.event.findUnique({
                where: {
                    id: eventId
                }
            }),

            prisma.attendee.count({
                where: {
                    eventId,
                }
            })
    
        ])

        if (event?.maximumAttendees && amountOfAttendees >= event?.maximumAttendees) {
            throw new Error(
                `Maximum attendees number of attendees reached.`
            )
        }

        const ateendee = await prisma.attendee.create({
            data: {
                name,
                email,
                eventId,
            }
        })


    return reply.status(201).send({ attendeeId: ateendee.id })
    })
}
