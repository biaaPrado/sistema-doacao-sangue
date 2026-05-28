import { MainLayout } from "../layouts/MainLayout";
import { Card } from "../components/Card/Card.tsx";

export function Home() {
  return (
    <MainLayout>
      <div className="grid grid-cols-3 gap-6">
        
        <Card>
          <h2 className="text-2xl font-bold text-red-700">Doadores</h2>
          <p className="text-gray-600">Gerencie os doadores cadastrados</p>
        </Card>

        <Card>
          <h2 className="text-2xl font-bold text-red-700">Estoque</h2>
          <p className="text-gray-600">Controle de bolsas de sangue</p>
        </Card>

        <Card>
          <h2 className="text-2xl font-bold text-red-700">Hospitais</h2>
          <p className="text-gray-600">Pedidos e solicitações</p>
        </Card>

      </div>
    </MainLayout>
  );
}