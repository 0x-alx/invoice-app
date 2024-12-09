// import { PrismaClient } from '@prisma/client'

// declare global {
//     var prisma: PrismaClient | undefined
// }

// export const prisma = global.prisma || new PrismaClient()

// if (process.env.NODE_ENV !== 'production') global.prisma = prisma

// // Fonction pour s'assurer que l'enum est synchronisé
// async function syncEnums() {
//     try {
//         await prisma.$executeRaw`
//       DO $$ BEGIN
//         IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'invoicestatus') THEN
//           CREATE TYPE "InvoiceStatus" AS ENUM ('PENDING', 'PAID', 'OVERDUE', 'CANCELLED');
//         ELSE
//           ALTER TYPE "InvoiceStatus" ADD VALUE IF NOT EXISTS 'PENDING';
//           ALTER TYPE "InvoiceStatus" ADD VALUE IF NOT EXISTS 'PAID';
//           ALTER TYPE "InvoiceStatus" ADD VALUE IF NOT EXISTS 'OVERDUE';
//           ALTER TYPE "InvoiceStatus" ADD VALUE IF NOT EXISTS 'CANCELLED';
//         END IF;
//       END $$;
//     `
//     } catch (error) {
//         console.error('Failed to sync enums:', error)
//     }
// }

// // Exécuter la synchronisation au démarrage
// syncEnums() 