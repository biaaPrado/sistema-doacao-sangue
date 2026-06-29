export default class Hospital {
    constructor(
        private id: string,
        private name: string,
        private cnpj: string,
        private phone: string,
        private email: string,
        private cep: string,
        private address: string,
        private number: string,
        private complement: string | null,
        private city: string,
        private state: string,
    ) {}

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getCnpj(): string {
        return this.cnpj;
    }

    public getPhone(): string {
        return this.phone;
    }

    public getEmail(): string {
        return this.email;
    }

    public getCep(): string {
        return this.cep;
    }

    public getAddress(): string {
        return this.address;
    }

    public getNumber(): string {
        return this.number;
    }

    public getComplement(): string | null {
        return this.complement;
    }

    public getCity(): string {
        return this.city;
    }

    public getState(): string {
        return this.state;
    }
}
