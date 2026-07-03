import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { ConfirmModal } from '../components/ConfirmModal/ConfirmModal';

import { useAgendamentos } from '../context/AgendamentoContext';
import { useDoadores } from '../context/DoadorContext';
import { useEstoque } from '../context/EstoqueContext';

import { Status } from '../../../backend/src/domain/enums/Status';

export function ListaAgendamentos() {
    const {
        agendamentos,
        removerAgendamento,
        concluirAgendamento,
        setAgendamentoEmEdicao,
    } = useAgendamentos();

    const navigate = useNavigate();

    const { carregarDoadores } = useDoadores();
    const { carregarEstoque } = useEstoque();

    const [search, setSearch] = useState('');

    const [modalAberto, setModalAberto] = useState(false);
    const [agendamentoSelecionado, setAgendamentoSelecionado] = useState('');

    function editarAgendamento(id: string) {
        const agendamento = agendamentos.find((a) => a.id === id);

        if (!agendamento) return;

        setAgendamentoEmEdicao(agendamento);
        navigate('/agendar');
    }

    function concluir(id: string) {
        try {
            concluirAgendamento(id);
            carregarDoadores();
            carregarEstoque();
        } catch (error: any) {
            alert(error.message);
        }
    }

    const agendamentosFiltrados = [...agendamentos]
        .filter((agendamento) =>
            agendamento.donor.name.toLowerCase().includes(search.toLowerCase()),
        )
        .sort((a, b) => a.date.getTime() - b.date.getTime());

    function abrirModalCancelar(id: string) {
        setAgendamentoSelecionado(id);
        setModalAberto(true);
    }

    function confirmarCancelamento() {
        if (agendamentoSelecionado) {
            removerAgendamento(agendamentoSelecionado);
        }

        setModalAberto(false);
        setAgendamentoSelecionado('');
    }

    return (
        <MainLayout>
            <div className='max-w-7xl mx-auto bg-white p-8 rounded-2xl shadow-md'>
                <div className='flex justify-between items-center mb-4'>
                    <h1 className='text-2xl font-bold text-red-700'>
                        Agendamentos
                    </h1>

                    <button
                        onClick={() => navigate('/agendar')}
                        className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg'
                    >
                        Novo Agendamento
                    </button>
                </div>

                <div className='mb-6'>
                    <input
                        type='text'
                        placeholder='Buscar por nome'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='border p-2 rounded-lg border-gray-300 w-full'
                    />
                </div>

                {agendamentosFiltrados.length === 0 ? (
                    <p className='text-gray-500'>
                        Nenhum agendamento encontrado
                    </p>
                ) : (
                    <>
                        <div className='grid grid-cols-4 bg-red-700 text-white font-semibold rounded-t-xl'>
                            <div className='p-3 text-center'>Nome</div>
                            <div className='p-3 text-center'>Data / Hora</div>
                            <div className='p-3 text-center'>Status</div>
                            <div className='p-3 text-center'>Ações</div>
                        </div>

                        {agendamentosFiltrados.map((agendamento) => {
                            const podeConcluir =
                                new Date(agendamento.date).setHours(
                                    0,
                                    0,
                                    0,
                                    0,
                                ) <= new Date().setHours(0, 0, 0, 0);
                            return (
                                <div
                                    key={agendamento.id}
                                    className='grid grid-cols-4 border-b border-gray-200 hover:bg-gray-50'
                                >
                                    <div className='p-3 text-center'>
                                        {agendamento.donor.name}
                                    </div>

                                    <div className='p-3 text-center'>
                                        {agendamento.date.toLocaleDateString(
                                            'pt-BR',
                                        )}{' '}
                                        -{' '}
                                        {agendamento.date.toLocaleTimeString(
                                            'pt-BR',
                                            {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            },
                                        )}
                                    </div>

                                    <div className='p-3 text-center'>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                agendamento.status ===
                                                Status.COMPLETED
                                                    ? 'bg-green-100 text-green-700'
                                                    : agendamento.status ===
                                                        Status.CANCELED
                                                      ? 'bg-red-100 text-red-700'
                                                      : 'bg-yellow-100 text-yellow-700'
                                            }`}
                                        >
                                            {agendamento.status}
                                        </span>
                                    </div>

                                    <div className='p-3 flex justify-center gap-2'>
                                        {agendamento.status ===
                                            Status.PENDING && (
                                            <button
                                                onClick={() =>
                                                    concluir(agendamento.id)
                                                }
                                                className={`text-white px-3 py-1 rounded-lg ${podeConcluir ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                                                disabled={!podeConcluir}
                                            >
                                                Concluir
                                            </button>
                                        )}

                                        {agendamento.status ===
                                            Status.PENDING && (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        editarAgendamento(
                                                            agendamento.id,
                                                        )
                                                    }
                                                    className='bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600'
                                                >
                                                    Editar
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        abrirModalCancelar(
                                                            agendamento.id,
                                                        )
                                                    }
                                                    className='bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700'
                                                >
                                                    Cancelar
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </>
                )}
            </div>

            <ConfirmModal
                isOpen={modalAberto}
                title='Cancelar Agendamento'
                message='Tem certeza que deseja cancelar este agendamento?'
                onConfirm={confirmarCancelamento}
                onCancel={() => {
                    setModalAberto(false);
                    setAgendamentoSelecionado('');
                }}
            />
        </MainLayout>
    );
}
