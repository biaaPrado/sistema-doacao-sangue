import { AppointmentDTO } from '../dtos/AppointmentDTO';
import Appointment from '../entities/Appointment';
import Donor from '../entities/Donor';
import { Status } from '../enums/Status';

export default class AppointmentService {
    private appointments: Appointment[] = [];

    public create(appointment: Appointment): void {
        this.appointments.push(appointment);
    }

    public findById(id: string): Appointment | null {
        return this.appointments.find((a) => a.getId() === id) ?? null;
    }

    public getAll(): Appointment[] {
        return this.appointments;
    }

    public update(dto: AppointmentDTO, donor: Donor): void {
        const appointment = this.findById(dto.id);

        if (!appointment) {
            throw new Error('Agendamento não encontrado');
        }

        appointment.setDonor(donor);
        appointment.setDate(dto.date);
        appointment.setObservations(dto.observations);
    }

    public cancel(id: string): void {
        const appointment = this.findById(id);

        if (!appointment) {
            throw new Error('Agendamento não encontrado');
        }

        appointment.setStatus(Status.CANCELED);
    }

    public complete(id: string): void {
        const appointment = this.findById(id);

        if (!appointment) {
            throw new Error('Agendamento não encontrado');
        }

        appointment.setStatus(Status.COMPLETED);
    }

    public remove(id: string): void {
        const index = this.appointments.findIndex((a) => a.getId() === id);

        if (index === -1) {
            throw new Error('Agendamento não encontrado');
        }

        this.appointments.splice(index, 1);
    }
}
