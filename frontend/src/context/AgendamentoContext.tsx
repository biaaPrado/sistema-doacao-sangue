import { createContext, useContext, useEffect, useState, type ReactNode, } from "react";
import type { Agendamento } from "../types/Agendamento";

interface AgendamentoContextType {
    agendamentos: Agendamento[];
    addAgendamento: (agendamento: Agendamento) => void;
    
    atualizarAgendamento: (id: string, agendamentoAtualizado: Agendamento) => void;
    removerAgendamento: (id: string) => void;

    agendamentoEmEdicao: Agendamento | null;
    setAgendamentoEmEdicao: (agendamento: Agendamento | null) => void;
}

const AgendamentoContext = createContext< AgendamentoContextType | undefined >(undefined);

export function AgendamentoProvider({children,}: { children: ReactNode; }) {
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
    const [agendamentoEmEdicao, setAgendamentoEmEdicao] = useState<Agendamento | null>(null);

    useEffect(() => { const dadosSalvos = localStorage.getItem("agendamentos");

    if (dadosSalvos) { setAgendamentos(JSON.parse(dadosSalvos)); } }, []);

    useEffect(() => { localStorage.setItem("agendamentos", JSON.stringify(agendamentos)); }, [agendamentos]);

    function addAgendamento(agendamento: Agendamento) {
        setAgendamentos((prev) => [...prev, agendamento]);
    }

    function atualizarAgendamento(id: string, agendamentoAtualizado: Agendamento) {
        setAgendamentos((prev) => prev.map((agendamento) => agendamento.id === id ? agendamentoAtualizado : agendamento));
    }

    function removerAgendamento(id: string) {
        setAgendamentos((prev) => prev.filter((agendamento) => agendamento.id !== id));
    }

    return (
        <AgendamentoContext.Provider
            value={{
                agendamentos,
                addAgendamento,
                atualizarAgendamento,
                removerAgendamento,
                agendamentoEmEdicao,
                setAgendamentoEmEdicao,
            }}
        > {children}
        </AgendamentoContext.Provider>
    );
}

export function useAgendamentos() {
    const context = useContext(AgendamentoContext);

    if (!context) {
        throw new Error("useAgendamentos deve ser usado dentro de um AgendamentoProvider");
    }

    return context;
}