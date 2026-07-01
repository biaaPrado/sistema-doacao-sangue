import Donor from '../entities/Donor';
import { DonorSummaryDTO } from '../dtos/DonorSummaryDTO';
import { BloodTypeMapper } from './BloodTypeMapper';

export class DonorSummaryMapper {
    static toDTO(donor: Donor): DonorSummaryDTO {
        return {
            id: donor.getId(),
            name: donor.getName(),
            bloodType: BloodTypeMapper.toDTO(donor.getBloodType()),
        };
    }
}
