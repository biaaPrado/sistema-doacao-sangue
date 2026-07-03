import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IMaskInput } from 'react-imask';

import { Toast } from '../Toast/Toast';
import { useToast } from '../../hooks/useToast';
import { useDoadores } from '../../context/DoadorContext';
import { useAgendamentos } from '../../context/AgendamentoContext';

import { Status } from '../../../../backend/src/domain/enums/Status';
import type { AppointmentDTO } from '../../../../backend/src/domain/dtos/AppointmentDTO';

export function AgendarDoacaoForm() {
    const {
        addAgendamento,
        atualizarAgendamento,
        agendamentoEmEdicao,
        setAgendamentoEmEdicao,
    } = useAgendamentos();

    const { doadores } = useDoadores();

    const navigate = useNavigate();
    const { toast, showToast } = useToast();

    const [cpf, setCpf] = useState('');

    const [data, setData] = useState('');
    const [horario, setHorario] = useState('');

    const [agendamento, setAgendamento] = useState({
        observations: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const hoje = formatDateLocal(new Date());

    const doadorEncontrado = doadores.find((d) => d.cpf === cpf);

    function formatDateLocal(date: Date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        if (!agendamentoEmEdicao) return;

        setAgendamento({
            observations: agendamentoEmEdicao.observations ?? '',
        });

        const doador = doadores.find(
            (d) => d.id === agendamentoEmEdicao.donor.id,
        );

        if (doador) {
            setCpf(doador.cpf);
        }

        const date = agendamentoEmEdicao.date;

        setData(formatDateLocal(date));

        setHorario(
            date.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            }),
        );
    }, [agendamentoEmEdicao, doadores]);

    function validateField(name: string, value: string) {
        let message = '';

        switch (name) {
            case 'data':
                if (!value) {
                    message = 'Informe uma data';
                } else if (value < hoje) {
                    message = 'Data não pode ser anterior à atual';
                }
                break;

            case 'horario':
                if (!value) {
                    message = 'Informe um horário';
                }
                break;
        }

        setErrors((prev) => ({
            ...prev,
            [name]: message,
        }));
    }

    function validateAll() {
        const newErrors: Record<string, string> = {};

        if (!doadorEncontrado) {
            newErrors.doadorId = 'Doador não encontrado';
        }

        if (!data) {
            newErrors.data = 'Informe uma data';
        } else if (data < hoje) {
            newErrors.data = 'Data não pode ser anterior à atual';
        }

        if (!horario) {
            newErrors.horario = 'Informe um horário';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    function handleSubmit() {
        if (!validateAll() || !doadorEncontrado) return;

        const date = new Date(`${data}T${horario}`);

        const appointment: AppointmentDTO = {
            id: agendamentoEmEdicao?.id ?? crypto.randomUUID(),
            donor: doadorEncontrado,
            date,
            observations: agendamento.observations || null,
            status: agendamentoEmEdicao?.status ?? Status.PENDING,
        };

        try {
            if (agendamentoEmEdicao) {
                atualizarAgendamento(appointment);

                setAgendamentoEmEdicao(null);

                showToast(
                    'Agendamento atualizado com sucesso!',
                    'success',
                    3000,
                );
            } else {
                addAgendamento(appointment);

                showToast('Doação agendada com sucesso!', 'success', 3000);
            }

            setTimeout(() => navigate('/agendamentos'), 1200);
        } catch (err: any) {
            showToast(err.message, 'error', 3000);
        }
    }

    return (
        <>
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    duration={toast.duration}
                />
            )}

            <div className='grid gap-4'>
                <div>
                    <label className='font-medium'>CPF do Doador</label>

                    <IMaskInput
                        mask='000.000.000-00'
                        value={cpf}
                        onAccept={(value) => setCpf(value)}
                        className='border border-gray-300 p-3 rounded-xl w-full'
                    />

                    {errors.doadorId && (
                        <p className='text-red-500 text-sm'>
                            {errors.doadorId}
                        </p>
                    )}
                </div>

                {cpf.length === 14 && (
                    <>
                        {doadorEncontrado ? (
                            <div className='bg-green-50 border border-green-200 rounded-xl p-4'>
                                <p className='font-semibold text-green-700 mb-2'>
                                    Doador encontrado
                                </p>

                                <div className='grid grid-cols-2 gap-2'>
                                    <div>
                                        <span className='text-gray-500 text-sm'>
                                            Nome
                                        </span>

                                        <p className='font-medium'>
                                            {doadorEncontrado.name}
                                        </p>
                                    </div>

                                    <div>
                                        <span className='text-gray-500 text-sm'>
                                            Tipo Sanguíneo
                                        </span>

                                        <p className='font-medium'>
                                            {doadorEncontrado.bloodType.type}
                                            {
                                                doadorEncontrado.bloodType
                                                    .rhFactor
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className='bg-yellow-50 border border-yellow-200 rounded-xl p-4'>
                                <p className='font-semibold text-yellow-700 mb-3'>
                                    Doador não encontrado
                                </p>

                                <button
                                    type='button'
                                    onClick={() => navigate('/cadastro-doador')}
                                    className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg'
                                >
                                    Cadastrar Novo Doador
                                </button>
                            </div>
                        )}
                    </>
                )}

                {doadorEncontrado && (
                    <>
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className='font-medium'>
                                    Data da Doação
                                </label>

                                <input
                                    type='date'
                                    min={hoje}
                                    value={data}
                                    onChange={(e) => {
                                        setData(e.target.value);
                                        validateField('data', e.target.value);
                                    }}
                                    className='border border-gray-300 p-3 rounded-xl w-full'
                                />

                                {errors.data && (
                                    <p className='text-red-500 text-sm'>
                                        {errors.data}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className='font-medium'>Horário</label>

                                <input
                                    type='time'
                                    value={horario}
                                    onChange={(e) => {
                                        setHorario(e.target.value);
                                        validateField(
                                            'horario',
                                            e.target.value,
                                        );
                                    }}
                                    className='border border-gray-300 p-3 rounded-xl w-full'
                                />

                                {errors.horario && (
                                    <p className='text-red-500 text-sm'>
                                        {errors.horario}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className='font-medium'>Observação</label>

                            <textarea
                                rows={4}
                                value={agendamento.observations}
                                onChange={(e) =>
                                    setAgendamento({
                                        observations: e.target.value,
                                    })
                                }
                                className='border border-gray-300 p-3 rounded-xl w-full'
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            className='bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold'
                        >
                            {agendamentoEmEdicao
                                ? 'Atualizar Agendamento'
                                : 'Agendar Doação'}
                        </button>
                    </>
                )}
            </div>
        </>
    );
}
