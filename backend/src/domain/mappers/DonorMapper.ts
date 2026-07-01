import Donor from '../entities/Donor';
import { DonorDTO } from '../dtos/DonorDTO';
import { BloodTypeMapper } from './BloodTypeMapper';
import { DonationSummaryMapper } from './DonationSummaryMapper';

export class DonorMapper {
    static toDTO(donor: Donor): DonorDTO {
        return {
            id: donor.getId(),
            name: donor.getName(),
            cpf: donor.getCpf(),
            phone: donor.getPhone(),
            email: donor.getEmail(),
            birthDate: donor.getBirthDate(),
            sex: donor.getSex(),
            weight: donor.getWeight(),
            bloodType: BloodTypeMapper.toDTO(donor.getBloodType()),
            donations: donor.getDonations().map(DonationSummaryMapper.toDTO),
        };
    }

    static toEntity(dto: DonorDTO): Donor {
        return new Donor(
            dto.id,
            dto.name,
            dto.cpf,
            dto.phone,
            dto.email,
            dto.birthDate,
            dto.sex,
            dto.weight,
            BloodTypeMapper.toEntity(dto.bloodType),
            [],
        );
    }
}
