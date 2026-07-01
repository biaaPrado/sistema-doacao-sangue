import BloodRequest from '../entities/BloodRequest';
import { BloodRequestDTO } from '../dtos/BloodRequestDTO';
import { HospitalMapper } from './HospitalMapper';
import { BloodTypeMapper } from './BloodTypeMapper';

export class BloodRequestMapper {
    static toDTO(bloodRequest: BloodRequest): BloodRequestDTO {
        return {
            id: bloodRequest.getId(),
            hospital: HospitalMapper.toDTO(bloodRequest.getHospital()),
            requestDate: bloodRequest.getRequestDate(),
            bloodType: BloodTypeMapper.toDTO(bloodRequest.getBloodType()),
            quantity: bloodRequest.getQuantity(),
            priority: bloodRequest.getPriority(),
            status: bloodRequest.getStatus(),
            observations: bloodRequest.getObservations(),
        };
    }

    static toEntity(dto: BloodRequestDTO): BloodRequest {
        return new BloodRequest(
            dto.id,
            HospitalMapper.toEnitity(dto.hospital),
            dto.requestDate,
            BloodTypeMapper.toEntity(dto.bloodType),
            dto.quantity,
            dto.priority,
            dto.status,
            dto.observations,
        );
    }
}
