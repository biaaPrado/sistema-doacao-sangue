import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MainLayout } from '../layouts/MainLayout';
import { ConfirmModal } from '../components/ConfirmModal/ConfirmModal';

import { usePedidos } from '../context/PedidoContext';
import { useEstoque } from '../context/EstoqueContext';

import { Status } from '../../../backend/src/domain/enums/Status';
import { Priority } from '../../../backend/src/domain/enums/Priority';

export function ListaPedidos() {
    const navigate = useNavigate();

    const { pedidos, concluirPedido, cancelarPedido } = usePedidos();
    const { carregarEstoque } = useEstoque();

    const [filtroHospital, setFiltroHospital] = useState('');
    const [filtroTipo, setFiltroTipo] = useState('');
    const [filtroStatus, setFiltroStatus] = useState('');
    const [filtroPrioridade, setFiltroPrioridade] = useState('');

    const [modalAberto, setModalAberto] = useState(false);

    const [acaoSelecionada, setAcaoSelecionada] = useState<
        'concluir' | 'cancelar' | null
    >(null);

    const [pedidoSelecionado, setPedidoSelecionado] = useState('');

    function formatarData(data: Date) {
        return data.toLocaleDateString('pt-BR');
    }

    function abrirConfirmacao(id: string, acao: 'concluir' | 'cancelar') {
        setPedidoSelecionado(id);
        setAcaoSelecionada(acao);
        setModalAberto(true);
    }

    function confirmarAcao() {
        if (!pedidoSelecionado || !acaoSelecionada) return;

        try {
            if (acaoSelecionada === 'concluir') {
                concluirPedido(pedidoSelecionado);
                carregarEstoque();
            } else {
                cancelarPedido(pedidoSelecionado);
            }
        } catch (err: any) {
            alert(err.message);
        } finally {
            setModalAberto(false);
            setPedidoSelecionado('');
            setAcaoSelecionada(null);
        }
    }

    const pedidosFiltrados = pedidos
        .filter((pedido) => {
            const matchHospital = pedido.hospital.name
                .toLowerCase()
                .includes(filtroHospital.toLowerCase());

            const matchTipo =
                !filtroTipo || pedido.bloodType.type === filtroTipo;

            const matchStatus = !filtroStatus || pedido.status === filtroStatus;

            const matchPrioridade =
                !filtroPrioridade || pedido.priority === filtroPrioridade;

            return matchHospital && matchTipo && matchStatus && matchPrioridade;
        })
        .sort((a, b) => b.requestDate.getTime() - a.requestDate.getTime());
    return (
        <MainLayout>
            <div className='max-w-8xl mx-auto bg-white p-8 rounded-2xl shadow-md'>
                <div className='flex justify-between items-center mb-4'>
                    <h1 className='text-2xl font-bold text-red-700'>
                        Pedidos de Sangue
                    </h1>

                    <button
                        onClick={() => navigate('/pedido/novo')}
                        className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl'
                    >
                        Novo Pedido
                    </button>
                </div>

                <div className='grid grid-cols-5 gap-4 mb-4'>
                    <input
                        type='text'
                        placeholder='Buscar Hospital...'
                        value={filtroHospital}
                        onChange={(e) => setFiltroHospital(e.target.value)}
                        className='border border-gray-300 rounded-lg p-2'
                    />

                    <select
                        value={filtroTipo}
                        onChange={(e) => setFiltroTipo(e.target.value)}
                        className='border border-gray-300 rounded-lg p-2'
                    >
                        <option value=''>Tipo sanguíneo</option>
                        <option value='A'>A</option>
                        <option value='B'>B</option>
                        <option value='AB'>AB</option>
                        <option value='O'>O</option>
                    </select>

                    <select
                        value={filtroStatus}
                        onChange={(e) => setFiltroStatus(e.target.value)}
                        className='border border-gray-300 rounded-lg p-2'
                    >
                        <option value=''>Status</option>

                        <option value={Status.PENDING}>{Status.PENDING}</option>

                        <option value={Status.COMPLETED}>
                            {Status.COMPLETED}
                        </option>

                        <option value={Status.CANCELED}>
                            {Status.CANCELED}
                        </option>
                    </select>

                    <select
                        value={filtroPrioridade}
                        onChange={(e) => setFiltroPrioridade(e.target.value)}
                        className='border border-gray-300 rounded-lg p-2'
                    >
                        <option value=''>Prioridade</option>

                        <option value={Priority.LOW}>{Priority.LOW}</option>

                        <option value={Priority.MEDIUM}>
                            {Priority.MEDIUM}
                        </option>

                        <option value={Priority.HIGH}>{Priority.HIGH}</option>

                        <option value={Priority.URGENT}>
                            {Priority.URGENT}
                        </option>
                    </select>

                    <button
                        onClick={() => {
                            setFiltroHospital('');
                            setFiltroTipo('');
                            setFiltroStatus('');
                            setFiltroPrioridade('');
                        }}
                        className='bg-gray-200 hover:bg-gray-300 rounded-lg border border-gray-300'
                    >
                        Limpar Filtros
                    </button>
                </div>

                {pedidosFiltrados.length === 0 ? (
                    <p className='text-gray-500'>Nenhum pedido encontrado.</p>
                ) : (
                    <div className='space-y-4'>
                        {pedidosFiltrados.map((pedido) => (
                            <div
                                key={pedido.id}
                                className='border border-gray-200 rounded-xl p-4 hover:shadow-md transition'
                            >
                                <div className='flex justify-between items-start'>
                                    <div>
                                        <h2 className='font-bold text-lg'>
                                            {pedido.hospital.name}
                                        </h2>

                                        <p className='text-gray-500'>
                                            Tipo: {pedido.bloodType.type}
                                            {pedido.bloodType.rhFactor}
                                            {' • '}
                                            Bolsas: {pedido.quantity}
                                            {' • '}
                                            Data:{' '}
                                            {formatarData(pedido.requestDate)}
                                        </p>

                                        <div className='flex gap-6 mt-2'>
                                            <span>
                                                Prioridade:{' '}
                                                <strong>
                                                    {pedido.priority}
                                                </strong>
                                            </span>

                                            <span
                                                className={
                                                    pedido.status ===
                                                    Status.COMPLETED
                                                        ? 'text-green-600 font-semibold'
                                                        : pedido.status ===
                                                            Status.CANCELED
                                                          ? 'text-red-600 font-semibold'
                                                          : 'text-yellow-600 font-semibold'
                                                }
                                            >
                                                {pedido.status}
                                            </span>
                                        </div>

                                        {pedido.observations && (
                                            <p className='text-sm text-gray-500 mt-2'>
                                                {pedido.observations}
                                            </p>
                                        )}
                                    </div>

                                    {pedido.status === Status.PENDING && (
                                        <div className='flex gap-2'>
                                            <button
                                                onClick={() =>
                                                    abrirConfirmacao(
                                                        pedido.id,
                                                        'concluir',
                                                    )
                                                }
                                                className='bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg'
                                            >
                                                Concluir
                                            </button>

                                            <button
                                                onClick={() =>
                                                    abrirConfirmacao(
                                                        pedido.id,
                                                        'cancelar',
                                                    )
                                                }
                                                className='bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg'
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <ConfirmModal
                isOpen={modalAberto}
                title={
                    acaoSelecionada === 'concluir'
                        ? 'Concluir Pedido'
                        : 'Cancelar Pedido'
                }
                message={
                    acaoSelecionada === 'concluir'
                        ? 'Deseja realmente concluir este pedido?'
                        : 'Deseja realmente cancelar este pedido?'
                }
                onConfirm={confirmarAcao}
                onCancel={() => {
                    setModalAberto(false);
                    setPedidoSelecionado('');
                    setAcaoSelecionada(null);
                }}
            />
        </MainLayout>
    );
}
