import Donor from '../entities/Donor';

export default class DonorService {
    private donors: Donor[] = [];

    public addDonor(donor: Donor): void {
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

    public updateDonor(id: string, updatedDonor: Donor): void {
        const donorWithCpf = this.findByCpf(updatedDonor.getCpf());

        if (donorWithCpf && donorWithCpf.getId() !== id) {
            throw new Error('CPF já cadastrado.');
        }
        const index = this.donors.findIndex((donor) => donor.getId() === id);

        if (index === -1) {
            throw new Error('Doador não encontrado.');
        }

        this.donors[index] = updatedDonor;
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
