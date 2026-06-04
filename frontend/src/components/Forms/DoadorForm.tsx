import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../Input/Input";
import { Select } from "../Select/Select";
import { IMaskInput } from "react-imask";
import { useDoadores } from "../../context/DoadorContext";

import type { Doador } from "../../types/Doador"; // ajuste o path se necessário

export function DoadorForm() {
  const navigate = useNavigate();

  const {
    addDoador,
    atualizarDoador,
    doadorEmEdicao,
    setDoadorEmEdicao,
  } = useDoadores();

  const [doador, setDoador] = useState<Doador>({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
    dataNascimento: "",
    sexo: "",
    peso: 0,
    tipoSanguineo: "",
    fatorRh: "",
    historicoDoacoes: []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (doadorEmEdicao) {
      setDoador({
        ...doadorEmEdicao,
        historicoDoacoes: doadorEmEdicao.historicoDoacoes ?? []
      });
    }
  }, [doadorEmEdicao]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setDoador((prev) => ({
      ...prev,
      [name]: name === "peso" ? Number(value) : value
    }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const newErrors: Record<string, string> = {};

    if (!doador.nome.trim()) newErrors.nome = "Nome obrigatório";
    if (!doador.cpf.trim()) newErrors.cpf = "CPF obrigatório";
    if (!doador.telefone.trim()) newErrors.telefone = "Telefone obrigatório";
    if (!doador.email.includes("@")) newErrors.email = "Email inválido";
    if (doador.peso <= 0) newErrors.peso = "Peso inválido";
    if (!doador.tipoSanguineo) newErrors.tipoSanguineo = "Obrigatório";
    if (!doador.fatorRh) newErrors.fatorRh = "Obrigatório";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;

    if (doadorEmEdicao) {
      atualizarDoador(doadorEmEdicao.cpf, {
        ...doador,
        historicoDoacoes: doador.historicoDoacoes ?? []
      });

      setDoadorEmEdicao(null);
      alert("Doador atualizado com sucesso!");
      navigate("/doadores");
    } else {
      addDoador({
        ...doador,
        historicoDoacoes: []
      });

      alert("Doador cadastrado com sucesso!");
      navigate("/doadores");
    }

    setDoador({
      nome: "",
      cpf: "",
      telefone: "",
      email: "",
      dataNascimento: "",
      sexo: "",
      peso: 0,
      tipoSanguineo: "",
      fatorRh: "",
      historicoDoacoes: []
    });
  }

  const isValid =
    doador.nome.trim() !== "" &&
    doador.cpf.trim() !== "" &&
    doador.telefone.trim() !== "" &&
    doador.email.includes("@") &&
    doador.peso > 0 &&
    doador.tipoSanguineo !== "" &&
    doador.fatorRh !== "";

  const canSubmit = isValid;

  return (
    <div className="grid grid-cols-2 gap-4">

      <Input label="Nome" name="nome" value={doador.nome} onChange={handleChange} />

      <div>
        <label className="font-medium">CPF</label>
        <IMaskInput
          mask="000.000.000-00"
          value={doador.cpf}
          onAccept={(value) =>
            setDoador((prev) => ({ ...prev, cpf: value }))
          }
          className="border border-gray-300 p-3 rounded-xl w-full"
        />
      </div>

      <div>
        <label className="font-medium">Telefone</label>
        <IMaskInput
          mask="(00) 00000-0000"
          value={doador.telefone}
          onAccept={(value) =>
            setDoador((prev) => ({ ...prev, telefone: value }))
          }
          className="border border-gray-300 p-3 rounded-xl w-full"
        />
      </div>

      <Input label="Email" name="email" value={doador.email} onChange={handleChange} />

      <Input
        label="Data de Nascimento"
        type="date"
        name="dataNascimento"
        value={doador.dataNascimento}
        onChange={handleChange}
      />

      <Select
        label="Sexo"
        name="sexo"
        value={doador.sexo}
        onChange={(e) =>
          setDoador((prev) => ({ ...prev, sexo: e.target.value }))
        }
        options={["Masculino", "Feminino", "Outro"]}
      />

      <Input
        label="Peso"
        name="peso"
        type="number"
        value={doador.peso}
        onChange={handleChange}
      />

      <div className="grid grid-cols-2 gap-4j">
        <Select
          label="Tipo Sanguíneo"
          name="tipoSanguineo"
          value={doador.tipoSanguineo}
          onChange={(e) =>
            setDoador((prev) => ({ ...prev, tipoSanguineo: e.target.value }))
          }
          options={["A", "B", "AB", "O"]}
        />

        <Select
          label="Fator RH"
          name="fatorRh"
          value={doador.fatorRh}
          onChange={(e) =>
            setDoador((prev) => ({ ...prev, fatorRh: e.target.value }))
          }
          options={["+", "-"]}
        />  
      </div>

      <div className="col-span-2 mt-6">
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`w-full py-3 rounded-xl font-semibold transition ${
            canSubmit
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          {doadorEmEdicao ? "Atualizar Doador" : "Cadastrar Doador"}
        </button>
      </div>

    </div>
  );
}