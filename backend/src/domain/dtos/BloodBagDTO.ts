import { BloodTypeDTO } from './BloodTypeDTO';

export interface BloodBagDTO {
    id: string;
    bloodType: BloodTypeDTO;
    collectionDate: Date;
    expirationDate: Date;
    volume: number;
    available: boolean;
}
