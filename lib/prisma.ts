import { PrismaClient } from "@/generated/prisma/client";
// import { PrismaClient } from "@/generated/prisma/internal/class";

const globalForPrisma = global as unknown as {
  prisma?: PrismaClient;
};

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient();
}

const prisma = globalForPrisma.prisma;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;