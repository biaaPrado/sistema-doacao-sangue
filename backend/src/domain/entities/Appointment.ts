import Donor from './Donor';
import { Status } from '../enums/Status';

export default class Appointment {
    constructor(
        private id: string,
        private donor: Donor,
        private date: Date,
        private observations: string,
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

    public getObservations(): string {
        return this.observations;
    }

    public setStatus(status: Status): void {
        this.status = status;
    }
}
