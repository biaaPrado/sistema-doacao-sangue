import { createContext, useContext, useEffect, useState } from 'react';
import type { BloodBagDTO } from '../../../backend/src/domain/dtos/BloodBagDTO';
import { system } from '../system/system';

interface EstoqueContextType {
    bolsas: BloodBagDTO[];
    carregarEstoque: () => void;
}

const EstoqueContext = createContext<EstoqueContextType | null>(null);

export function EstoqueProvider({ children }: { children: React.ReactNode }) {
    const [bolsas, setBolsas] = useState<BloodBagDTO[]>([]);

    function carregarEstoque() {
        setBolsas(system.getStock());
    }

    useEffect(() => {
        carregarEstoque();
    }, []);

    return (
        <EstoqueContext.Provider
            value={{
                bolsas,
                carregarEstoque,
            }}
        >
            {children}
        </EstoqueContext.Provider>
    );
}

export function useEstoque() {
    const context = useContext(EstoqueContext);

    if (!context) {
        throw new Error('useEstoque precisa estar dentro do EstoqueProvider');
    }

    return context;
}
