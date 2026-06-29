import Hospital from '../entities/Hospital';

export default class HospitalService {
    private hospitals: Hospital[] = [];

    public addHospital(hospital: Hospital): void {
        if (this.hospitalExists(hospital.getCnpj())) {
            throw new Error('Já existe um hospital com esse CNPJ.');
        }
        this.hospitals.push(hospital);
    }

    public removeHospital(id: string): void {
        const index = this.hospitals.findIndex(
            (hospital) => hospital.getId() === id,
        );

        if (index === -1) {
            throw new Error('Hospital não encontrado.');
        }

        this.hospitals.splice(index, 1);
    }

    public updateHospital(id: string, updatedHospital: Hospital): void {
        const hospitalWithCnpj = this.findByCnpj(updatedHospital.getCnpj());

        if (hospitalWithCnpj && hospitalWithCnpj.getId() !== id) {
            throw new Error('Já existe um hospital com esse CNPJ.');
        }

        const index = this.hospitals.findIndex(
            (hospital) => hospital.getId() === id,
        );

        if (index === -1) {
            throw new Error('Hospital não encontrado.');
        }

        this.hospitals[index] = updatedHospital;
    }

    public findById(id: string): Hospital | null {
        return (
            this.hospitals.find((hospital) => hospital.getId() === id) ?? null
        );
    }

    public findByCnpj(cnpj: string): Hospital | null {
        return (
            this.hospitals.find((hospital) => hospital.getCnpj() === cnpj) ??
            null
        );
    }

    public findByName(name: string): Hospital[] {
        return this.hospitals.filter((hospital) =>
            hospital.getName().toLowerCase().includes(name.toLowerCase()),
        );
    }

    public findByCity(city: string): Hospital[] {
        return this.hospitals.filter((hospital) =>
            hospital.getCity().toLowerCase().includes(city.toLowerCase()),
        );
    }

    public getAllHospitals(): Hospital[] {
        return this.hospitals;
    }

    public hospitalExists(cnpj: string): boolean {
        return this.findByCnpj(cnpj) !== null;
    }
}
