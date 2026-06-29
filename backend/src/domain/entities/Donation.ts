import Donor from './Donor';

export default class Donation {
    constructor(
        private id: string,
        private donor: Donor,
        private volume: number,
        private donationDate: Date,
    ) {}

    public getId(): string {
        return this.id;
    }

    public getDonor(): Donor {
        return this.donor;
    }

    public getVolume(): number {
        return this.volume;
    }

    public getDonationDate(): Date {
        return this.donationDate;
    }
}
