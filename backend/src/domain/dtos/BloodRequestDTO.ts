import { Priority } from '../enums/Priority';
import { Status } from '../enums/Status';
import { BloodTypeDTO } from './BloodTypeDTO';
import { HospitalDTO } from './HospitalDTO';

export interface BloodRequestDTO {
    id: string;
    hospital: HospitalDTO;
    requestDate: Date;
    bloodType: BloodTypeDTO;
    quantity: number;
    priority: Priority;
    status: Status;
    observations: string;
}
