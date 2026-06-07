import BloodBag from '../entities/BloodBag';
import BloodType from '../entities/BloodType';

export default class StockService {
    private bags: BloodBag[] = [];

    public addBag(bag: BloodBag): void {
        this.bags.push(bag);
    }

    public removeBag(bag: BloodBag): void {
        this.bags = this.bags.filter((currentBag) => currentBag !== bag);
    }

    public removeExpiredBags(): void {
        this.bags = this.bags.filter((bag) => !bag.isExpired());
    }

    public findCompatibleBags(recipientType: BloodType): BloodBag[] {
        this.removeExpiredBags();
        const compatibleBags = this.bags.filter((bag) =>
            bag.getBloodType().canDonateTo(recipientType),
        );
        compatibleBags.sort(
            (a, b) =>
                a.getExpirationDate().getTime() -
                b.getExpirationDate().getTime(),
        );
        return compatibleBags;
    }
}
