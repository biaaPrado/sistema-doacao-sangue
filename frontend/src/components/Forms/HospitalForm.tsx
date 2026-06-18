import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../Input/Input";
import { useHospitais } from "../../context/HospitalContext";
import type { Hospital } from "../../types/Hospital";
import { IMaskInput } from "react-imask";
import { useToast } from "../../hooks/useToast";
import { Toast } from "../Toast/Toast";

export function HospitalForm() {
  const navigate = useNavigate();
  const { toast, showToast } = useToast();

  const {
    addHospital,
    atualizarHospital,
    hospitalEmEdicao,
    setHospitalEmEdicao,
  } = useHospitais();

  const [hospital, setHospital] = useState<Hospital>({
    id: "",
    nome: "",
    cnpj: "",
    telefone: "",
    email: "",

    cep: "",
    endereco: "",
    numero: "",
    complemento: "",

    cidade: "",
    estado: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => { if (hospitalEmEdicao) { setHospital(hospitalEmEdicao); }}, [hospitalEmEdicao]);

  async function buscarCEP(cep: string) {
    const cepLimpo = cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();

      if (data.erro) {
        alert("CEP não encontrado.");
        return;
      }

      setHospital((prev) => ({...prev, endereco: data.logradouro, cidade: data.localidade, estado: data.uf, }));
    } catch (error) {
      console.error(error);
      alert("Erro ao buscar CEP.");
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setHospital((prev) => ({...prev, [name]: value,}));
    setErrors((prev) => ({...prev, [name]: "", }));
  }

  function validate() {
    const newErrors: Record<string, string> = {};

    if (!hospital.nome.trim()) newErrors.nome = "Nome obrigatório";
    if (!hospital.cnpj.trim()) newErrors.cnpj = "CNPJ obrigatório";
    if (!hospital.telefone.trim()) newErrors.telefone = "Telefone obrigatório";
    if (!hospital.email.includes("@")) newErrors.email = "Email inválido";
    if (!hospital.cep.trim()) newErrors.cep = "CEP obrigatório";
    if (!hospital.endereco.trim()) newErrors.endereco = "Endereço obrigatório";
    if (!hospital.numero.trim()) newErrors.numero = "Número obrigatório";
    if (!hospital.cidade.trim()) newErrors.cidade = "Cidade obrigatória";
    if (!hospital.estado.trim()) newErrors.estado = "Estado obrigatório";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;

    if (hospitalEmEdicao) {
      atualizarHospital( hospitalEmEdicao.id, hospital );
      setHospitalEmEdicao(null);

      showToast("Hospital atualizado com sucesso!", "success", 5000);
      setTimeout(() => { navigate("/hospitais"); }, 5000);
    } else {
      addHospital({...hospital, id: crypto.randomUUID(),});

      showToast("Hospital cadastrado com sucesso!", "success", 5000);
      setTimeout(() => { navigate("/hospitais"); }, 5000);
    }

    navigate("/hospitais");

    setHospital({
      id: "",
      nome: "",
      cnpj: "",
      telefone: "",
      email: "",

      cep: "",
      endereco: "",
      numero: "",
      complemento: "",

      cidade: "",
      estado: "",
    });
  }

  return (
    <>
    {toast && ( <Toast message={toast.message} type={toast.type} duration={toast.duration} /> )}
    <div className="grid grid-cols-2 gap-4">

      <div>
        <Input
          label="Nome do Hospital"
          name="nome"
          value={hospital.nome}
          onChange={handleChange}
        />
        {errors.nome && ( <p className="text-red-500 text-sm"> {errors.nome} </p> )}
      </div>

      <div>
        <label className="font-medium text-gray-700">CNPJ</label>
        <IMaskInput
          mask="00.000.000/0000-00"
          value={hospital.cnpj}
          onAccept={(value) => setHospital((prev) => ({ ...prev, cnpj: value })) }
          className="border border-gray-300 p-3 rounded-xl w-full"
        />
        {errors.cnpj && ( <p className="text-red-500 text-sm"> {errors.cnpj} </p> )}
      </div>

      <div>
        <label className="font-medium text-gray-700">Telefone</label>
        <IMaskInput
          mask="(00) 0000-0000"
          value={hospital.telefone}
          onAccept={(value) => setHospital((prev) => ({ ...prev, telefone: value })) }
          className="border border-gray-300 p-3 rounded-xl w-full"
        />
        {errors.telefone && ( <p className="text-red-500 text-sm"> {errors.telefone} </p> )}
      </div>

      <div>
        <Input
          label="Email"
          name="email"
          value={hospital.email}
          onChange={handleChange}
        />
        {errors.email && ( <p className="text-red-500 text-sm"> {errors.email} </p> )}
      </div>

      <div className="col-span-2 grid grid-cols-2 gap-4">
        <div>
            <Input
            label="CEP"
            name="cep"
            value={hospital.cep}
            onChange={handleChange}
            onBlur={() => buscarCEP(hospital.cep)}
            />
            {errors.cep && (
            <p className="text-red-500 text-sm">{errors.cep}</p>
            )}
        </div>

        <div>
            <Input
            label="Endereço"
            name="endereco"
            value={hospital.endereco}
            onChange={handleChange}
            />
            {errors.endereco && (
            <p className="text-red-500 text-sm">{errors.endereco}</p>
            )}
        </div>
      </div>

      <div>
        <Input
          label="Número"
          name="numero"
          value={hospital.numero}
          onChange={handleChange}
        />
        {errors.numero && ( <p className="text-red-500 text-sm"> {errors.numero} </p>
        )}
      </div>

      <div>
        <Input
          label="Complemento"
          name="complemento"
          value={hospital.complemento}
          onChange={handleChange}
        />
      </div>

      <div>
        <Input
          label="Cidade"
          name="cidade"
          value={hospital.cidade}
          onChange={handleChange}
        />
        {errors.cidade && ( <p className="text-red-500 text-sm"> {errors.cidade} </p>
        )}
      </div>

      <div>
        <Input
          label="Estado"
          name="estado"
          value={hospital.estado}
          onChange={handleChange}
        />
        {errors.estado && ( <p className="text-red-500 text-sm"> {errors.estado} </p> )}
      </div>

      <div className="col-span-2 mt-6">
        <button
          onClick={handleSubmit}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold"
        >
          {hospitalEmEdicao ? "Atualizar Hospital" : "Cadastrar Hospital"}
        </button>
      </div>

    </div>
    </>
  );
}