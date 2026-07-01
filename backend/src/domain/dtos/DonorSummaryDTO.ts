import { BloodTypeDTO } from './BloodTypeDTO';

export interface DonorSummaryDTO {
    id: string;
    name: string;
    bloodType: BloodTypeDTO;
}
