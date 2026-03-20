import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

// Create a connection pool (recommended for Next.js)
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prismaClientSingleton = () => {
  return new PrismaClient({
    adapter,
  });
};

const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma || prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;

// We have supabase in which data is stored related to client and all. supabse has it's own method to create a connection like creteClient().
// but we are using prisma for the same that's why we have to use PrismaCleint() so that we can connect our prisma to supabse.
// Because of hot reload it calles PrismaClient() everytime and connect with supabse. so everytime it will create new client and because of connection limit. it gives error like too many connections.
//  but that will happend not in production env. so if current env is not production env and if golabally prisma is connected we will reuse that connection.
// there is client generator in schema.prisma file, that will generate js client libraray based on our project and requirement and because of that we can be able to connect with out prismaClient.
