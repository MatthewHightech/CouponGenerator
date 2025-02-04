import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // await prisma.user.create({
    //     data: {
    //         email: "test@test.com",
    //         name: "Matt Smith"
    //     }
    // });


    await prisma.coupon.create({
        data: {
            code: "TEST-ABCD",
            valid: true,
            createdBy: {
                connectOrCreate: {
                    create: {
                        email: "test1@test.com",
                        name: "Matt Smith"
                    },
                    where: {
                        email: "test@test.com"
                    }
                }
            }
        }
    });

}

main()
.catch((e) => {
    console.error(e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect
});

