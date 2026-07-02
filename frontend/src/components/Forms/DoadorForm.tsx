// src/components/DoadorForm/DoadorForm.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../Input/Input';
import { Select } from '../Select/Select';
import { IMaskInput } from 'react-imask';
import { useDoadores } from '../../context/DoadorContext';
import { useToast } from '../../hooks/useToast';
import { Toast } from '../Toast/Toast';

// Importações estritas de tipos de acordo com o verbatimModuleSyntax
import type { DonorDTO } from '../../../../backend/src/domain/dtos/DonorDTO';
import type { BloodTypeDTO } from '../../../../backend/src/domain/dtos/BloodTypeDTO';
import { Sex } from '../../../../backend/src/domain/enums/Sex';

export function DoadorForm() {
    const navigate = useNavigate();
    const { addDoador, atualizarDoador, doadorEmEdicao, setDoadorEmEdicao } =
        useDoadores();
    const { toast, showToast } = useToast();

    // Estado inicial adaptado estritamente para a estrutura do DonorDTO
    const [doador, setDoador] = useState<DonorDTO>({
        id: crypto.randomUUID(),
        name: '',
        cpf: '',
        phone: '',
        email: '',
        birthDate: new Date(), // Inicializado como objeto Date padrão do DTO
        sex: '' as Sex,
        weight: 0,
        bloodType: {
            type: '',
            rhFactor: '',
        } as BloodTypeDTO,
        donations: [],
    });

    // Estado auxiliar para lidar com a string da data no input HTML do tipo "date"
    const [dataString, setDataString] = useState<string>('');

    const [errors, setErrors] = useState<Record<string, string>>({});
    const hojeStr = new Date().toISOString().split('T')[0];

    // Monitora o doador em edição para preencher o formulário
    useEffect(() => {
        if (doadorEmEdicao) {
            setDoador({
                ...doadorEmEdicao,
                donations: doadorEmEdicao.donations ?? [],
            });

            // Converte o objeto Date do DTO para o formato yyyy-MM-dd que o input date aceita
            if (doadorEmEdicao.birthDate) {
                const d = new Date(doadorEmEdicao.birthDate);
                if (!isNaN(d.getTime())) {
                    setDataString(d.toISOString().split('T')[0]);
                }
            }
        }
    }, [doadorEmEdicao]);

    function validateField(name: string, value: any) {
        let message = '';

        switch (name) {
            case 'name':
                if (!value.toString().trim()) message = 'Nome obrigatório';
                break;
            case 'cpf':
                if (!value.toString().trim()) message = 'CPF obrigatório';
                break;
            case 'phone':
                if (!value.toString().trim()) message = 'Telefone obrigatório';
                break;
            case 'email':
                if (!value.toString().includes('@')) message = 'Email inválido';
                break;
            case 'birthDate':
                if (!value) message = 'Data obrigatória';
                else if (value > hojeStr) message = 'Insira uma data válida!';
                break;
            case 'weight':
                if (!value || Number(value) <= 0) message = 'Peso inválido';
                break;
            case 'sex':
                if (!value) message = 'Sexo obrigatório';
                break;
            case 'type':
                if (!value) message = 'Obrigatório';
                break;
            case 'rhFactor':
                if (!value) message = 'Obrigatório';
                break;
        }

        setErrors((prev) => ({ ...prev, [name]: message }));
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        const newValue = name === 'weight' ? Number(value) : value;

        setDoador((prev) => ({ ...prev, [name]: newValue }));
        validateField(name, newValue);
    }

    // Manipulador específico para a data de nascimento, convertendo string para Date
    function handleDateChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setDataString(value);

        if (value) {
            // Cria a data considerando o fuso horário local correto
            const parts = value.split('-');
            const dateObj = new Date(
                Number(parts[0]),
                Number(parts[1]) - 1,
                Number(parts[2]),
            );
            setDoador((prev) => ({ ...prev, birthDate: dateObj }));
        }
        validateField('birthDate', value);
    }

    function validateAll() {
        const newErrors: Record<string, string> = {};

        if (!doador.name.trim()) newErrors.name = 'Nome obrigatório';
        if (!doador.cpf.trim()) newErrors.cpf = 'CPF obrigatório';
        if (!doador.phone.trim()) newErrors.phone = 'Telefone obrigatório';
        if (!doador.email.includes('@')) newErrors.email = 'Email inválido';
        if (!dataString) newErrors.birthDate = 'Data obrigatória';
        if (dataString > hojeStr)
            newErrors.birthDate = 'Data não pode ser futura';
        if (!doador.sex) newErrors.sex = 'Sexo obrigatório';
        if (!doador.weight || doador.weight <= 0)
            newErrors.weight = 'Peso inválido';
        if (!doador.bloodType.type) newErrors.type = 'Obrigatório';
        if (!doador.bloodType.rhFactor) newErrors.rhFactor = 'Obrigatório';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function handleSubmit() {
        if (!validateAll()) return;

        const payload: DonorDTO = {
            ...doador,
            // Garanta que o objeto bloodType vá montado de forma limpa
            bloodType: {
                id: doador.bloodType.id || crypto.randomUUID(), // Caso o mapper espere um ID para o objeto BloodType
                type: doador.bloodType.type,
                rhFactor: doador.bloodType.rhFactor,
            },
            donations: doador.donations ?? [],
        };

        try {
            if (doadorEmEdicao) {
                atualizarDoador(payload);
                setDoadorEmEdicao(null);
                showToast('Doador atualizado com sucesso!', 'success', 5000);
            } else {
                addDoador(payload); // O ID principal do doador já foi gerado no useState inicial
                showToast('Doador cadastrado com sucesso!', 'success', 5000);
            }

            setTimeout(() => {
                navigate('/doadores');
            }, 1200);
        } catch (err: any) {
            showToast(err.message, 'error', 5000);
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
                        label='Nome'
                        name='name'
                        value={doador.name}
                        onChange={handleChange}
                    />
                    {errors.name && (
                        <p className='text-red-500 text-sm'>{errors.name}</p>
                    )}
                </div>

                <div>
                    <label className='font-medium'>CPF</label>
                    <IMaskInput
                        mask='000.000.000-00'
                        value={doador.cpf}
                        onAccept={(value) => {
                            setDoador((prev) => ({ ...prev, cpf: value }));
                            validateField('cpf', value);
                        }}
                        className='border border-gray-300 p-3 rounded-xl w-full'
                    />
                    {errors.cpf && (
                        <p className='text-red-500 text-sm'>{errors.cpf}</p>
                    )}
                </div>

                <div>
                    <label className='font-medium'>Telefone</label>
                    <IMaskInput
                        mask='(00) 00000-0000'
                        value={doador.phone}
                        onAccept={(value) => {
                            setDoador((prev) => ({ ...prev, phone: value }));
                            validateField('phone', value);
                        }}
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
                        value={doador.email}
                        onChange={handleChange}
                    />
                    {errors.email && (
                        <p className='text-red-500 text-sm'>{errors.email}</p>
                    )}
                </div>

                <div>
                    <Input
                        label='Data de Nascimento'
                        type='date'
                        name='birthDate'
                        max={hojeStr}
                        value={dataString}
                        onChange={handleDateChange}
                    />
                    {errors.birthDate && (
                        <p className='text-red-500 text-sm'>
                            {errors.birthDate}
                        </p>
                    )}
                </div>

                <div>
                    <Select
                        label='Sexo'
                        name='sex'
                        value={doador.sex}
                        onChange={(e) => {
                            const value = e.target.value as Sex;
                            setDoador((prev) => ({ ...prev, sex: value }));
                            validateField('sex', value);
                        }}
                        options={Object.values(Sex)} // Consome as opções direto do seu Enum Sex
                    />
                    {errors.sex && (
                        <p className='text-red-500 text-sm'>{errors.sex}</p>
                    )}
                </div>

                <div>
                    <Input
                        label='Peso'
                        name='weight'
                        type='number'
                        value={doador.weight || ''}
                        onChange={handleChange}
                    />
                    {errors.weight && (
                        <p className='text-red-500 text-sm'>{errors.weight}</p>
                    )}
                </div>

                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <Select
                            label='Tipo Sanguíneo'
                            name='type'
                            value={doador.bloodType.type}
                            onChange={(e) => {
                                const value = e.target.value;
                                setDoador((prev) => ({
                                    ...prev,
                                    bloodType: {
                                        ...prev.bloodType,
                                        type: value,
                                    },
                                }));
                                validateField('type', value);
                            }}
                            options={['A', 'B', 'AB', 'O']}
                        />
                        {errors.type && (
                            <p className='text-red-500 text-sm'>
                                {errors.type}
                            </p>
                        )}
                    </div>

                    <div>
                        <Select
                            label='Fator RH'
                            name='rhFactor'
                            value={doador.bloodType.rhFactor}
                            onChange={(e) => {
                                const value = e.target.value;
                                setDoador((prev) => ({
                                    ...prev,
                                    bloodType: {
                                        ...prev.bloodType,
                                        rhFactor: value,
                                    },
                                }));
                                validateField('rhFactor', value);
                            }}
                            options={['+', '-']}
                        />
                        {errors.rhFactor && (
                            <p className='text-red-500 text-sm'>
                                {errors.rhFactor}
                            </p>
                        )}
                    </div>
                </div>

                <div className='col-span-2 mt-6'>
                    <button
                        onClick={handleSubmit}
                        className='w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold'
                    >
                        {doadorEmEdicao
                            ? 'Atualizar Doador'
                            : 'Cadastrar Doador'}
                    </button>
                </div>
            </div>
        </>
    );
}
