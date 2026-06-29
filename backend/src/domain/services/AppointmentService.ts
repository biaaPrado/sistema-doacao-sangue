import Appointment from '../entities/Appointment';
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

    public update(id: string, appointment: Appointment): boolean {
        const index = this.appointments.findIndex((a) => a.getId() === id);

        if (index === -1) {
            return false;
        }

        this.appointments[index] = appointment;

        return true;
    }

    public cancel(id: string): boolean {
        const appointment = this.findById(id);

        if (!appointment) {
            return false;
        }

        appointment.setStatus(Status.CANCELED);

        return true;
    }

    public complete(id: string): boolean {
        const appointment = this.findById(id);

        if (!appointment) {
            return false;
        }

        appointment.setStatus(Status.COMPLETED);

        return true;
    }

    public remove(id: string): boolean {
        const index = this.appointments.findIndex((a) => a.getId() === id);

        if (index === -1) {
            return false;
        }

        this.appointments.splice(index, 1);

        return true;
    }
}
