import BloodRequest from '../entities/BloodRequest';
import StockService from './StockService';

export default class DistributionService {
    constructor(private stockService: StockService) {}

    public fulfillRequest(request: BloodRequest): boolean {
        const bags = this.stockService.findCompatibleBags(
            request.getBloodType(),
        );
        if (bags.length < request.getQuantity()) {
            return false; // Não possui a quantidade necessária de bolsas em estoque
        }
        for (let i = 0; i < request.getQuantity(); i++) {
            this.stockService.removeBag(bags[i]);
        }
        return true;
    }
}
