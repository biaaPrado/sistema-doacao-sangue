import Donation from '../entities/Donation';
import { DonationDTO } from '../dtos/DonationDTO';
import { DonorSummaryMapper } from './DonorSummaryMapper';
import Donor from '../entities/Donor';

export class DonationMapper {
    static toDTO(donation: Donation): DonationDTO {
        return {
            id: donation.getId(),
            donor: DonorSummaryMapper.toDTO(donation.getDonor()),
            volume: donation.getVolume(),
            date: donation.getDonationDate(),
        };
    }

    static toEntity(dto: DonationDTO, donor: Donor): Donation {
        return new Donation(dto.id, donor, dto.volume, dto.date);
    }
}
