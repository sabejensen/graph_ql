const {PrismaClient} = require('@prisma/client')
const pkdata = require('../pkmn/pkmn.json')

const prisma = new PrismaClient()

const seedData = async () => {
    console.log('Starting seed...')
    for (let val of pkdata) {
        try {
            const pokemon = await prisma.pokemon.create({data: val})
        } catch (error) {
            console.warn(error)
        }
    }
}

seedData().catch((error) => {
    console.warn(error)
    process.exit(1)
}).finally(async () => {
    await prisma.$disconnect();
})