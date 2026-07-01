import { AppointmentDTO } from '../dtos/AppointmentDTO';
import { BloodBagDTO } from '../dtos/BloodBagDTO';
import { BloodRequestDTO } from '../dtos/BloodRequestDTO';
import { DonationDTO } from '../dtos/DonationDTO';
import { DonorDTO } from '../dtos/DonorDTO';
import { HospitalDTO } from '../dtos/HospitalDTO';
import BloodBag from '../entities/BloodBag';
import Donation from '../entities/Donation';

import { Status } from '../enums/Status';
import { AppointmentMapper } from '../mappers/AppointmentMapper';
import { BloodBagMapper } from '../mappers/BloodBagMapper';
import { BloodRequestMapper } from '../mappers/BloodRequestMapper';
import { BloodTypeMapper } from '../mappers/BloodTypeMapper';
import { DonationMapper } from '../mappers/DonationMapper';
import { DonorMapper } from '../mappers/DonorMapper';
import { HospitalMapper } from '../mappers/HospitalMapper';

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

    public createDonor(donor: DonorDTO): void {
        this.donorService.addDonor(donor);
    }

    public updateDonor(donor: DonorDTO): void {
        this.donorService.updateDonor(donor);
    }

    public removeDonor(id: string): void {
        this.donorService.removeDonor(id);
    }

    public findDonorById(id: string): DonorDTO | null {
        const donor = this.donorService.findById(id);
        return donor ? DonorMapper.toDTO(donor) : null;
    }

    public getAllDonors(): DonorDTO[] {
        return this.donorService.getAllDonors().map(DonorMapper.toDTO);
    }

    public getAllDonationsByDonor(donorDTO: DonorDTO): DonationDTO[] {
        const donor = this.donorService.findById(donorDTO.id);

        if (!donor) {
            return [];
        }
        return this.donationService
            .getDonationsByDonor(donor)
            .map(DonationMapper.toDTO);
    }

    /*
    ========================================
                DOAÇÕES
    ========================================
    */

    public createDonation(donationDTO: DonationDTO): void {
        const donor = this.donorService.findById(donationDTO.donor.id);

        if (!donor) {
            throw new Error('Doador não encontrado');
        }

        if (!EligibilityService.canDonate(donor)) {
            throw new Error('Doador não é elegível para doar sangue');
        }

        const donation = DonationMapper.toEntity(donationDTO, donor);

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
    }

    public getAllDonations(): DonationDTO[] {
        return this.donationService.getAll().map(DonationMapper.toDTO);
    }

    /*
    ========================================
                HOSPITAIS
    ========================================
    */

    public createHospital(hospital: HospitalDTO): void {
        this.hospitalService.addHospital(hospital);
    }

    public updateHospital(hospital: HospitalDTO): void {
        this.hospitalService.updateHospital(hospital);
    }

    public removeHospital(id: string): void {
        this.hospitalService.removeHospital(id);
    }

    public findHospitalById(id: string): HospitalDTO | null {
        const hospital = this.hospitalService.findById(id);

        return hospital ? HospitalMapper.toDTO(hospital) : null;
    }

    public getAllHospitals(): HospitalDTO[] {
        return this.hospitalService.getAllHospitals().map(HospitalMapper.toDTO);
    }

    /*
    ========================================
                AGENDAMENTOS
    ========================================
    */

    public createAppointment(appointmentDTO: AppointmentDTO): void {
        const donor = this.donorService.findById(appointmentDTO.donor.id);

        if (!donor) {
            throw new Error('Doador não encontrado');
        }

        const appointment = AppointmentMapper.toEntity(appointmentDTO, donor);

        this.appointmentService.create(appointment);
    }

    public updateAppointment(appointmentDTO: AppointmentDTO): void {
        const donor = this.donorService.findById(appointmentDTO.donor.id);

        if (!donor) {
            throw new Error('Doador não encontrado.');
        }

        this.appointmentService.update(appointmentDTO, donor);
    }

    public cancelAppointment(id: string): void {
        this.appointmentService.cancel(id);
    }

    public removeAppointment(id: string): void {
        this.appointmentService.remove(id);
    }

    public getAppointments(): AppointmentDTO[] {
        return this.appointmentService.getAll().map(AppointmentMapper.toDTO);
    }

    /*
    ========================================
            CONCLUIR AGENDAMENTO
    ========================================
    */

    public completeAppointment(id: string): void {
        const appointment = this.appointmentService.findById(id);

        if (!appointment || appointment.getStatus() !== Status.PENDING) {
            throw new Error('Agendamento não encontrado ou não está pendente');
        }

        const donor = appointment.getDonor();

        if (!EligibilityService.canDonate(donor)) {
            throw new Error('Doador não é elegível para doar sangue');
        }

        const donation = new Donation(
            crypto.randomUUID(),
            donor,
            450,
            appointment.getDate(),
        );

        this.donationService.addDonation(donation);

        const bag = new BloodBag(
            crypto.randomUUID(),
            donor.getBloodType(),
            donation.getDonationDate(),
            donation.getVolume(),
            true,
        );

        this.stockService.addBag(bag);

        this.appointmentService.complete(id);
    }

    /*
    ========================================
                ESTOQUE
    ========================================
    */

    public getStock(): BloodBagDTO[] {
        return this.stockService.getAllBags().map(BloodBagMapper.toDTO);
    }

    public getCompatibleBags(requestDTO: BloodRequestDTO): BloodBagDTO[] {
        return this.stockService
            .findCompatibleBags(BloodTypeMapper.toEntity(requestDTO.bloodType))
            .map(BloodBagMapper.toDTO);
    }

    /*
    ========================================
                PEDIDOS
    ========================================
    */

    public createBloodRequest(requestDTO: BloodRequestDTO): void {
        this.bloodRequestService.addRequest(requestDTO);
    }

    public cancelBloodRequest(id: string): void {
        this.bloodRequestService.cancelRequest(id);
    }

    public getBloodRequests(): BloodRequestDTO[] {
        return this.bloodRequestService
            .getAllRequests()
            .map(BloodRequestMapper.toDTO);
    }

    /*
    ========================================
            DISTRIBUIÇÃO
    ========================================
    */

    public fulfillRequest(id: string): void {
        const request = this.bloodRequestService.findById(id);

        if (!request) {
            throw new Error('Pedido não encontrado.');
        }

        const success = this.distributionService.fulfillRequest(request);

        if (!success) {
            throw new Error(
                'Não há bolsas de sangue suficientes para atender ao pedido.',
            );
        }

        this.bloodRequestService.changeStatus(id, Status.COMPLETED);
    }
}
