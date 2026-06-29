import BloodRequest from '../entities/BloodRequest';
import { Status } from '../enums/Status';
import StockService from './StockService';

export default class DistributionService {
    constructor(private stockService: StockService) {}

    public fulfillRequest(request: BloodRequest): boolean {
        // Evita processar pedidos já finalizados
        if (request.getStatus() !== Status.PENDING) {
            return false;
        }

        // Busca as bolsas compatíveis
        const compatibleBags = this.stockService.findCompatibleBags(
            request.getBloodType(),
        );

        // Não há bolsas suficientes
        if (compatibleBags.length < request.getQuantity()) {
            return false;
        }

        // Consome as bolsas
        for (let i = 0; i < request.getQuantity(); i++) {
            this.stockService.useBag(compatibleBags[i].getId());
        }

        return true;
    }
}
