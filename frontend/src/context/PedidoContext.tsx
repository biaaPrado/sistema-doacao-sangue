import { createContext, useContext, useState } from "react";
import type { PedidoSangue } from "../types/PedidoSangue";
import { mockPedidos } from "../mocks/mockPedidos";

interface PedidoContextType {
  pedidos: PedidoSangue[];

  addPedido: (pedido: PedidoSangue) => void;
  removerPedido: (id: string) => void;
  atualizarPedido: (id: string, pedido: PedidoSangue) => void;
  alterarStatus: (id: string, status: PedidoSangue["status"]) => void;
  pedidoEmEdicao: PedidoSangue | null;
  setPedidoEmEdicao: ( pedido: PedidoSangue | null ) => void;
}

const PedidoContext = createContext<PedidoContextType | null>(null);

export function PedidoProvider({children, }: { children: React.ReactNode;}) {
    //const [pedidos, setPedidos] = useState<PedidoSangue[]>([]);
    const [pedidos, setPedidos] = useState<PedidoSangue[]>(mockPedidos);
    const [pedidoEmEdicao, setPedidoEmEdicao] =
    useState<PedidoSangue | null>(null);

    function addPedido(pedido: PedidoSangue) {
        setPedidos((prev) => [...prev, pedido,]);
    }
    
    function removerPedido(id: string) {
        setPedidos((prev) => prev.filter((pedido) => pedido.id !== id));
    }

    function atualizarPedido(id: string, pedido: PedidoSangue) {
        setPedidos((prev) => prev.map((p) => p.id === id ? pedido : p));
    }
    
    function alterarStatus(id: string, status: PedidoSangue["status"]) {
        setPedidos((prev) => prev.map((pedido) => pedido.id === id ? {...pedido, status, }: pedido));
    }

    return (
        <PedidoContext.Provider
            value={{
                pedidos,
                addPedido,
                removerPedido,
                atualizarPedido,
                alterarStatus,
                pedidoEmEdicao,
                setPedidoEmEdicao,
            }}
        > {children}
        </PedidoContext.Provider>
    );
}

export function usePedidos() {
    const context = useContext(PedidoContext);
    if (!context) {
        throw new Error("usePedidos deve estar dentro do PedidoProvider");
    }
    return context;
}