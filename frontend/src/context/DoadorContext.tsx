// src/context/DoadorContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { DonorDTO } from '../../../backend/src/domain/dtos/DonorDTO';
import type { DonationDTO } from '../../../backend/src/domain/dtos/DonationDTO';
import { system } from '../system/system';

interface DoadorContextType {
    doadores: DonorDTO[];
    addDoador: (doador: DonorDTO) => void;
    removerDoador: (id: string) => void;
    doadorEmEdicao: DonorDTO | null;
    setDoadorEmEdicao: (doador: DonorDTO | null) => void;
    atualizarDoador: (doador: DonorDTO) => void;
    registrarDoacao: (donation: DonationDTO) => void;
    carregarDoadores: () => void;
}

const DoadorContext = createContext<DoadorContextType | null>(null);

export function DoadorProvider({ children }: { children: React.ReactNode }) {
    const [doadores, setDoadores] = useState<DonorDTO[]>([]);
    const [doadorEmEdicao, setDoadorEmEdicao] = useState<DonorDTO | null>(null);

    // Função auxiliar para sincronizar o estado do React com os dados contidos no System
    const carregarDoadores = () => {
        const todosDoadores = system.getAllDonors();
        setDoadores(todosDoadores);
    };

    // Carrega a lista inicial assim que o provider for montado
    useEffect(() => {
        carregarDoadores();
    }, []);

    function addDoador(doador: DonorDTO) {
        system.createDonor(doador);
        carregarDoadores(); // Sincroniza o estado do front com o back
    }

    function removerDoador(id: string) {
        try {
            system.removeDonor(id);
            carregarDoadores();
        } catch (error) {
            console.error('Erro ao remover doador:', error);
        }
    }

    function atualizarDoador(doador: DonorDTO) {
        system.updateDonor(doador);
        carregarDoadores();
    }

    function registrarDoacao(donation: DonationDTO) {
        try {
            // O método do system valida se o doador existe e se é elegível antes de criar
            system.createDonation(donation);
            carregarDoadores(); // Recarrega para trazer o histórico de doações atualizado nas propriedades do doador
        } catch (error: any) {
            // Captura os erros de elegibilidade jogados pelo EligibilityService no backend
            alert(error.message);
            console.error('Erro ao registrar doação:', error);
        }
    }

    return (
        <DoadorContext.Provider
            value={{
                doadores,
                addDoador,
                removerDoador,
                atualizarDoador,
                registrarDoacao,
                doadorEmEdicao,
                setDoadorEmEdicao,
                carregarDoadores,
            }}
        >
            {children}
        </DoadorContext.Provider>
    );
}

export function useDoadores() {
    const context = useContext(DoadorContext);

    if (!context) {
        throw new Error('useDoadores precisa estar dentro do DoadorProvider');
    }

    return context;
}
