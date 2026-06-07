export default class BloodType {
    constructor(
        private id: number,
        private type: string,
        private rhFactor: string,
    ) {}

    public getId(): number {
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

    public canDonateTo(recipient: BloodType): boolean {
        const donor = this.toString();
        const receiver = recipient.toString();

        const compatibility: Record<string, string[]> = {
            'O-': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
            'O+': ['O+', 'A+', 'B+', 'AB+'],
            'A-': ['A-', 'A+', 'AB-', 'AB+'],
            'A+': ['A+', 'AB+'],
            'B-': ['B-', 'B+', 'AB-', 'AB+'],
            'B+': ['B+', 'AB+'],
            'AB-': ['AB-', 'AB+'],
            'AB+': ['AB+'],
        };

        return compatibility[donor]?.includes(receiver) || false;
    }
}
