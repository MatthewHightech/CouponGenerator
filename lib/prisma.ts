import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

// If in production, create new prisma instance
// If in dev, set to global prisma instance so we
// don't max connection limit

if (process.env.NODE_ENV == 'production') {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}
export default prisma;