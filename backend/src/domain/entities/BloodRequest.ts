import BloodType from '../entities/BloodType';
import Hospital from '../entities/Hospital';

export default class BloodRequest {
    constructor(
        private id: number,
        private hospital: Hospital,
        private bloodType: BloodType,
        private quantity: number,
        private requestDate: Date,
    ) {}

    public getBloodType(): BloodType {
        return this.bloodType;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public getHospital(): Hospital {
        return this.hospital;
    }
}
