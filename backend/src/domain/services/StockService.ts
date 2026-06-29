import BloodBag from '../entities/BloodBag';
import BloodType from '../entities/BloodType';

export default class StockService {
    private bags: BloodBag[] = [];

    public addBag(bag: BloodBag): void {
        this.bags.push(bag);
    }

    public removeBag(id: string): boolean {
        const index = this.bags.findIndex((bag) => bag.getId() === id);

        if (index === -1) {
            return false;
        }

        this.bags.splice(index, 1);

        return true;
    }

    public findById(id: string): BloodBag | null {
        return this.bags.find((bag) => bag.getId() === id) ?? null;
    }

    public getAllBags(): BloodBag[] {
        return this.bags;
    }

    public findByBloodType(type: BloodType): BloodBag[] {
        return this.bags.filter(
            (bag) =>
                bag.isAvailable() &&
                bag.getBloodType().toString() === type.toString(),
        );
    }

    public countAvailableBags(type?: BloodType): number {
        return this.bags.filter((bag) => {
            if (!bag.isAvailable()) {
                return false;
            }

            if (!type) {
                return true;
            }

            return bag.getBloodType().toString() === type.toString();
        }).length;
    }

    public findCompatibleBags(recipientType: BloodType): BloodBag[] {
        const compatibleTypes = BloodType.getCompatibleDonors(recipientType);

        return this.bags.filter(
            (bag) =>
                bag.isAvailable() &&
                compatibleTypes.includes(bag.getBloodType().toString()),
        );
    }

    public useBag(id: string): boolean {
        const bag = this.findById(id);
        if (!bag) {
            return false;
        }
        bag.setAvailable(false);
        return true;
    }
}
