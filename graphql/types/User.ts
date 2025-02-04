import { extendType, objectType } from "nexus";
import { Coupon } from './Coupon';


export const User = objectType({
    name: 'User',
    definition(t) {
        t.string('id');
        t.string('email');
        t.string('name');
        t.nonNull.field('createdAt', { type: 'DateTime' });
        t.list.field('coupons', {
            type: Coupon,
            async resolve(parent, _args, ctx) {
                return await ctx.prisma.user
                    .findUnique({
                        where: {
                            id: parent.id,
                        }
                    }).coupons();
            }
        })
    }
});

export const UsersQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.field('users', {
            type: 'User',
            resolve(_parent, _args, ctx) {
                return ctx.prisma.user.findMany();
            }
        })
    },
});