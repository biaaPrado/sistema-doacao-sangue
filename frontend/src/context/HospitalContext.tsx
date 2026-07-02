import { createContext, useContext, useState, useEffect } from 'react';
import type { HospitalDTO } from '../../../backend/src/domain/dtos/HospitalDTO';
import { system } from '../system/system';

interface HospitalContextType {
    hospitais: HospitalDTO[];

    addHospital: (hospital: HospitalDTO) => void;
    removerHospital: (id: string) => void;
    atualizarHospital: (hospital: HospitalDTO) => void;

    hospitalEmEdicao: HospitalDTO | null;
    setHospitalEmEdicao: (hospital: HospitalDTO | null) => void;
}

const HospitalContext = createContext<HospitalContextType | null>(null);

export function HospitalProvider({ children }: { children: React.ReactNode }) {
    const [hospitais, setHospitais] = useState<HospitalDTO[]>([]);
    const [hospitalEmEdicao, setHospitalEmEdicao] =
        useState<HospitalDTO | null>(null);

    const carregarHospitais = () => {
        const todos = system.getAllHospitals();
        setHospitais(todos);
    };

    useEffect(() => {
        carregarHospitais();
    }, []);

    function addHospital(hospital: HospitalDTO) {
        system.createHospital(hospital);
        carregarHospitais();
    }

    function removerHospital(id: string) {
        try {
            system.removeHospital(id);
            carregarHospitais();
        } catch (error) {
            console.error('Erro ao remover hospital:', error);
            throw error;
        }
    }

    function atualizarHospital(hospital: HospitalDTO) {
        system.updateHospital(hospital);
        carregarHospitais();
    }

    return (
        <HospitalContext.Provider
            value={{
                hospitais,
                addHospital,
                removerHospital,
                atualizarHospital,
                hospitalEmEdicao,
                setHospitalEmEdicao,
            }}
        >
            {children}
        </HospitalContext.Provider>
    );
}

export function useHospitais() {
    const context = useContext(HospitalContext);

    if (!context) {
        throw new Error('useHospitais deve estar dentro do HospitalProvider');
    }

    return context;
}
