import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { AppointmentDTO } from '../../../backend/src/domain/dtos/AppointmentDTO';
import { system } from '../system/system';

interface AgendamentoContextType {
    agendamentos: AppointmentDTO[];

    addAgendamento: (agendamento: AppointmentDTO) => void;
    atualizarAgendamento: (agendamento: AppointmentDTO) => void;
    removerAgendamento: (id: string) => void;
    concluirAgendamento: (id: string) => void;

    carregarAgendamentos: () => void;

    agendamentoEmEdicao: AppointmentDTO | null;
    setAgendamentoEmEdicao: (agendamento: AppointmentDTO | null) => void;
}

const AgendamentoContext = createContext<AgendamentoContextType | null>(null);

export function AgendamentoProvider({ children }: { children: ReactNode }) {
    const [agendamentos, setAgendamentos] = useState<AppointmentDTO[]>([]);
    const [agendamentoEmEdicao, setAgendamentoEmEdicao] =
        useState<AppointmentDTO | null>(null);

    function carregarAgendamentos() {
        setAgendamentos(system.getAppointments());
    }

    useEffect(() => {
        carregarAgendamentos();
    }, []);

    function addAgendamento(agendamento: AppointmentDTO) {
        system.createAppointment(agendamento);
        carregarAgendamentos();
    }

    function atualizarAgendamento(agendamento: AppointmentDTO) {
        system.updateAppointment(agendamento);
        carregarAgendamentos();
    }

    function removerAgendamento(id: string) {
        try {
            system.removeAppointment(id);
            carregarAgendamentos();
        } catch (error) {
            console.error('Erro ao remover agendamento:', error);
            throw error;
        }
    }

    function concluirAgendamento(id: string) {
        try {
            system.completeAppointment(id);
            carregarAgendamentos();
        } catch (error) {
            console.error('Erro ao concluir agendamento:', error);
            throw error;
        }
    }

    return (
        <AgendamentoContext.Provider
            value={{
                agendamentos,
                addAgendamento,
                atualizarAgendamento,
                removerAgendamento,
                concluirAgendamento,
                carregarAgendamentos,
                agendamentoEmEdicao,
                setAgendamentoEmEdicao,
            }}
        >
            {children}
        </AgendamentoContext.Provider>
    );
}

export function useAgendamentos() {
    const context = useContext(AgendamentoContext);

    if (!context) {
        throw new Error(
            'useAgendamentos deve ser usado dentro de um AgendamentoProvider',
        );
    }

    return context;
}
