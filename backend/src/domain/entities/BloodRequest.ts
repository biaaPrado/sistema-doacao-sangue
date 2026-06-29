import BloodType from '../entities/BloodType';
import Hospital from '../entities/Hospital';
import { Priority } from '../enums/Priority';
import { Status } from '../enums/Status';

export default class BloodRequest {
    constructor(
        private id: string,
        private hospital: Hospital,
        private requestDate: Date,
        private bloodType: BloodType,
        private quantity: number,
        private priority: Priority,
        private status: Status,
        private observations: string,
    ) {}

    public getId(): string {
        return this.id;
    }

    public getHospital(): Hospital {
        return this.hospital;
    }

    public getRequestDate(): Date {
        return this.requestDate;
    }

    public getBloodType(): BloodType {
        return this.bloodType;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public getPriority(): Priority {
        return this.priority;
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
