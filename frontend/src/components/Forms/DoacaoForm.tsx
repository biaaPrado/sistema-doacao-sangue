import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMaskInput } from "react-imask";
import { useDoadores } from "../../context/DoadorContext";
import { useEstoque } from "../../context/EstoqueContext";
import { useToast } from "../../hooks/useToast";
import { Toast } from "../Toast/Toast";

import type { Doacao } from "../../types/Doacao";

export function DoacaoForm() {
  const {doadores, registrarDoacao } = useDoadores();
  const navigate = useNavigate();
  const { adicionarBolsa } = useEstoque();
  const { toast, showToast } = useToast();

  const [cpf, setCpf] = useState("");
  const [form, setForm] = useState({
    data: "",
    volume: 450,
    observacao: "",
    voluntaria: true,
    receptor: ""
  });

  const doadorEncontrado = doadores.find((d) => d.cpf === cpf);

  function calcularValidade(dataColeta: string) {
    const data = new Date(dataColeta);
    data.setDate(data.getDate() + 42);

    return data.toISOString().split("T")[0];
  }

  function handleSubmit() {
    if (!doadorEncontrado) return;

    const novaDoacao: Doacao = {
      id: crypto.randomUUID(),
      doadorId: doadorEncontrado.id,
      data: form.data,
      volume: form.volume,
      observacao: form.observacao,
      voluntaria: form.voluntaria,
      receptor: form.receptor,
    };

    registrarDoacao(cpf, novaDoacao);

    adicionarBolsa({
      id: crypto.randomUUID(),
      tipoSanguineo: doadorEncontrado.tipoSanguineo + doadorEncontrado.fatorRh,
      dataColeta: novaDoacao.data,
      dataValidade: calcularValidade(novaDoacao.data),
      volume: novaDoacao.volume,
      disponivel: true
    });

    showToast("Doação registrada com sucesso!", "success", 5000);
    setTimeout(() => { navigate("/doacoes"); }, 5000);
  }

  return (
  <>
    {toast && ( <Toast message={toast.message} type={toast.type} duration={toast.duration} /> )}

    <div className="grid gap-4">
      <div>
        <label className="font-medium"> CPF do Doador </label>

        <IMaskInput
          mask="000.000.000-00"
          value={cpf}
          onAccept={(value) => setCpf(value)}
          className="border border-gray-300 p-3 rounded-xl w-full"
        />
      </div>

      {cpf.length === 14 && (
      <>
        {doadorEncontrado ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="font-semibold text-green-700 mb-2"> Doador encontrado </p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-gray-500 text-sm"> Nome </span>
                <p className="font-medium"> {doadorEncontrado.nome} </p>
              </div>

              <div>
                <span className="text-gray-500 text-sm"> Tipo Sanguíneo </span>
                <p className="font-medium"> {doadorEncontrado.tipoSanguineo}{doadorEncontrado.fatorRh} </p>
              </div>

              <div>
                <span className="text-gray-500 text-sm"> Peso </span>
                <p className="font-medium"> {doadorEncontrado.peso} kg </p>
              </div>

              <div>
                <span className="text-gray-500 text-sm"> Telefone </span>
                <p className="font-medium"> {doadorEncontrado.telefone} </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <p className="font-semibold text-yellow-700 mb-3"> Doador não encontrado </p>

            <button
              onClick={() => navigate("/cadastro-doador")}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"> 
              Cadastrar Novo Doador
            </button>
          </div>
        )}
      </> )}

      {doadorEncontrado && (
      <>
        <div>
          <label className="font-medium"> Data da Doação </label>

          <input
            type="date"
            className="border border-gray-300 p-3 rounded-xl w-full"
            value={form.data}
            onChange={(e) => setForm({ ...form, data: e.target.value })}
          />
        </div>

        

        <div>
          <label className="font-medium"> Volume Coletado (ml) </label>

          <input
            type="number"
            className="border border-gray-300 p-3 rounded-xl w-full"
            value={form.volume}
            onChange={(e) => setForm({ ...form, volume: Number(e.target.value) }) }
          />
        </div>

        <div>
          <label className="font-medium block mb-2"> Doação Voluntária? </label>

          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={form.voluntaria}
                onChange={() => setForm({ ...form, voluntaria: true, receptor: "" }) }
              /> Sim
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={!form.voluntaria}
                onChange={() => setForm({...form, voluntaria: false}) }
              /> Não
            </label>
          </div>

          {!form.voluntaria && (
            <div>
              <label className="font-medium block my-2"> Nome do Receptor </label>

              <input
                className="border border-gray-300 p-3 rounded-xl w-full"
                value={form.receptor}
                onChange={(e) => setForm({...form, receptor: e.target.value }) }
                placeholder="Informe o nome do receptor"
              />
            </div>
          )}
        </div>

        <div>
          <label className="font-medium"> Observações </label>
          <textarea
            rows={4}
            className="border border-gray-300 p-3 rounded-xl w-full"
            value={form.observacao}
            onChange={(e) => setForm({...form, observacao: e.target.value}) }
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold" > 
          Registrar Doação
        </button>
      </> )}
    </div>
  </> 
  );
}