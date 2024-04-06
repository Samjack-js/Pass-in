import { prisma } from '../src/lib/prisma'

async function seed() {
    await prisma.event.create({
        data: {
            id: 'ef89e8ff-ec70-44a4-b40f-1dc9871cbfd1',
            title: 'My first event',
            slug: 'my-first-event',
            details: 'This is my first event',
            maximumAttendees: 10
        }
    })
}

seed().then(( ) => {
    console.log('Seeded')
    prisma.$disconnect()
})