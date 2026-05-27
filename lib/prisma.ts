import { PrismaClient } from '@prisma/client';

// PrismaClient должен быть переиспользован в dev-режиме, чтобы не плодить соединения.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

