import BloodType from '../entities/BloodType';
import { BloodTypeDTO } from '../dtos/BloodTypeDTO';

export class BloodTypeMapper {
    static toDTO(bloodType: BloodType): BloodTypeDTO {
        return {
            id: bloodType.getId(),
            type: bloodType.getType(),
            rhFactor: bloodType.getRhFactor(),
        };
    }

    static toEntity(dto: BloodTypeDTO): BloodType {
        return new BloodType(dto.id, dto.type, dto.rhFactor);
    }
}
