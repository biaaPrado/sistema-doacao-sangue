import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../Input/Input";
import { Select } from "../Select/Select";
import { IMaskInput } from "react-imask";
import { useDoadores } from "../../context/DoadorContext";
import type { Doador } from "../../types/Doador"; 
import { useToast } from "../../hooks/useToast";
import { Toast } from "../Toast/Toast";

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
    if (doadorEmEdicao) { setDoador({...doadorEmEdicao, historicoDoacoes: doadorEmEdicao.historicoDoacoes ?? []});}}, [doadorEmEdicao]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setDoador((prev) => ({ ...prev,[name]: name === "peso" ? Number(value) : value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const newErrors: Record<string, string> = {};

    if (!doador.nome.trim()) newErrors.nome = "Nome obrigatório";
    if (!doador.cpf.trim()) newErrors.cpf = "CPF obrigatório";
    if (!doador.telefone.trim()) newErrors.telefone = "Telefone obrigatório";
    if (!doador.email.includes("@")) newErrors.email = "Email inválido";
    if (!doador.dataNascimento.trim()) newErrors.dataNascimento = "Data de nascimento obrigatória";
    if (!doador.sexo.trim()) newErrors.sexo = "Sexo obrigatório";
    if (doador.peso <= 0) newErrors.peso = "Peso inválido";
    if (!doador.tipoSanguineo) newErrors.tipoSanguineo = "Obrigatório";
    if (!doador.fatorRh) newErrors.fatorRh = "Obrigatório";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;

    if (doadorEmEdicao) {
      atualizarDoador(doadorEmEdicao.cpf, {...doador, historicoDoacoes: doador.historicoDoacoes ?? []});
      setDoadorEmEdicao(null);

      showToast("Doador atualizado com sucesso!", "success", 5000);
      setTimeout(() => { navigate("/doadores"); }, 5000);
    } else {
      addDoador({ ...doador, historicoDoacoes: []});

      showToast("Doador cadastrado com sucesso!", "success", 5000);
      setTimeout(() => { navigate("/doadores"); }, 5000);
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

  return (
    <>
    {toast && ( <Toast message={toast.message} type={toast.type} duration={toast.duration} /> )}
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Input label="Nome" name="nome" value={doador.nome} onChange={handleChange} />
        {errors.nome && ( <p className="text-red-500 text-sm"> {errors.nome} </p> )}
      </div>
      
      <div>
        <label className="font-medium">CPF</label>
        <IMaskInput
          mask="000.000.000-00"
          value={doador.cpf}
          onAccept={(value) => setDoador((prev) => ({ ...prev, cpf: value })) }
          className="border border-gray-300 p-3 rounded-xl w-full"
        />
        {errors.cpf && ( <p className="text-red-500 text-sm"> {errors.cpf} </p> )}
      </div>

      <div>
        <label className="font-medium">Telefone</label>
        <IMaskInput
          mask="(00) 00000-0000"
          value={doador.telefone}
          onAccept={(value) => setDoador((prev) => ({ ...prev, telefone: value })) }
          className="border border-gray-300 p-3 rounded-xl w-full"
        />
        {errors.telefone && ( <p className="text-red-500 text-sm"> {errors.telefone} </p> )}
      </div>

      <div>
        <Input label="Email" name="email" value={doador.email} onChange={handleChange} />
        {errors.email && ( <p className="text-red-500 text-sm"> {errors.email} </p> )}
      </div>
      
      <div>
        <Input
          label="Data de Nascimento"
          type="date"
          name="dataNascimento"
          value={doador.dataNascimento}
          onChange={handleChange}
        />
        {errors.dataNascimento && ( <p className="text-red-500 text-sm"> {errors.dataNascimento} </p> )}
      </div>

      <div>
        <Select
          label="Sexo"
          name="sexo"
          value={doador.sexo}
          onChange={(e) => setDoador((prev) => ({ ...prev, sexo: e.target.value })) }
          options={["Masculino", "Feminino", "Outro"]}
        />
        {errors.sexo && ( <p className="text-red-500 text-sm"> {errors.sexo} </p> )}
      </div>

      <div>
        <Input
          label="Peso"
          name="peso"
          type="number"
          value={doador.peso}
          onChange={handleChange}
        />
        {errors.peso && ( <p className="text-red-500 text-sm"> {errors.peso} </p> )}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Select
            label="Tipo Sanguíneo"
            name="tipoSanguineo"
            value={doador.tipoSanguineo}
            onChange={(e) => setDoador((prev) => ({ ...prev, tipoSanguineo: e.target.value })) }
            options={["A", "B", "AB", "O"]}
          />
          {errors.tipoSanguineo && ( <p className="text-red-500 text-sm"> {errors.tipoSanguineo} </p> )}
        </div>
        
        <div>
          <Select
            label="Fator RH"
            name="fatorRh"
            value={doador.fatorRh}
            onChange={(e) => setDoador((prev) => ({ ...prev, fatorRh: e.target.value })) }
            options={["+", "-"]}
          />  
          {errors.fatorRh && ( <p className="text-red-500 text-sm"> {errors.fatorRh} </p> )}
        </div>
      </div>

      <div className="col-span-2 mt-6">
        <button
          onClick={handleSubmit}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold"
        > {doadorEmEdicao ? "Atualizar Doador" : "Cadastrar Doador"}
        </button>
      </div>
    </div>
    </>
  );
}