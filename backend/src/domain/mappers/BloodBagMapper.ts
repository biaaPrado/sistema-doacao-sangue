import BloodBag from '../entities/BloodBag';
import { BloodBagDTO } from '../dtos/BloodBagDTO';
import { BloodTypeMapper } from './BloodTypeMapper';

export class BloodBagMapper {
    static toDTO(bloodBag: BloodBag): BloodBagDTO {
        return {
            id: bloodBag.getId(),
            bloodType: BloodTypeMapper.toDTO(bloodBag.getBloodType()),
            collectionDate: bloodBag.getCollectionDate(),
            expirationDate: bloodBag.getExpirationDate(),
            volume: bloodBag.getVolume(),
            available: bloodBag.isAvailable(),
        };
    }
}
