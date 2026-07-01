import { DonorDTO } from '../dtos/DonorDTO';
import Donor from '../entities/Donor';
import { BloodTypeMapper } from '../mappers/BloodTypeMapper';
import { DonorMapper } from '../mappers/DonorMapper';

export default class DonorService {
    private donors: Donor[] = [];

    public addDonor(dto: DonorDTO): void {
        const donor = DonorMapper.toEntity(dto);

        if (this.donorExists(donor.getCpf())) {
            throw new Error('Já existe um doador com esse CPF.');
        }
        this.donors.push(donor);
    }

    public removeDonor(id: string): void {
        const index = this.donors.findIndex((donor) => donor.getId() === id);

        if (index === -1) {
            throw new Error('Doador não encontrado.');
        }

        this.donors.splice(index, 1);
    }

    public updateDonor(dto: DonorDTO): void {
        const donorWithCpf = this.findByCpf(dto.cpf);

        if (donorWithCpf && donorWithCpf.getId() !== dto.id) {
            throw new Error('CPF já cadastrado.');
        }

        const donor = this.findById(dto.id);

        if (!donor) {
            throw new Error('Doador não encontrado');
        }

        donor.setName(dto.name);
        donor.setCpf(dto.cpf);
        donor.setPhone(dto.phone);
        donor.setEmail(dto.email);
        donor.setBirthDate(dto.birthDate);
        donor.setSex(dto.sex);
        donor.setWeight(dto.weight);
        donor.setBloodType(BloodTypeMapper.toEntity(dto.bloodType));
    }

    public findByCpf(cpf: string): Donor | null {
        return this.donors.find((donor) => donor.getCpf() === cpf) ?? null;
    }

    public findById(id: string): Donor | null {
        return this.donors.find((donor) => donor.getId() === id) ?? null;
    }

    public getAllDonors(): Donor[] {
        return this.donors;
    }

    public donorExists(cpf: string): boolean {
        return this.findByCpf(cpf) !== null;
    }
}
