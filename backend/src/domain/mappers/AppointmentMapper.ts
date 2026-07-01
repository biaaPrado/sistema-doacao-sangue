import Appointment from '../entities/Appointment';
import { AppointmentDTO } from '../dtos/AppointmentDTO';
import { DonorMapper } from './DonorMapper';
import DonorService from '../services/DonorService';
import Donor from '../entities/Donor';

export class AppointmentMapper {
    static toDTO(appointment: Appointment): AppointmentDTO {
        return {
            id: appointment.getId(),
            donor: DonorMapper.toDTO(appointment.getDonor()),
            date: appointment.getDate(),
            observations: appointment.getObservations(),
            status: appointment.getStatus(),
        };
    }

    static toEntity(dto: AppointmentDTO, donor: Donor): Appointment {
        return new Appointment(
            dto.id,
            donor,
            dto.date,
            dto.observations,
            dto.status,
        );
    }
}
