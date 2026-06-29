import Appointment from '../entities/Appointment';
import BloodBag from '../entities/BloodBag';
import BloodRequest from '../entities/BloodRequest';
import Donation from '../entities/Donation';
import Donor from '../entities/Donor';
import Hospital from '../entities/Hospital';

import { Status } from '../enums/Status';

import AppointmentService from '../services/AppointmentService';
import BloodRequestService from '../services/BloodRequestService';
import DistributionService from '../services/DistributionService';
import DonationService from '../services/DonationService';
import DonorService from '../services/DonorService';
import EligibilityService from '../services/EligibilityService';
import HospitalService from '../services/HospitalService';
import StockService from '../services/StockService';

export default class HemocenterSystem {
    private donorService = new DonorService();

    private donationService = new DonationService();

    private hospitalService = new HospitalService();

    private appointmentService = new AppointmentService();

    private bloodRequestService = new BloodRequestService();

    private stockService = new StockService();

    private distributionService = new DistributionService(this.stockService);

    /*
    ========================================
                DOADORES
    ========================================
    */

    public createDonor(donor: Donor): void {
        this.donorService.addDonor(donor);
    }

    public updateDonor(id: string, donor: Donor): void {
        this.donorService.updateDonor(id, donor);
    }

    public removeDonor(id: string): void {
        this.donorService.removeDonor(id);
    }

    public findDonorById(id: string): Donor | null {
        return this.donorService.findById(id);
    }

    public getAllDonors(): Donor[] {
        return this.donorService.getAllDonors();
    }

    /*
    ========================================
                DOAÇÕES
    ========================================
    */

    public createDonation(donation: Donation): void {
        this.donationService.addDonation(donation);
    }

    public getDonations(): Donation[] {
        return this.donationService.getAll();
    }

    /*
    ========================================
                HOSPITAIS
    ========================================
    */

    public createHospital(hospital: Hospital): void {
        this.hospitalService.addHospital(hospital);
    }

    public updateHospital(id: string, hospital: Hospital): void {
        this.hospitalService.updateHospital(id, hospital);
    }

    public removeHospital(id: string): void {
        this.hospitalService.removeHospital(id);
    }

    public findHospitalById(id: string): Hospital | null {
        return this.hospitalService.findById(id);
    }

    public getAllHospitals(): Hospital[] {
        return this.hospitalService.getAllHospitals();
    }

    /*
    ========================================
                AGENDAMENTOS
    ========================================
    */

    public createAppointment(appointment: Appointment): void {
        this.appointmentService.create(appointment);
    }

    public updateAppointment(id: string, appointment: Appointment): boolean {
        return this.appointmentService.update(id, appointment);
    }

    public cancelAppointment(id: string): boolean {
        return this.appointmentService.cancel(id);
    }

    public removeAppointment(id: string): boolean {
        return this.appointmentService.remove(id);
    }

    public getAppointments(): Appointment[] {
        return this.appointmentService.getAll();
    }

    /*
    ========================================
            CONCLUIR AGENDAMENTO
    ========================================
    */

    public completeAppointment(id: string): boolean {
        const appointment = this.appointmentService.findById(id);

        if (!appointment || appointment.getStatus() !== Status.PENDING) {
            return false;
        }

        const donor = appointment.getDonor();

        if (!EligibilityService.canDonate(donor)) {
            return false;
        }

        const donation = new Donation(
            crypto.randomUUID(),
            donor,
            450,
            appointment.getDate(),
        );

        donor.addDonation(donation);

        this.donationService.addDonation(donation);

        const bag = new BloodBag(
            crypto.randomUUID(),
            donor.getBloodType(),
            donation.getDonationDate(),
            donation.getVolume(),
            true,
        );

        this.stockService.addBag(bag);

        return this.appointmentService.complete(id);
    }

    /*
    ========================================
                ESTOQUE
    ========================================
    */

    public getStock(): BloodBag[] {
        return this.stockService.getAllBags();
    }

    public getCompatibleBags(request: BloodRequest): BloodBag[] {
        return this.stockService.findCompatibleBags(request.getBloodType());
    }

    /*
    ========================================
                PEDIDOS
    ========================================
    */

    public createBloodRequest(request: BloodRequest): void {
        this.bloodRequestService.addRequest(request);
    }

    public cancelBloodRequest(id: string): void {
        this.bloodRequestService.cancelRequest(id);
    }

    public getBloodRequests(): BloodRequest[] {
        return this.bloodRequestService.getAllRequests();
    }

    /*
    ========================================
            DISTRIBUIÇÃO
    ========================================
    */

    public fulfillRequest(id: string): boolean {
        const request = this.bloodRequestService.findById(id);

        if (!request) {
            throw new Error('Pedido não encontrado.');
        }

        const success = this.distributionService.fulfillRequest(request);

        if (!success) {
            return false;
        }

        this.bloodRequestService.changeStatus(id, Status.COMPLETED);

        return true;
    }
}
