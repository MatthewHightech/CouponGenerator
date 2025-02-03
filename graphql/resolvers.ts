import prisma from '../lib/prisma'

export const resolvers = {
    Query: {
        coupons: async (_parent, _args, context) => {
            await context.prisma.coupon.findMany()
        },
    }
}