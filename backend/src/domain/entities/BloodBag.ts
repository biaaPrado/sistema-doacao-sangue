import BloodType from './BloodType';
import Donation from './Donation';

export default class BloodBag {
    constructor(
        private id: number,
        private bloodType: BloodType,
        private donation: Donation,
        private expirationDate: Date,
    ) {}

    public isExpired(): boolean {
        return new Date() > this.expirationDate;
    }

    public getBloodType(): BloodType {
        return this.bloodType;
    }

    public getExpirationDate(): Date {
        return this.expirationDate;
    }
}
