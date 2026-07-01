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

    public setName(name: string): void {
        this.name = name;
    }

    public setCnpj(cnpj: string): void {
        this.cnpj = cnpj;
    }

    public setPhone(phone: string): void {
        this.phone = phone;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public setCep(cep: string): void {
        this.cep = cep;
    }

    public setAddress(address: string): void {
        this.address = address;
    }

    public setNumber(number: string): void {
        this.number = number;
    }

    public setComplement(complement: string | null): void {
        this.complement = complement;
    }

    public setCity(city: string): void {
        this.city = city;
    }

    public setState(state: string): void {
        this.state = state;
    }
}
