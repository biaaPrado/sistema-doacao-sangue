import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

import type { BloodRequestDTO } from '../../../backend/src/domain/dtos/BloodRequestDTO';

import { system } from '../system/system';

interface PedidoContextType {
    pedidos: BloodRequestDTO[];

    addPedido: (pedido: BloodRequestDTO) => void;
    cancelarPedido: (id: string) => void;
    concluirPedido: (id: string) => void;

    carregarPedidos: () => void;

    pedidoEmEdicao: BloodRequestDTO | null;
    setPedidoEmEdicao: (pedido: BloodRequestDTO | null) => void;
}

const PedidoContext = createContext<PedidoContextType | null>(null);

export function PedidoProvider({ children }: { children: ReactNode }) {
    const [pedidos, setPedidos] = useState<BloodRequestDTO[]>([]);
    const [pedidoEmEdicao, setPedidoEmEdicao] =
        useState<BloodRequestDTO | null>(null);

    function carregarPedidos() {
        setPedidos(system.getBloodRequests());
    }

    useEffect(() => {
        carregarPedidos();
    }, []);

    function addPedido(pedido: BloodRequestDTO) {
        system.createBloodRequest(pedido);
        carregarPedidos();
    }

    function cancelarPedido(id: string) {
        try {
            system.cancelBloodRequest(id);
            carregarPedidos();
        } catch (error) {
            console.error('Erro ao cancelar pedido:', error);
            throw error;
        }
    }

    function concluirPedido(id: string) {
        system.fulfillRequest(id);
        carregarPedidos();
    }

    return (
        <PedidoContext.Provider
            value={{
                pedidos,
                addPedido,
                cancelarPedido,
                concluirPedido,
                carregarPedidos,
                pedidoEmEdicao,
                setPedidoEmEdicao,
            }}
        >
            {children}
        </PedidoContext.Provider>
    );
}

export function usePedidos() {
    const context = useContext(PedidoContext);

    if (!context) {
        throw new Error('usePedidos deve estar dentro do PedidoProvider');
    }

    return context;
}
