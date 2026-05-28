import { useState } from "react";
import { Input } from "../Input/Input";
import { Select } from "../Select/Select";
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

export function DoadorForm() {
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

  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = event.target;

    setDoador((prev) => ({
      ...prev,
      [name]: name === "peso" ? Number(value) : value
    }));
  }

  function validate() {
    const newErrors: Record<string, string> = {};

    if (!doador.nome) newErrors.nome = "Nome obrigatório";
    if (!doador.cpf) newErrors.cpf = "CPF obrigatório";
    if (!doador.telefone) newErrors.telefone = "Telefone obrigatório";
    if (!doador.email.includes("@")) newErrors.email = "Email inválido";
    if (doador.peso <= 0) newErrors.peso = "Peso inválido";
    if (!doador.tipoSanguineo) newErrors.tipoSanguineo = "Obrigatório";
    if (!doador.fatorRh) newErrors.fatorRh = "Obrigatório";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;

    console.log("Doador válido:", doador);
  }

  const isValid = Object.keys(errors).length === 0;

  return (
    <div className="grid grid-cols-2 gap-4">

      {/* Nome */}
      <div>
        <Input
          label="Nome"
          name="nome"
          value={doador.nome}
          onChange={handleChange}
        />
        {errors.nome && <p className="text-red-500 text-sm">{errors.nome}</p>}
      </div>

      {/* CPF */}
      <div>
        <label className="font-medium">CPF</label>
        <IMaskInput
          mask="000.000.000-00"
          value={doador.cpf}
          onAccept={(value) =>
            setDoador((prev) => ({ ...prev, cpf: value }))
          }
          className="border p-3 rounded-xl w-full"
        />
        {errors.cpf && <p className="text-red-500 text-sm">{errors.cpf}</p>}
      </div>

      {/* TELEFONE */}
      <div>
        <label className="font-medium">Telefone</label>
        <IMaskInput
          mask="(00) 00000-0000"
          value={doador.telefone}
          onAccept={(value) =>
            setDoador((prev) => ({ ...prev, telefone: value }))
          }
          className="border p-3 rounded-xl w-full"
        />
        {errors.telefone && (
          <p className="text-red-500 text-sm">{errors.telefone}</p>
        )}
      </div>

      {/* EMAIL */}
      <div>
        <Input
          label="Email"
          name="email"
          value={doador.email}
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      {/* DATA */}
      <Input
        label="Data de Nascimento"
        type="date"
        name="dataNascimento"
        value={doador.dataNascimento}
        onChange={handleChange}
      />

      {/* SEXO */}
      <Select
        label="Sexo"
        name="sexo"
        value={doador.sexo}
        onChange={(e) =>
          setDoador((prev) => ({ ...prev, sexo: e.target.value }))
        }
        options={["Masculino", "Feminino", "Outro"]}
      />

      {/* LINHA 3 COLUNAS */}
      <div className="col-span-2 grid grid-cols-3 gap-4">

        <div>
          <Input
            label="Peso"
            name="peso"
            type="number"
            value={doador.peso}
            onChange={handleChange}
          />
          {errors.peso && (
            <p className="text-red-500 text-sm">{errors.peso}</p>
          )}
        </div>

        <div>
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
          {errors.tipoSanguineo && (
            <p className="text-red-500 text-sm">{errors.tipoSanguineo}</p>
          )}
        </div>

        <div>
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
          {errors.fatorRh && (
            <p className="text-red-500 text-sm">{errors.fatorRh}</p>
          )}
        </div>

      </div>

      {/* BOTÃO */}
      <div className="col-span-2 mt-6">
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className={`w-full py-3 rounded-xl font-semibold transition ${
            isValid
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          Cadastrar Doador
        </button>
      </div>

    </div>
  );
}