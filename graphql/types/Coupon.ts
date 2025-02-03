import { asNexusMethod, extendType, objectType } from "nexus";
import { User } from './User';
import { DateTimeResolver } from 'graphql-scalars';

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

export const Coupon = objectType({
    name: 'Coupon',
    definition(t) {
        t.string('id');
        t.string('code');
        t.boolean('valid');
        t.nonNull.field('createdAt', { type: 'DateTime' });
        t.field('createdBy', {
            type: User,
            async resolve(parent, _args, ctx) {
                return await ctx.prisma.coupon
                    .findUnique({
                        where: {
                            id: parent.id,
                        }
                    }).createdBy();
            }
        });
    }
});

export const CouponsQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.field('coupons', {
            type: 'Coupon',
            resolve(_parent, _args, ctx) {
                return ctx.prisma.coupon.findMany();
            }
        })
    },
})