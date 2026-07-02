import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IMaskInput } from 'react-imask';
import { Input } from '../Input/Input';
import { useHospitais } from '../../context/HospitalContext';
import { useToast } from '../../hooks/useToast';
import { Toast } from '../Toast/Toast';

import type { HospitalDTO } from '../../../../backend/src/domain/dtos/HospitalDTO';

export function HospitalForm() {
    const navigate = useNavigate();
    const { toast, showToast } = useToast();

    const {
        addHospital,
        atualizarHospital,
        hospitalEmEdicao,
        setHospitalEmEdicao,
    } = useHospitais();

    const [hospital, setHospital] = useState<HospitalDTO>({
        id: '',
        name: '',
        cnpj: '',
        phone: '',
        email: '',

        cep: '',
        address: '',
        number: '',
        complement: null,

        city: '',
        state: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (hospitalEmEdicao) {
            setHospital(hospitalEmEdicao);
        }
    }, [hospitalEmEdicao]);

    async function buscarCEP(cep: string) {
        const cepLimpo = cep.replace(/\D/g, '');
        if (cepLimpo.length !== 8) return;

        try {
            const response = await fetch(
                `https://viacep.com.br/ws/${cepLimpo}/json/`,
            );
            const data = await response.json();

            if (data.erro) {
                showToast('CEP não encontrado', 'error', 2000);
                return;
            }

            setHospital((prev) => ({
                ...prev,
                address: data.logradouro,
                city: data.localidade,
                state: data.uf,
            }));
        } catch (error) {
            console.error(error);
            showToast('Erro ao buscar CEP!', 'error', 2000);
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        setHospital((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: '',
        }));
    }

    function validate() {
        const newErrors: Record<string, string> = {};

        if (!hospital.name.trim()) newErrors.name = 'Nome obrigatório';
        if (!hospital.cnpj.trim()) newErrors.cnpj = 'CNPJ obrigatório';
        if (!hospital.phone.trim()) newErrors.phone = 'Telefone obrigatório';
        if (!hospital.email.includes('@')) newErrors.email = 'Email inválido';
        if (!hospital.cep.trim()) newErrors.cep = 'CEP obrigatório';
        if (!hospital.address.trim())
            newErrors.address = 'Endereço obrigatório';
        if (!hospital.number.trim()) newErrors.number = 'Número obrigatório';
        if (!hospital.city.trim()) newErrors.city = 'Cidade obrigatória';
        if (!hospital.state.trim()) newErrors.state = 'Estado obrigatório';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function handleSubmit() {
        if (!validate()) return;

        try {
            if (hospitalEmEdicao) {
                atualizarHospital(hospital);

                showToast('Hospital atualizado com sucesso!', 'success', 3000);
                setHospitalEmEdicao(null);
            } else {
                addHospital({
                    ...hospital,
                    id: crypto.randomUUID(),
                });

                showToast('Hospital cadastrado com sucesso!', 'success', 3000);
            }

            setTimeout(() => {
                navigate('/hospitais');
            }, 1200);
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

            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <Input
                        label='Nome do Hospital'
                        name='name'
                        value={hospital.name}
                        onChange={handleChange}
                    />
                    {errors.name && (
                        <p className='text-red-500 text-sm'>{errors.name}</p>
                    )}
                </div>

                <div>
                    <label className='font-medium text-gray-700'>CNPJ</label>
                    <IMaskInput
                        mask='00.000.000/0000-00'
                        value={hospital.cnpj}
                        onAccept={(value) =>
                            setHospital((prev) => ({
                                ...prev,
                                cnpj: value,
                            }))
                        }
                        className='border border-gray-300 p-3 rounded-xl w-full'
                    />
                    {errors.cnpj && (
                        <p className='text-red-500 text-sm'>{errors.cnpj}</p>
                    )}
                </div>

                <div>
                    <label className='font-medium text-gray-700'>
                        Telefone
                    </label>
                    <IMaskInput
                        mask='(00) 0000-0000'
                        value={hospital.phone}
                        onAccept={(value) =>
                            setHospital((prev) => ({
                                ...prev,
                                phone: value,
                            }))
                        }
                        className='border border-gray-300 p-3 rounded-xl w-full'
                    />
                    {errors.phone && (
                        <p className='text-red-500 text-sm'>{errors.phone}</p>
                    )}
                </div>

                <div>
                    <Input
                        label='Email'
                        name='email'
                        value={hospital.email}
                        onChange={handleChange}
                    />
                    {errors.email && (
                        <p className='text-red-500 text-sm'>{errors.email}</p>
                    )}
                </div>

                <div className='col-span-2 grid grid-cols-2 gap-4'>
                    <div>
                        <Input
                            label='CEP'
                            name='cep'
                            value={hospital.cep}
                            onChange={handleChange}
                            onBlur={() => buscarCEP(hospital.cep)}
                        />
                        {errors.cep && (
                            <p className='text-red-500 text-sm'>{errors.cep}</p>
                        )}
                    </div>

                    <div>
                        <Input
                            label='Endereço'
                            name='address'
                            value={hospital.address}
                            onChange={handleChange}
                        />
                        {errors.address && (
                            <p className='text-red-500 text-sm'>
                                {errors.address}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <Input
                        label='Número'
                        name='number'
                        value={hospital.number}
                        onChange={handleChange}
                    />
                    {errors.number && (
                        <p className='text-red-500 text-sm'>{errors.number}</p>
                    )}
                </div>

                <div>
                    <Input
                        label='Complemento'
                        name='complement'
                        value={hospital.complement ?? ''}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <Input
                        label='Cidade'
                        name='city'
                        value={hospital.city}
                        onChange={handleChange}
                    />
                    {errors.city && (
                        <p className='text-red-500 text-sm'>{errors.city}</p>
                    )}
                </div>

                <div>
                    <Input
                        label='Estado'
                        name='state'
                        value={hospital.state}
                        onChange={handleChange}
                    />
                    {errors.state && (
                        <p className='text-red-500 text-sm'>{errors.state}</p>
                    )}
                </div>

                <div className='col-span-2 mt-6'>
                    <button
                        onClick={handleSubmit}
                        className='w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold'
                    >
                        {hospitalEmEdicao
                            ? 'Atualizar Hospital'
                            : 'Cadastrar Hospital'}
                    </button>
                </div>
            </div>
        </>
    );
}
