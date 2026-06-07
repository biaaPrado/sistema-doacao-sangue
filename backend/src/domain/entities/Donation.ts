import Donor from './Donor';

export default class Donation {
    constructor(
        private id: number,
        private donor: Donor,
        private mlQuantity: number,
        private donationDate: Date,
    ) {}

    public getId(): number {
        return this.id;
    }

    public getDonor(): Donor {
        return this.donor;
    }

    public getMlQuantity(): number {
        return this.mlQuantity;
    }

    public getDonationDate(): Date {
        return this.donationDate;
    }
}
