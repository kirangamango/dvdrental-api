import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const configs = {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  API_VERSION: "api/v1",
};

export { prisma, configs };
