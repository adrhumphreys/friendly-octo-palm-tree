import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("password", 10);
  const adrian = await prisma.user.upsert({
    where: { email: "adrian@paw.nz" },
    update: {},
    create: {
      email: "adrian@paw.nz",
      password,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
