import { Status } from '../enums/Status';
import { DonorDTO } from './DonorDTO';

export interface AppointmentDTO {
    id: string;
    donor: DonorDTO;
    date: Date;
    observations: string | null;
    status: Status;
}
