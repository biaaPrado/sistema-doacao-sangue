import BloodRequest from '../entities/BloodRequest';
import { Status } from '../enums/Status';

export default class BloodRequestService {
    private requests: BloodRequest[] = [];

    public addRequest(request: BloodRequest): void {
        this.requests.push(request);
    }

    public findById(id: string): BloodRequest | null {
        return this.requests.find((request) => request.getId() === id) ?? null;
    }

    public getAllRequests(): BloodRequest[] {
        return this.requests;
    }

    public changeStatus(id: string, status: Status): void {
        const request = this.findById(id);

        if (!request) {
            throw new Error('Pedido não encontrado.');
        }

        request.setStatus(status);
    }

    public cancelRequest(id: string): boolean {
        const request = this.findById(id);

        if (!request) {
            throw new Error('Pedido não encontrado.');
        }

        if (request.getStatus() !== Status.PENDING) {
            return false;
        }

        request.setStatus(Status.CANCELED);

        return true;
    }

    public findByHospital(hospitalId: string): BloodRequest[] {
        return this.requests.filter(
            (request) => request.getHospital().getId() === hospitalId,
        );
    }

    public findByBloodType(bloodType: string): BloodRequest[] {
        return this.requests.filter(
            (request) => request.getBloodType().toString() === bloodType,
        );
    }
}
