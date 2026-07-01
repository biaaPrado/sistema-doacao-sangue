import { BloodTypeDTO } from './BloodTypeDTO';
import { DonationSummaryDTO } from './DonationSummaryDTO';
import { Sex } from '../enums/Sex';

export interface DonorDTO {
    id: string;
    name: string;
    cpf: string;
    phone: string;
    email: string;
    birthDate: Date;
    sex: Sex;
    weight: number;
    bloodType: BloodTypeDTO;
    donations: DonationSummaryDTO[];
}
