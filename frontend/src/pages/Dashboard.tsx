import { MainLayout } from '../layouts/MainLayout';
import { useDoadores } from '../context/DoadorContext';
import { useAgendamentos } from '../context/AgendamentoContext';
import { useEstoque } from '../context/EstoqueContext';

import { Status } from '../../../backend/src/domain/enums/Status';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

export function Dashboard() {
    const { doadores } = useDoadores();
    const { agendamentos } = useAgendamentos();
    const { bolsas } = useEstoque();

    const totalDoadores = doadores.length;
    const totalAgendamentos = agendamentos.filter(
        (a) => a.status == Status.PENDING,
    ).length;

    const totalDoacoes = doadores.reduce(
        (acc, doador) => acc + doador.donations.length,
        0,
    );

    const totalBolsas = bolsas.filter((b) => b.available == true).length;

    const tipos = ['A', 'B', 'AB', 'O'];

    const dataPorTipo = tipos.map((tipo) => {
        const positivos = bolsas.filter(
            (b) => b.bloodType.type === tipo && b.bloodType.rhFactor === '+',
        ).length;

        const negativos = bolsas.filter(
            (b) => b.bloodType.type === tipo && b.bloodType.rhFactor === '-',
        ).length;

        return { positivos, negativos };
    });

    const chartData = {
        labels: tipos,
        datasets: [
            {
                label: 'RH +',
                data: dataPorTipo.map((d) => d.positivos),
                backgroundColor: '#ef4444',
            },
            {
                label: 'RH -',
                data: dataPorTipo.map((d) => d.negativos),
                backgroundColor: '#3b82f6',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    precision: 0,
                },
            },
        },
    };

    const estoqueCritico = bolsas.reduce(
        (acc: Record<string, number>, bolsa) => {
            const tipo = `${bolsa.bloodType.type}${bolsa.bloodType.rhFactor}`;

            acc[tipo] = (acc[tipo] || 0) + (bolsa.available ? 1 : 0);

            return acc;
        },
        {},
    );

    const rankingEstoque = Object.entries(estoqueCritico).sort(
        (a, b) => a[1] - b[1],
    );

    const proximosAgendamentos = [...agendamentos]
        .filter((a) => a.status === Status.PENDING)
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .slice(0, 5);

    return (
        <MainLayout>
            <div className='max-w-7xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-6'>
                <div className='grid grid-cols-4 gap-4 font-medium'>
                    <Card title='Total de Doações' value={totalDoacoes} />
                    <Card title='Total de Doadores' value={totalDoadores} />
                    <Card title='Agendamentos' value={totalAgendamentos} />
                    <Card title='Bolsas em Estoque' value={totalBolsas} />
                </div>

                <div className='grid grid-cols-3 gap-6'>
                    <div className='col-span-2 bg-white p-4 rounded-xl shadow-lg'>
                        <h1 className='mb-4 text-gray-700 font-medium'>
                            Doações por Tipo Sanguíneo
                        </h1>

                        <Bar data={chartData} options={options} />
                    </div>

                    <div className='col-span-1 bg-white p-4 rounded-xl shadow-lg'>
                        <h1 className='text-gray-700 font-medium mb-4'>
                            Estoque Crítico
                        </h1>

                        <ul className='space-y-2'>
                            {rankingEstoque.map(([tipo, qtd]) => (
                                <li
                                    key={tipo}
                                    className='flex justify-between border-b border-gray-300 pb-1'
                                >
                                    <span>{tipo}</span>

                                    <span
                                        className={
                                            qtd <= 2
                                                ? 'text-red-600 font-bold'
                                                : ''
                                        }
                                    >
                                        {qtd} bolsas
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className='bg-white p-4 rounded-xl shadow-lg'>
                    <h2 className='text-gray-700 font-medium mb-4'>
                        Próximos Agendamentos
                    </h2>

                    {proximosAgendamentos.length === 0 ? (
                        <p className='text-gray-500'>
                            Nenhum agendamento próximo
                        </p>
                    ) : (
                        <>
                            <div className='grid grid-cols-3 bg-red-700 text-white font-semibold rounded-t-xl'>
                                <div className='p-3 text-center'>Data</div>

                                <div className='p-3 text-center'>Horário</div>

                                <div className='p-3 text-center'>Nome</div>
                            </div>

                            {proximosAgendamentos.map((agendamento) => (
                                <div
                                    key={agendamento.id}
                                    className='grid grid-cols-3 border-b border-gray-200 hover:bg-gray-50'
                                >
                                    <div className='p-3 text-center'>
                                        {agendamento.date.toLocaleDateString(
                                            'pt-BR',
                                        )}
                                    </div>

                                    <div className='p-3 text-center'>
                                        {agendamento.date.toLocaleTimeString(
                                            'pt-BR',
                                            {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            },
                                        )}
                                    </div>

                                    <div className='p-3 text-center'>
                                        {agendamento.donor.name}
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}

function Card({ title, value }: { title: string; value: number }) {
    return (
        <div className='bg-white p-4 rounded-xl shadow'>
            <p className='text-gray-500'>{title}</p>
            <p className='text-2xl font-bold text-red-600'>{value}</p>
        </div>
    );
}
