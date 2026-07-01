import Donation from '../entities/Donation';
import { DonationSummaryDTO } from '../dtos/DonationSummaryDTO';

export class DonationSummaryMapper {
    static toDTO(donation: Donation): DonationSummaryDTO {
        return {
            id: donation.getId(),
            date: donation.getDonationDate(),
            volume: donation.getVolume(),
        };
    }
}
