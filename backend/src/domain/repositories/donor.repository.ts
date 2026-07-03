import { Donor } from '@prisma/client';

export interface IDonorRepository {
  create(data: Omit<Donor, 'id'>): Promise<Donor>;
  findById(id: string): Promise<Donor | null>;
  findByCpf(cpf: string): Promise<Donor | null>;
  findAll(): Promise<Donor[]>;
}