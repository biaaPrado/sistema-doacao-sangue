import Donation from '../entities/Donation';
import Donor from '../entities/Donor';

export default class DonationService {
    private donations: Donation[] = [];

    public addDonation(donation: Donation): void {
        this.donations.push(donation);
    }

    public findById(id: string): Donation | null {
        return (
            this.donations.find((donation) => donation.getId() === id) ?? null
        );
    }

    public getAll(): Donation[] {
        return this.donations;
    }

    public getDonationsByDonor(donor: Donor): Donation[] {
        return this.donations.filter(
            (donation) => donation.getDonor().getId() === donor.getId(),
        );
    }
}
