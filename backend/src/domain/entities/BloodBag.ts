import BloodType from './BloodType';

export default class BloodBag {
    private expirationDate: Date;

    constructor(
        private id: string,
        private bloodType: BloodType,
        private collectionDate: Date,
        private volume: number,
        private available: boolean,
    ) {
        this.expirationDate = new Date(collectionDate);
        this.expirationDate.setDate(this.expirationDate.getDate() + 60);
    }

    public getId(): string {
        return this.id;
    }

    public getBloodType(): BloodType {
        return this.bloodType;
    }

    public getCollectionDate(): Date {
        return this.collectionDate;
    }

    public getExpirationDate(): Date {
        return this.expirationDate;
    }

    public getVolume(): number {
        return this.volume;
    }

    public isExpired(): boolean {
        return new Date() > this.expirationDate;
    }

    public isAvailable(): boolean {
        return this.available && !this.isExpired();
    }

    public setAvailable(available: boolean): void {
        this.available = available;
    }
}
