import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

export class PrismaService extends PrismaClient {
  private static instance: PrismaService;

  private constructor() {
    // Inicializa o Pool do Postgres lendo a URL do seu Session Pooler no .env
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    
    // Passa o adapter para o PrismaClient, conforme a nova exigência da biblioteca
    super({ adapter });
  }

  public static getInstance(): PrismaService {
    if (!PrismaService.instance) {
      PrismaService.instance = new PrismaService();
    }
    return PrismaService.instance;
  }
}

export const prisma = PrismaService.getInstance();