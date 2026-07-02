import { HospitalDTO } from '../dtos/HospitalDTO';
import Hospital from '../entities/Hospital';
import { HospitalMapper } from '../mappers/HospitalMapper';

export default class HospitalService {
    private hospitals: Hospital[] = [];

    public addHospital(dto: HospitalDTO): void {
        const hospital = HospitalMapper.toEnitity(dto);

        if (this.findByCnpj(hospital.getCnpj())) {
            throw new Error('Já existe um hospital com esse CNPJ.');
        }
        this.hospitals.push(hospital);
    }

    public removeHospital(id: string): void {
        const hospital = this.findById(id);

        if (!hospital) {
            throw new Error('Hospital não encontrado.');
        }

        this.hospitals = this.hospitals.filter((h) => h.getId() !== id);
    }

    public updateHospital(dto: HospitalDTO): void {
        const hospitalWithCnpj = this.findByCnpj(dto.cnpj);

        if (hospitalWithCnpj && hospitalWithCnpj.getId() !== dto.id) {
            throw new Error('Já existe um hospital com esse CNPJ.');
        }

        const hospital = this.findById(dto.id);

        if (!hospital) {
            throw new Error('Hospital não encontrado.');
        }

        hospital.setName(dto.name);
        hospital.setCnpj(dto.cnpj);
        hospital.setPhone(dto.phone);
        hospital.setEmail(dto.email);

        hospital.setCep(dto.cep);
        hospital.setAddress(dto.address);
        hospital.setNumber(dto.number);
        hospital.setComplement(dto.complement);

        hospital.setCity(dto.city);
        hospital.setState(dto.state);
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
