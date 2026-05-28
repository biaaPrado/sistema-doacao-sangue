import { useState } from "react";

import { MainLayout } from "../layouts/MainLayout";
import { Input } from "../components/Input/Input";
import { Select } from "../components/Select/Select";
import { IMaskInput } from "react-imask";

interface Doador {
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  dataNascimento: string;
  sexo: string;
  peso: number;
  tipoSanguineo: string;
  fatorRh: string;
}

export function CadastroDoador() {
  const [doador, setDoador] = useState<Doador>({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
    dataNascimento: "",
    sexo: "",
    peso: 0,
    tipoSanguineo: "",
    fatorRh: ""
  });

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = event.target;

    setDoador((prev) => ({
      ...prev,
      [name]: name === "peso" ? Number(value) : value
    }));
  }

  function handleSubmit() {
    console.log("Doador cadastrado:", doador);
  }

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto bg-white px-8 py-6 rounded-2xl shadow-md">

        <h1 className="text-2xl font-bold text-red-700 mb-6">
          Cadastro de Doador
        </h1>

        <div className="grid grid-cols-2 gap-4">

          {/* Nome */}
          <Input
            label="Nome"
            name="nome"
            value={doador.nome}
            onChange={handleChange}
          />

          {/* CPF */}
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">CPF</label>

            <IMaskInput
              mask="000.000.000-00"
              value={doador.cpf}
              onAccept={(value) =>
                setDoador((prev) => ({ ...prev, cpf: value }))
              }
              className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Telefone */}
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">Telefone</label>

            <IMaskInput
              mask="(00) 00000-0000"
              value={doador.telefone}
              onAccept={(value) =>
                setDoador((prev) => ({ ...prev, telefone: value }))
              }
              className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Email */}
          <Input
            label="Email"
            name="email"
            value={doador.email}
            onChange={handleChange}
          />

          {/* Data de nascimento */}
          <Input
            label="Data de Nascimento"
            type="date"
            name="dataNascimento"
            value={doador.dataNascimento}
            onChange={handleChange}
          />

          {/* Sexo */}
          <Select
            label="Sexo"
            name="sexo"
            value={doador.sexo}
            onChange={(e) =>
              setDoador((prev) => ({
                ...prev,
                sexo: e.target.value
              }))
            }
            options={["Masculino", "Feminino", "Outro"]}
          />

          {/* LINHA: PESO + SANGUE + RH */}
          <div className="col-span-2 grid grid-cols-3 gap-4">

            <Input
              label="Peso"
              name="peso"
              type="number"
              value={doador.peso}
              onChange={handleChange}
            />

            <Select
              label="Tipo Sanguíneo"
              name="tipoSanguineo"
              value={doador.tipoSanguineo}
              onChange={(e) =>
                setDoador((prev) => ({
                  ...prev,
                  tipoSanguineo: e.target.value
                }))
              }
              options={["A", "B", "AB", "O"]}
            />

            <Select
              label="Fator RH"
              name="fatorRh"
              value={doador.fatorRh}
              onChange={(e) =>
                setDoador((prev) => ({
                  ...prev,
                  fatorRh: e.target.value
                }))
              }
              options={["+", "-"]}
            />

          </div>

          {/* BOTÃO FULL WIDTH */}
          <div className="col-span-2 mt-6">

            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-red-600 text-white py-2 rounded-xl hover:bg-red-700 transition font-semibold"
            >
              Cadastrar Doador
            </button>

          </div>

        </div>
      </div>
    </MainLayout>
  );
}