import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../Input/Input";
import { Select } from "../Select/Select";
import { IMaskInput } from "react-imask";
import { useDoadores } from "../../context/DoadorContext";
import { useToast } from "../../hooks/useToast";
import { Toast } from "../Toast/Toast";

import type { Doador } from "../../types/Doador";

export function DoadorForm() {
  const navigate = useNavigate();

  const {
    addDoador,
    atualizarDoador,
    doadorEmEdicao,
    setDoadorEmEdicao,
  } = useDoadores();

  const { toast, showToast } = useToast();

  const [doador, setDoador] = useState<Doador>({
    id: crypto.randomUUID(),
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
    dataNascimento: "",
    sexo: "",
    peso: 0,
    tipoSanguineo: "",
    fatorRh: "",
    historicoDoacoes: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const hoje = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (doadorEmEdicao) {
      setDoador({...doadorEmEdicao, historicoDoacoes: doadorEmEdicao.historicoDoacoes ?? [], });
    }}, [doadorEmEdicao]
  );

  function validateField(name: string, value: any) {
    let message = "";

    switch (name) {
      case "nome": if (!value.trim()) message = "Nome obrigatório"; break;
      case "cpf": if (!value.trim()) message = "CPF obrigatório"; break;
      case "telefone": if (!value.trim()) message = "Telefone obrigatório"; break;
      case "email": if (!value.includes("@")) message = "Email inválido"; break;
      case "dataNascimento":
        if (!value) message = "Data obrigatória";
        else if (value > hoje) message = "Insira uma data válida!";
        break;

      case "peso": if (!value || Number(value) <= 0) message = "Peso inválido"; break;
      case "sexo": if (!value) message = "Sexo obrigatório"; break;
      case "tipoSanguineo": if (!value) message = "Obrigatório"; break;
      case "fatorRh": if (!value) message = "Obrigatório"; break;
    }

    setErrors((prev) => ({...prev, [name]: message, }));
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    const newValue = name === "peso" ? Number(value) : value;

    setDoador((prev) => ({...prev, [name]: newValue, }));

    validateField(name, newValue);
  }

  function validateAll() {
    const newErrors: Record<string, string> = {};

    if (!doador.nome.trim()) newErrors.nome = "Nome obrigatório";
    if (!doador.cpf.trim()) newErrors.cpf = "CPF obrigatório";
    if (!doador.telefone.trim()) newErrors.telefone = "Telefone obrigatório";
    if (!doador.email.includes("@")) newErrors.email = "Email inválido";
    if (!doador.dataNascimento) newErrors.dataNascimento = "Data obrigatória";
    if (doador.dataNascimento > hoje)
      newErrors.dataNascimento = "Data não pode ser futura";
    if (!doador.sexo) newErrors.sexo = "Sexo obrigatório";
    if (!doador.peso || doador.peso <= 0) newErrors.peso = "Peso inválido";
    if (!doador.tipoSanguineo) newErrors.tipoSanguineo = "Obrigatório";
    if (!doador.fatorRh) newErrors.fatorRh = "Obrigatório";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit() {
    if (!validateAll()) return;

    const payload: Doador = {...doador, historicoDoacoes: doador.historicoDoacoes ?? [],
    };

    if (doadorEmEdicao) {
      atualizarDoador(doadorEmEdicao.id, payload);
      setDoadorEmEdicao(null);

      showToast("Doador atualizado com sucesso!", "success", 5000);
    } else {
      addDoador({...payload, id: crypto.randomUUID(),});
      showToast("Doador cadastrado com sucesso!", "success", 5000);
    }

    setTimeout(() => { navigate("/doadores"); }, 1200);
  }

  return (
    <>
      {toast && ( <Toast message={toast.message} type={toast.type} duration={toast.duration} /> )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Input
            label="Nome"
            name="nome"
            value={doador.nome}
            onChange={handleChange}
          />
          {errors.nome && <p className="text-red-500 text-sm">{errors.nome}</p>}
        </div>

        <div>
          <label className="font-medium">CPF</label>
          <IMaskInput
            mask="000.000.000-00"
            value={doador.cpf}
            onAccept={(value) => {
              setDoador((prev) => ({ ...prev, cpf: value }));
              validateField("cpf", value);
            }}
            className="border border-gray-300 p-3 rounded-xl w-full"
          />
          {errors.cpf && <p className="text-red-500 text-sm">{errors.cpf}</p>}
        </div>

        <div>
          <label className="font-medium">Telefone</label>
          <IMaskInput
            mask="(00) 00000-0000"
            value={doador.telefone}
            onAccept={(value) => {
              setDoador((prev) => ({ ...prev, telefone: value }));
              validateField("telefone", value);
            }}
            className="border border-gray-300 p-3 rounded-xl w-full"
          />
          {errors.telefone && ( <p className="text-red-500 text-sm">{errors.telefone}</p> )}
        </div>

        <div>
          <Input
            label="Email"
            name="email"
            value={doador.email}
            onChange={handleChange}
          />
          {errors.email && (<p className="text-red-500 text-sm">{errors.email}</p> )}
        </div>

        <div>
          <Input
            label="Data de Nascimento"
            type="date"
            name="dataNascimento"
            max={hoje}
            value={doador.dataNascimento}
            onChange={handleChange}
          />
          {errors.dataNascimento && ( <p className="text-red-500 text-sm">{errors.dataNascimento}</p> )}
        </div>

        <div>
          <Select
            label="Sexo"
            name="sexo"
            value={doador.sexo}
            onChange={(e) => {
              const value = e.target.value;
              setDoador((prev) => ({ ...prev, sexo: value }));
              validateField("sexo", value);
            }}
            options={["Masculino", "Feminino", "Outro"]}
          />
          {errors.sexo && (
            <p className="text-red-500 text-sm">{errors.sexo}</p> )}
        </div>

        <div>
          <Input
            label="Peso"
            name="peso"
            type="number"
            value={doador.peso}
            onChange={handleChange}
          />
          {errors.peso && ( <p className="text-red-500 text-sm">{errors.peso}</p> )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Select
              label="Tipo Sanguíneo"
              name="tipoSanguineo"
              value={doador.tipoSanguineo}
              onChange={(e) => {
                const value = e.target.value;
                setDoador((prev) => ({ ...prev, tipoSanguineo: value }));
                validateField("tipoSanguineo", value);
              }}
              options={["A", "B", "AB", "O"]}
            />
            {errors.tipoSanguineo && ( <p className="text-red-500 text-sm">{errors.tipoSanguineo}</p> )}
          </div>

          <div>
            <Select
              label="Fator RH"
              name="fatorRh"
              value={doador.fatorRh}
              onChange={(e) => {
                const value = e.target.value;
                setDoador((prev) => ({ ...prev, fatorRh: value }));
                validateField("fatorRh", value);
              }}
              options={["+", "-"]}
            />
            {errors.fatorRh && ( <p className="text-red-500 text-sm">{errors.fatorRh}</p> )}
          </div>
        </div>

        <div className="col-span-2 mt-6">
          <button
            onClick={handleSubmit}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold" >
            {doadorEmEdicao ? "Atualizar Doador" : "Cadastrar Doador"}
          </button>
        </div>
      </div>
    </>
  );
}