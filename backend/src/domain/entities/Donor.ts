import { Sex } from '../enums/Sex';
import BloodType from './BloodType';
import Donation from './Donation';

export default class Donor {
    constructor(
        private id: number,
        private name: string,
        private cpf: string,
        private birthDate: Date,
        private weight: number,
        private phone: string,
        private sex: Sex,
        private address: string,
        private bloodType: BloodType,
        private donations: Donation[],
    ) {}

    // Getters
    public addDonation(donation: Donation): void {
        this.donations.push(donation);
    }

    public getBloodType(): BloodType {
        return this.bloodType;
    }

    public getSex(): Sex {
        return this.sex;
    }

    public getWeight(): number {
        return this.weight;
    }

    public getAge(): number {
        const today = new Date();

        let age = today.getFullYear() - this.birthDate.getFullYear();

        const monthDifference = today.getMonth() - this.birthDate.getMonth();

        if (
            monthDifference < 0 ||
            (monthDifference === 0 &&
                today.getDate() < this.birthDate.getDate())
        ) {
            age--;
        }

        return age;
    }

    public getLastDonation(): Donation | null {
        if (this.donations.length === 0) {
            return null;
        }

        return this.donations[this.donations.length - 1];
    }

    public getDonations(): Donation[] {
        return this.donations;
    }
}
