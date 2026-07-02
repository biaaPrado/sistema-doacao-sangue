import { useNavigate, useParams } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { useDoadores } from '../context/DoadorContext';

export function DoadorDetalhe() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { doadores } = useDoadores();

    const doador = doadores.find((d) => d.id === id);

    function formatarData(data: Date) {
        return data.toLocaleDateString('pt-BR');
    }

    if (!doador) {
        return (
            <MainLayout>
                <p className='text-gray-500'>Doador não encontrado</p>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <button
                onClick={() => navigate('/doadores')}
                className='mb-4 flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition font-medium'
            >
                ← Voltar para Lista
            </button>

            <div className='max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md'>
                <div className='flex items-center justify-between mb-6'>
                    <div>
                        <h1 className='text-2xl font-bold text-red-700'>
                            {' '}
                            {doador.weight}{' '}
                        </h1>
                        <p className='text-gray-500'> Detalhes do doador </p>
                    </div>

                    <div className='flex items-center gap-4'>
                        <span className='px-4 py-1 rounded-full bg-red-100 text-red-700 font-semibold'>
                            {' '}
                            {doador.bloodType.type}
                            {doador.bloodType.rhFactor}{' '}
                        </span>

                        <div className='bg-red-50 border border-red-100 rounded-xl py-2 px-3'>
                            <p className='text-sm text-gray-500'>
                                {' '}
                                Total de Doações{' '}
                            </p>
                            <p className='text-xl text-right font-bold text-red-700'>
                                {' '}
                                {doador.donations?.length || 0}{' '}
                            </p>
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-2 gap-4 mb-6'>
                    <div className='bg-gray-50 p-4 rounded-xl'>
                        <p className='text-sm text-gray-500'> CPF </p>
                        <p className='font-medium'> {doador.cpf} </p>
                    </div>

                    <div className='bg-gray-50 p-4 rounded-xl'>
                        <p className='text-sm text-gray-500'> Telefone </p>
                        <p className='font-medium'> {doador.phone} </p>
                    </div>

                    <div className='bg-gray-50 p-4 rounded-xl'>
                        <p className='text-sm text-gray-500'> Email </p>
                        <p className='font-medium'> {doador.email} </p>
                    </div>

                    <div className='bg-gray-50 p-4 rounded-xl'>
                        <p className='text-sm text-gray-500'> Peso </p>
                        <p className='font-medium'> {doador.weight} kg </p>
                    </div>

                    <div className='bg-gray-50 p-4 rounded-xl col-span-2'>
                        <p className='text-sm text-gray-500'>
                            {' '}
                            Data de nascimento{' '}
                        </p>
                        <p className='font-medium'>
                            {' '}
                            {formatarData(doador.birthDate)}{' '}
                        </p>
                    </div>
                </div>

                <div className='mt-8'>
                    <h2 className='text-xl font-semibold text-red-700 mb-4'>
                        {' '}
                        Histórico de Doações{' '}
                    </h2>

                    {doador.donations?.length ? (
                        <div className='bg-gray-50 rounded-xl overflow-hidden'>
                            {doador.donations.map((doacao, index) => (
                                <div
                                    key={index}
                                    className='grid grid-cols-2 gap-4 p-4 border-b border-gray-200 last:border-b-0'
                                >
                                    <div>
                                        <p className='text-xs text-gray-500'>
                                            {' '}
                                            Data{' '}
                                        </p>
                                        <p className='font-medium'>
                                            {' '}
                                            {formatarData(doacao.date)}{' '}
                                        </p>
                                    </div>

                                    <div>
                                        <p className='text-xs text-gray-500'>
                                            {' '}
                                            Volume{' '}
                                        </p>
                                        <p className='font-medium text-red-700'>
                                            {' '}
                                            {doacao.volume} ml{' '}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='bg-gray-50 rounded-xl p-6 text-center text-gray-500'>
                            {' '}
                            Nenhuma doação registrada{' '}
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
