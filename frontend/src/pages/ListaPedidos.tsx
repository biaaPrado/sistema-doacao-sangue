import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { usePedidos } from "../context/PedidoContext";
import { useHospitais } from "../context/HospitalContext";
import { ConfirmModal } from "../components/ConfirmModal/ConfirmModal";

export function ListaPedidos() {
    const navigate = useNavigate();

    const { pedidos, alterarStatus } = usePedidos();
    const { hospitais } = useHospitais();

    const [filtroHospital, setFiltroHospital] = useState("");
    const [filtroTipo, setFiltroTipo] = useState("");
    const [filtroStatus, setFiltroStatus] = useState("");
    const [filtroPrioridade, setFiltroPrioridade] = useState("");
    
    const [modalAberto, setModalAberto] = useState(false);
    const [acaoSelecionada, setAcaoSelecionada] = useState< "Concluído" | "Cancelado" | null >(null);
    const [pedidoSelecionado, setPedidoSelecionado] = useState("");

    function formatarData(data: string) {
        const [ano, mes, dia] = data.split("-");
        return `${dia}/${mes}/${ano}`;
    }

    function abrirConfirmacao( pedidoId: string, acao: "Concluído" | "Cancelado") {
        setPedidoSelecionado(pedidoId);
        setAcaoSelecionada(acao);
        setModalAberto(true);
    }

    function confirmarAcao() {
        if (!pedidoSelecionado || !acaoSelecionada) return;

        alterarStatus(pedidoSelecionado, acaoSelecionada);

        setModalAberto(false);
        setPedidoSelecionado("");
        setAcaoSelecionada(null);
    }

    const pedidosFiltrados = pedidos
    .filter((pedido) => {
        const hospital = hospitais.find((h) => h.id === pedido.hospitalId);
        const matchHospital = hospital?.nome.toLowerCase().includes(filtroHospital.toLowerCase());
        const matchTipo = filtroTipo? pedido.tipoSanguineo === filtroTipo: true;
        const matchStatus = filtroStatus? pedido.status === filtroStatus: true;
        const matchPrioridade = filtroPrioridade ? pedido.prioridade === filtroPrioridade: true;

        return matchHospital && matchTipo && matchStatus && matchPrioridade;
    })
    .sort((a, b) => {
        return new Date(b.dataPedido).getTime() - new Date(a.dataPedido).getTime();
    });

    return (
        <MainLayout>
            <div className="max-w-8xl mx-auto bg-white p-8 rounded-2xl shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-red-700"> Pedidos de Sangue </h1>
                    <button
                        onClick={() => navigate("/pedido/novo")}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl">
                        Novo Pedido
                    </button>
                </div>

                <div className="grid grid-cols-5 gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Busca por Hospital..."
                        value={filtroHospital}
                        onChange={(e) => setFiltroHospital(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2"
                    />

                    <select
                        value={filtroTipo}
                        onChange={(e) => setFiltroTipo(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2" >
                        <option value="">Tipo sanguíneo</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="AB">AB</option>
                        <option value="O">O</option>
                    </select>

                    <select
                        value={filtroStatus}
                        onChange={(e) => setFiltroStatus(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2" >
                        <option value="">Status</option>
                        <option value="Pendente">Pendente</option>
                        <option value="Concluído">Concluído</option>
                        <option value="Cancelado">Cancelado</option>
                    </select>

                    <select
                        value={filtroPrioridade}
                        onChange={(e) => setFiltroPrioridade(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2" >
                        <option value="">Prioridade</option>
                        <option value="Baixa">Baixa</option>
                        <option value="Média">Média</option>
                        <option value="Alta">Alta</option>
                        <option value="Urgente">Urgente</option>
                    </select>

                    <button
                        onClick={() => {
                            setFiltroHospital("");
                            setFiltroTipo("");
                            setFiltroStatus("");
                            setFiltroPrioridade("");
                        }}
                        className="bg-gray-200 hover:bg-gray-300 rounded-lg border border-gray-300 px-3 py-2" >
                        Limpar Filtros
                    </button>
                </div>

                {pedidosFiltrados.length === 0 ? ( <p className="text-gray-500"> Nenhum pedido encontrado </p>) : (
                    <div className="space-y-4">
                        {pedidosFiltrados.map((pedido) => { const hospital = hospitais.find((h) => h.id === pedido.hospitalId);

                        return (
                            <div key={pedido.id} onClick={() => navigate(`/pedidos/${pedido.id}`)} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition cursor-pointer">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="font-bold text-lg"> {hospital?.nome ?? "Hospital não encontrado"} </h2>

                                        <p className="text-gray-500"> 
                                            Tipo: {pedido.tipoSanguineo} {pedido.fatorRh} •{" "} Bolsas: {pedido.quantidadeBolsas} •{" "} Data: {formatarData(pedido.dataPedido)}
                                        </p>

                                    <div className="flex gap-4 mt-1 items-center">
                                        <p className="text-sm mt-1"> Prioridade:{" "} 
                                            <span className="font-semibold"> {pedido.prioridade} </span> 
                                        </p>

                                        <p className={
                                            pedido.status === "Concluído" ? "text-green-600 font-semibold mt-1": 
                                            pedido.status === "Cancelado" ? "text-red-600 font-semibold mt-1" : 
                                            "text-orange-500 font-semibold mt-1"} > Status: {pedido.status}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    {pedido.status === "Pendente" && (
                                    <>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); abrirConfirmacao(pedido.id, "Concluído"); }}
                                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg" >
                                            Concluir
                                        </button>

                                        <button
                                            onClick={(e) => { e.stopPropagation(); abrirConfirmacao(pedido.id, "Cancelado"); }}
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg" >
                                            Cancelar
                                        </button>
                                    </>)}
                                </div>
                            </div>
                        </div>
                        );
                })}
            </div>
        )}
      </div>
      
      <ConfirmModal
        isOpen={modalAberto}
        title={ acaoSelecionada === "Concluído" ? "Concluir Pedido" : "Cancelar Pedido" }
        message={ acaoSelecionada === "Concluído" ? "Você está concluindo este pedido, confirmado?" : "Tem certeza que deseja cancelar este pedido?" }
        onConfirm={confirmarAcao}
        onCancel={() => {
            setModalAberto(false);
            setPedidoSelecionado("");
            setAcaoSelecionada(null);
        }}
      />
    </MainLayout>
  );
}