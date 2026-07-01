import Donor from './Donor';
import { Status } from '../enums/Status';

export default class Appointment {
    constructor(
        private id: string,
        private donor: Donor,
        private date: Date,
        private observations: string | null,
        private status: Status,
    ) {}

    public getId(): string {
        return this.id;
    }

    public getDonor(): Donor {
        return this.donor;
    }

    public getDate(): Date {
        return this.date;
    }

    public getStatus(): Status {
        return this.status;
    }

    public getObservations(): string | null {
        return this.observations;
    }

    public setDonor(donor: Donor) {
        this.donor = donor;
    }

    public setDate(date: Date) {
        this.date = date;
    }

    public setObservations(observations: string | null) {
        this.observations = observations;
    }

    public setStatus(status: Status): void {
        this.status = status;
    }
}
