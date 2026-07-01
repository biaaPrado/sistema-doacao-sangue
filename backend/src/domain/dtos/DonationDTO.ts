import { DonorSummaryDTO } from './DonorSummaryDTO';

export interface DonationDTO {
    id: string;
    donor: DonorSummaryDTO;
    volume: number;
    date: Date;
}
