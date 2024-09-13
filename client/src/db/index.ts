import { PrismaNeon } from "@prisma/adapter-neon"
import { Pool } from "@neondatabase/serverless"
import { PrismaClient } from "@prisma/client"

const neon = new Pool({
    connectionString: process.env.POSTGRES_PRISMA_URL,
})

const adapter = new PrismaNeon(neon)

const prismaClientSingleton = () =>
    new PrismaClient({ adapter })


declare global {
    // eslint-disable-next-line no-var
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const db = globalThis.prisma ?? prismaClientSingleton()

export default db

if (process.env.NODE_ENV !== "production") globalThis.prisma = db