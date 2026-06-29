import Donor from '../entities/Donor';
import { Sex } from '../enums/Sex';

export default class EligibilityService {
    public static canDonate(donor: Donor): boolean {
        const age = donor.getAge();

        if (age < 18 || age > 69) {
            return false;
        }

        if (donor.getWeight() < 50) {
            return false;
        }

        const lastDonation = donor.getLastDonation();

        if (lastDonation) {
            const diffDays = Math.floor(
                (new Date().getTime() -
                    lastDonation.getDonationDate().getTime()) /
                    (1000 * 60 * 60 * 24),
            );

            if (donor.getSex() === Sex.MALE && diffDays < 60) {
                return false;
            } else if (
                (donor.getSex() === Sex.FEMALE ||
                    donor.getSex() === Sex.OTHER) &&
                diffDays < 90
            ) {
                return false;
            }
        }
        return true;
    }
}
