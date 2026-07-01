import Hospital from '../entities/Hospital';
import { HospitalDTO } from '../dtos/HospitalDTO';

export class HospitalMapper {
    static toDTO(hospital: Hospital): HospitalDTO {
        return {
            id: hospital.getId(),
            name: hospital.getName(),
            cnpj: hospital.getCnpj(),
            phone: hospital.getPhone(),
            email: hospital.getEmail(),
            cep: hospital.getCep(),
            address: hospital.getAddress(),
            number: hospital.getNumber(),
            complement: hospital.getComplement(),
            city: hospital.getCity(),
            state: hospital.getState(),
        };
    }

    static toEnitity(dto: HospitalDTO): Hospital {
        return new Hospital(
            dto.id,
            dto.name,
            dto.cnpj,
            dto.phone,
            dto.email,
            dto.cep,
            dto.address,
            dto.number,
            dto.complement,
            dto.city,
            dto.state,
        );
    }
}
