import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMaskInput } from "react-imask";

import { Toast } from "../Toast/Toast";
import { useToast } from "../../hooks/useToast";
import { useDoadores } from "../../context/DoadorContext";
import { useAgendamentos } from "../../context/AgendamentoContext";

import type { Agendamento } from "../../types/Agendamento";

export function AgendarDoacaoForm() {
  const {
    addAgendamento,
    atualizarAgendamento,
    agendamentoEmEdicao,
    setAgendamentoEmEdicao,
  } = useAgendamentos();

  const { doadores } = useDoadores();

  const navigate = useNavigate();
  const { toast, showToast } = useToast();

  const [cpf, setCpf] = useState("");

  const [agendamento, setAgendamento] = useState<Agendamento>({
    id: "",
    doadorId: "",
    data: "",
    horario: "",
    observacao: "",
    status: "Agendada",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const hoje = new Date().toISOString().split("T")[0];

  const doadorEncontrado = doadores.find((d) => d.cpf === cpf);

  useEffect(() => {
    if (agendamentoEmEdicao) {
      setAgendamento(agendamentoEmEdicao);

      const doador = doadores.find(
        (d) => d.id === agendamentoEmEdicao.doadorId
      );

      if (doador) {
        setCpf(doador.cpf);
      }
    }
  }, [agendamentoEmEdicao, doadores]);

  function validateField(name: string, value: any) {
    let message = "";

    switch (name) {
      case "data":
        if (!value) message = "Informe uma data";
        else if (value < hoje) message = "Data não pode ser anterior à atual";
        break;

      case "horario": if (!value) message = "Informe um horário"; break;
      case "observacao": break;
    }

    setErrors((prev) => ({...prev, [name]: message,}));
  }

  function validateAll() {
    const newErrors: Record<string, string> = {};

    if (!doadorEncontrado) {
      newErrors.doadorId = "Doador não encontrado";
    }

    if (!agendamento.data) {
      newErrors.data = "Informe uma data";
    } else if (agendamento.data < hoje) {
      newErrors.data = "Data não pode ser anterior à atual";
    }

    if (!agendamento.horario) {
      newErrors.horario = "Informe um horário";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;

    setAgendamento((prev) => ({...prev, [name]: value, }));

    validateField(name, value);
  }

  function handleSubmit() {
    if (!validateAll() || !doadorEncontrado) return;

    const dadosAgendamento: Agendamento = {...agendamento, doadorId: doadorEncontrado.id, };

    if (agendamentoEmEdicao) {
      atualizarAgendamento(agendamentoEmEdicao.id, dadosAgendamento);

      setAgendamentoEmEdicao(null);

      showToast("Agendamento atualizado com sucesso!", "success", 4000);
    } else {
      addAgendamento({...dadosAgendamento, id: crypto.randomUUID(),});
      showToast("Doação agendada com sucesso!", "success", 4000);
    }

    setTimeout(() => { navigate("/agendamentos"); }, 1200);
  }

  return (
    <>
      {toast && ( <Toast message={toast.message} type={toast.type} duration={toast.duration} /> )}

      <div className="grid gap-4">
        <div>
          <label className="font-medium">CPF do Doador</label>

          <IMaskInput
            mask="000.000.000-00"
            value={cpf}
            onAccept={(value) => setCpf(value)}
            className="border border-gray-300 p-3 rounded-xl w-full"
          />
          {errors.doadorId && ( <p className="text-red-500 text-sm">{errors.doadorId}</p> )}
        </div>

        {cpf.length === 14 && (
          <>
            {doadorEncontrado ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="font-semibold text-green-700 mb-2"> Doador encontrado </p>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-gray-500 text-sm">Nome</span>
                    <p className="font-medium">{doadorEncontrado.nome}</p>
                  </div>

                  <div>
                    <span className="text-gray-500 text-sm">Tipo Sanguíneo</span>
                    <p className="font-medium"> {doadorEncontrado.tipoSanguineo} {doadorEncontrado.fatorRh} </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <p className="font-semibold text-yellow-700 mb-3"> Doador não encontrado </p>

                <button
                  type="button"
                  onClick={() => navigate("/cadastro-doador")}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg" >
                  Cadastrar Novo Doador
                </button>
              </div>
            )}
          </>
        )}

        {doadorEncontrado && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-medium">Data da Doação</label>

                <input
                  type="date"
                  name="data"
                  min={hoje}
                  value={agendamento.data}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-xl w-full"
                />
                {errors.data && ( <p className="text-red-500 text-sm">{errors.data}</p> )}
              </div>

              <div>
                <label className="font-medium">Horário</label>

                <input
                  type="time"
                  name="horario"
                  value={agendamento.horario}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-xl w-full"
                />
                {errors.horario && ( <p className="text-red-500 text-sm">{errors.horario}</p> )}
              </div>
            </div>

            <div>
              <label className="font-medium">Observação</label>

              <textarea
                name="observacao"
                value={agendamento.observacao}
                onChange={handleChange}
                rows={4}
                className="border border-gray-300 p-3 rounded-xl w-full"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold" >
              {agendamentoEmEdicao ? "Atualizar Agendamento" : "Agendar Doação"}
            </button>
          </>
        )}
      </div>
    </>
  );
}