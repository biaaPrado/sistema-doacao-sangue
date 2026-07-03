import { Donor } from '@prisma/client';
import { prisma } from '../prisma/prisma.service';
import { IDonorRepository } from '../../../domain/repositories/donor.repository';

export class PrismaDonorRepository implements IDonorRepository {
  async create(data: Omit<Donor, 'id'>): Promise<Donor> {
    // A validação de CPF único deve ser tratada no Use Case antes de chamar este método,
    // mas o Prisma lançará um erro se houver duplicidade devido à restrição @unique.
    return await prisma.donor.create({
      data,
    });
  }

  async findById(id: string): Promise<Donor | null> {
    return await prisma.donor.findUnique({
      where: { id },
    });
  }

  async findByCpf(cpf: string): Promise<Donor | null> {
    return await prisma.donor.findUnique({
      where: { cpf },
    });
  }

  async findAll(): Promise<Donor[]> {
    return await prisma.donor.findMany();
  }
}