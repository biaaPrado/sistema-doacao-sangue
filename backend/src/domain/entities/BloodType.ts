export default class BloodType {
    constructor(
        private id: string,
        private type: string,
        private rhFactor: string,
    ) {}

    public getId(): string {
        return this.id;
    }

    public getType(): string {
        return this.type;
    }

    public getRhFactor(): string {
        return this.rhFactor;
    }

    public toString(): string {
        return `${this.type}${this.rhFactor}`;
    }

    public static getCompatibleDonors(recipient: BloodType): string[] {
        const compatibility: Record<string, string[]> = {
            'O-': ['O-'],
            'O+': ['O-', 'O+'],
            'A-': ['O-', 'A-'],
            'A+': ['O-', 'O+', 'A-', 'A+'],
            'B-': ['O-', 'B-'],
            'B+': ['O-', 'O+', 'B-', 'B+'],
            'AB-': ['O-', 'A-', 'B-', 'AB-'],
            'AB+': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
        };

        return compatibility[recipient.toString()];
    }
}
