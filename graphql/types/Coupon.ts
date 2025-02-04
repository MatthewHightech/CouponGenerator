import { arg, asNexusMethod, extendType, nonNull, objectType, stringArg } from "nexus";
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
});

export const CouponMutation = extendType({
    type: 'Mutation',
    definition(t) {
      t.nonNull.field('createCoupon', {
        type: 'Coupon',
        args: {
          code: nonNull(stringArg()),      
          user: nonNull(stringArg()),       
        },
        resolve(_parent, args, ctx) {
          const coupon = {
            code: args.code,     
            valid: true,         
            createdBy: {
                connect: {id: args.user}
            }
          }
          return ctx.prisma.coupon.create({
            data: coupon
          }); 
        },
      })
    },
});

export const DeleteCouponMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("deleteCoupon", {
      type: "Coupon",
      args: {
        code: nonNull(stringArg()),
      },
      resolve(_root, args, context) {
        return context.prisma.coupon.delete({
          where: {
            code: args.code,
          },
        });
      },
    });
  },
});