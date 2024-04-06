import { FastifyInstance } from "fastify"
import { badRequest } from "../routes/_errors/bad-request"
import { ZodError } from "zod"

type fastifyErrorHandler =  FastifyInstance['errorHandler']

export const errorHandler: fastifyErrorHandler = (error, request, reply) => {
    const {validation, validationContext} = error

    if (error instanceof ZodError) {
        return reply.status(400).send({
            message: 'Errors during validation',
            errors: error.flatten().fieldErrors,
        })
    }


    if (error instanceof badRequest) {
        return reply.status(400).send({ message: error.message })
    }

    return reply.status(500).send({ message: 'Internal server error' })
}