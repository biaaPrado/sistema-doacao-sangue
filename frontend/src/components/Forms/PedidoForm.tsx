import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Toast } from '../Toast/Toast';
import { useToast } from '../../hooks/useToast';

import { useHospitais } from '../../context/HospitalContext';
import { usePedidos } from '../../context/PedidoContext';

import type { BloodRequestDTO } from '../../../../backend/src/domain/dtos/BloodRequestDTO';

import { Priority } from '../../../../backend/src/domain/enums/Priority';
import { Status } from '../../../../backend/src/domain/enums/Status';

export function PedidoForm() {
    const navigate = useNavigate();
    const { toast, showToast } = useToast();

    const { hospitais } = useHospitais();

    const { addPedido, pedidoEmEdicao, setPedidoEmEdicao } = usePedidos();

    const [pedido, setPedido] = useState<BloodRequestDTO>({
        id: crypto.randomUUID(),

        hospital: {} as any,

        requestDate: new Date(),

        bloodType: {
            id: crypto.randomUUID(),
            type: '',
            rhFactor: '+',
        },

        quantity: 1,

        priority: Priority.LOW,

        status: Status.PENDING,

        observations: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (pedidoEmEdicao) {
            setPedido(pedidoEmEdicao);
        }
    }, [pedidoEmEdicao]);
    function handleChange(
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>
            | React.ChangeEvent<HTMLTextAreaElement>,
    ) {
        const { name, value } = e.target;

        switch (name) {
            case 'hospital': {
                const hospital = hospitais.find((h) => h.id === value);

                if (!hospital) return;

                setPedido((prev) => ({
                    ...prev,
                    hospital,
                }));
                break;
            }

            case 'type':
                setPedido((prev) => ({
                    ...prev,
                    bloodType: {
                        ...prev.bloodType,
                        type: value,
                    },
                }));
                break;

            case 'rhFactor':
                setPedido((prev) => ({
                    ...prev,
                    bloodType: {
                        ...prev.bloodType,
                        rhFactor: value,
                    },
                }));
                break;

            case 'quantity':
                setPedido((prev) => ({
                    ...prev,
                    quantity: Number(value),
                }));
                break;

            case 'priority':
                setPedido((prev) => ({
                    ...prev,
                    priority: value as Priority,
                }));
                break;

            case 'observations':
                setPedido((prev) => ({
                    ...prev,
                    observations: value,
                }));
                break;
        }

        setErrors((prev) => ({
            ...prev,
            [name]: '',
        }));
    }

    function validate() {
        const newErrors: Record<string, string> = {};

        if (!pedido.hospital?.id) {
            newErrors.hospital = 'Selecione um hospital';
        }

        if (!pedido.bloodType.type) {
            newErrors.type = 'Selecione um tipo sanguíneo';
        }

        if (!pedido.bloodType.rhFactor) {
            newErrors.rhFactor = 'Selecione o fator RH';
        }

        if (pedido.quantity <= 0) {
            newErrors.quantity = 'Quantidade inválida';
        }

        if (!pedido.priority) {
            newErrors.priority = 'Selecione uma prioridade';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    function handleSubmit() {
        if (!validate()) return;

        addPedido(pedido);

        setPedidoEmEdicao(null);

        showToast(
            pedidoEmEdicao
                ? 'Pedido atualizado com sucesso!'
                : 'Pedido registrado com sucesso!',
            'success',
            4000,
        );

        setTimeout(() => {
            navigate('/pedidos');
        }, 1200);
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

            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <label className='font-medium text-gray-700'>
                        Hospital
                    </label>

                    <select
                        name='hospital'
                        value={pedido.hospital?.id ?? ''}
                        onChange={handleChange}
                        className='border border-gray-300 p-3 rounded-xl w-full'
                    >
                        <option value=''>Selecione</option>

                        {hospitais.map((hospital) => (
                            <option key={hospital.id} value={hospital.id}>
                                {hospital.name}
                            </option>
                        ))}
                    </select>

                    {errors.hospital && (
                        <p className='text-red-500 text-sm'>
                            {errors.hospital}
                        </p>
                    )}
                </div>

                <div>
                    <label className='font-medium text-gray-700'>
                        Tipo Sanguíneo
                    </label>

                    <select
                        name='type'
                        value={pedido.bloodType.type}
                        onChange={handleChange}
                        className='border border-gray-300 p-3 rounded-xl w-full'
                    >
                        <option value=''>Selecione</option>
                        <option value='A'>A</option>
                        <option value='B'>B</option>
                        <option value='AB'>AB</option>
                        <option value='O'>O</option>
                    </select>

                    {errors.type && (
                        <p className='text-red-500 text-sm'>{errors.type}</p>
                    )}
                </div>

                <div>
                    <label className='font-medium text-gray-700'>
                        Fator RH
                    </label>

                    <select
                        name='rhFactor'
                        value={pedido.bloodType.rhFactor}
                        onChange={handleChange}
                        className='border border-gray-300 p-3 rounded-xl w-full'
                    >
                        <option value='+'>+</option>
                        <option value='-'>-</option>
                    </select>

                    {errors.rhFactor && (
                        <p className='text-red-500 text-sm'>
                            {errors.rhFactor}
                        </p>
                    )}
                </div>

                <div>
                    <label className='font-medium text-gray-700'>
                        Quantidade de Bolsas
                    </label>

                    <div className='flex items-center justify-between border border-gray-300 rounded-xl p-2'>
                        <button
                            type='button'
                            onClick={() =>
                                setPedido((prev) => ({
                                    ...prev,
                                    quantity: Math.max(1, prev.quantity - 1),
                                }))
                            }
                            className='w-8 h-8 bg-gray-300 rounded-lg'
                        >
                            -
                        </button>

                        <span>{pedido.quantity}</span>

                        <button
                            type='button'
                            onClick={() =>
                                setPedido((prev) => ({
                                    ...prev,
                                    quantity: prev.quantity + 1,
                                }))
                            }
                            className='w-8 h-8 bg-gray-300 rounded-lg'
                        >
                            +
                        </button>
                    </div>

                    {errors.quantity && (
                        <p className='text-red-500 text-sm'>
                            {errors.quantity}
                        </p>
                    )}
                </div>

                <div className='col-span-2'>
                    <label className='font-medium text-gray-700'>
                        Prioridade
                    </label>

                    <div className='flex gap-2 mt-2 flex-wrap'>
                        {Object.values(Priority).map((prioridade) => (
                            <button
                                key={prioridade}
                                type='button'
                                onClick={() =>
                                    setPedido((prev) => ({
                                        ...prev,
                                        priority: prioridade,
                                    }))
                                }
                                className={`px-3 py-1 rounded-xl border transition ${
                                    pedido.priority === prioridade
                                        ? 'bg-red-600 text-white border-red-600'
                                        : 'border-gray-300'
                                }`}
                            >
                                {prioridade}
                            </button>
                        ))}
                    </div>

                    {errors.priority && (
                        <p className='text-red-500 text-sm'>
                            {errors.priority}
                        </p>
                    )}
                </div>

                <div className='col-span-2'>
                    <label className='font-medium text-gray-700'>
                        Observações
                    </label>

                    <textarea
                        name='observations'
                        rows={4}
                        value={pedido.observations}
                        onChange={handleChange}
                        className='border border-gray-300 p-3 rounded-xl w-full'
                    />
                </div>

                <div className='col-span-2'>
                    <button
                        type='button'
                        onClick={handleSubmit}
                        className='w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold'
                    >
                        Registrar Pedido
                    </button>
                </div>
            </div>
        </>
    );
}
