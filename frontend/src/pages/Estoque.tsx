import { MainLayout } from '../layouts/MainLayout';
import { useEstoque } from '../context/EstoqueContext';

export function Estoque() {
    const { bolsas } = useEstoque();

    const bolsasDisponiveis = bolsas.filter((bolsa) => bolsa.available);

    const estoquePorTipo = bolsasDisponiveis.reduce(
        (acc, bolsa) => {
            const tipo = `${bolsa.bloodType.type}${bolsa.bloodType.rhFactor}`;

            acc[tipo] = (acc[tipo] || 0) + 1;

            return acc;
        },
        {} as Record<string, number>,
    );

    const validadePorTipo = bolsasDisponiveis.reduce(
        (acc, bolsa) => {
            const tipo = `${bolsa.bloodType.type}${bolsa.bloodType.rhFactor}`;

            if (!acc[tipo] || bolsa.expirationDate < acc[tipo]) {
                acc[tipo] = bolsa.expirationDate;
            }

            return acc;
        },
        {} as Record<string, Date>,
    );

    return (
        <MainLayout>
            <div className='max-w-8xl mx-auto bg-white p-8 rounded-2xl shadow-md'>
                <div className='flex justify-between items-center mb-6'>
                    <h1 className='text-2xl font-bold text-red-700'>
                        Estoque de Sangue
                    </h1>
                </div>

                {bolsas.length === 0 ? (
                    <p className='text-gray-500'>Nenhuma bolsa cadastrada</p>
                ) : (
                    <>
                        <div>
                            <div className='grid grid-cols-4 bg-red-700 text-white font-semibold rounded-t-xl'>
                                <div className='p-3 text-center'>
                                    Tipo Sanguíneo
                                </div>

                                <div className='p-3 text-center'>
                                    Quantidade
                                </div>

                                <div className='p-3 text-center'>
                                    Próxima Validade
                                </div>

                                <div className='p-3 text-center'>Status</div>
                            </div>

                            {Object.entries(estoquePorTipo).map(
                                ([tipo, quantidade]) => (
                                    <div
                                        key={tipo}
                                        className='grid grid-cols-4 border-b border-gray-200 hover:bg-gray-50'
                                    >
                                        <div className='p-3 text-center'>
                                            {tipo}
                                        </div>

                                        <div className='p-3 text-center'>
                                            {quantidade}
                                        </div>

                                        <div className='p-3 text-center'>
                                            {validadePorTipo[
                                                tipo
                                            ].toLocaleDateString('pt-BR')}
                                        </div>

                                        <div className='p-3 text-center'>
                                            {quantidade <= 3 ? (
                                                <span className='text-red-600 font-bold'>
                                                    Estoque Baixo
                                                </span>
                                            ) : (
                                                <span className='text-green-600 font-medium'>
                                                    Normal
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>

                        <div className='mt-10'>
                            <h2 className='text-xl font-semibold text-red-700 mb-4'>
                                Bolsas Cadastradas
                            </h2>

                            <div className='grid grid-cols-5 bg-red-700 text-white font-semibold rounded-t-xl'>
                                <div className='p-3 text-center'>Tipo</div>

                                <div className='p-3 text-center'>Coleta</div>

                                <div className='p-3 text-center'>Validade</div>

                                <div className='p-3 text-center'>Volume</div>

                                <div className='p-3 text-center'>Status</div>
                            </div>

                            {[...bolsas]
                                .sort(
                                    (a, b) =>
                                        b.expirationDate.getTime() -
                                        a.expirationDate.getTime(),
                                )
                                .map((bolsa) => {
                                    const diasRestantes = Math.ceil(
                                        (bolsa.expirationDate.getTime() -
                                            Date.now()) /
                                            (1000 * 60 * 60 * 24),
                                    );

                                    const vencida = diasRestantes < 0;

                                    const venceEmBreve =
                                        diasRestantes <= 7 && !vencida;

                                    const tipo = `${bolsa.bloodType.type}${bolsa.bloodType.rhFactor}`;

                                    return (
                                        <div
                                            key={bolsa.id}
                                            className={`grid grid-cols-5 border-b border-gray-200 hover:bg-gray-50 ${
                                                vencida ? 'opacity-60' : ''
                                            } ${
                                                venceEmBreve
                                                    ? 'font-medium'
                                                    : ''
                                            }`}
                                        >
                                            <div className='p-3 text-center'>
                                                {tipo}
                                            </div>

                                            <div className='p-3 text-center'>
                                                {bolsa.collectionDate.toLocaleDateString(
                                                    'pt-BR',
                                                )}
                                            </div>

                                            <div className='p-3 text-center'>
                                                {bolsa.expirationDate.toLocaleDateString(
                                                    'pt-BR',
                                                )}
                                            </div>

                                            <div className='p-3 text-center'>
                                                {bolsa.volume} ml
                                            </div>

                                            <div className='p-3 text-center'>
                                                {!bolsa.available ? (
                                                    <span className='text-gray-500 font-medium'>
                                                        Utilizada
                                                    </span>
                                                ) : vencida ? (
                                                    <span className='text-red-600 font-bold'>
                                                        Vencida
                                                    </span>
                                                ) : venceEmBreve ? (
                                                    <span className='text-yellow-600 font-bold'>
                                                        Vence em {diasRestantes}{' '}
                                                        dias
                                                    </span>
                                                ) : (
                                                    <span className='text-green-600 font-medium'>
                                                        Disponível
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </>
                )}
            </div>
        </MainLayout>
    );
}
