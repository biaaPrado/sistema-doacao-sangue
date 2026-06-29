import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import { usePedidos } from "../../context/PedidoContext";
import { useHospitais } from "../../context/HospitalContext";
import { Toast } from "../Toast/Toast";

import type { PedidoSangue } from "../../types/PedidoSangue";

export function PedidoForm() {
    const navigate = useNavigate();
    const { toast, showToast } = useToast();
    const { hospitais } = useHospitais();
    
    const {
        addPedido,
        atualizarPedido,
        pedidoEmEdicao,
        setPedidoEmEdicao,
    } = usePedidos();
    
    const [pedido, setPedido] = useState<PedidoSangue>({
      id: "",
      hospitalId: "",
      dataPedido: new Date().toISOString().split("T")[0],
      tipoSanguineo: "",
      fatorRh: "+",
      quantidadeBolsas: 1,
      prioridade: "Baixa",
      status: "Pendente",
      observacoes: "",
    });
    
    const [errors, setErrors] = useState<Record<string, string>>({});
    
    useEffect(() => { if (pedidoEmEdicao) { setPedido(pedidoEmEdicao); }}, [pedidoEmEdicao]);
    
    function handleChange(
        e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLSelectElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) {
        const { name, value } = e.target;
        
        setPedido((prev) => ({...prev, [name]: name === "quantidadeBolsas" ? Number(value) : value,}));
        setErrors((prev) => ({...prev, [name]: "",}));
    }
    
    function validate() {
        const newErrors: Record<string, string> = {};
        
        if (!pedido.hospitalId) newErrors.hospitalId = "Selecione um hospital";
        if (!pedido.tipoSanguineo) newErrors.tipoSanguineo = "Selecione um Tipo Sanguíneo";
        if (!pedido.fatorRh) newErrors.fatorRh = "Selecione o fator";
        if (pedido.quantidadeBolsas <= 0) newErrors.quantidadeBolsas = "Quantidade inválida";
        if (!pedido.prioridade) newErrors.prioridade = "Selecione uma prioridade";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }
    
    function handleSubmit() {
        if (!validate()) return;
        if (pedidoEmEdicao) { 
            atualizarPedido(pedidoEmEdicao.id, pedido);
            setPedidoEmEdicao(null);
            showToast("Pedido atualizado com sucesso!", "success", 5000);
        } else {
            addPedido({...pedido, id: crypto.randomUUID(),});
            showToast("Pedido registrado com sucesso!", "success", 5000);
        }
        setTimeout(() => { navigate("/pedidos"); }, 1500);
    }
    
    return (
    <>
        {toast && (<Toast message={toast.message} type={toast.type} duration={toast.duration} /> )}
        
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="font-medium text-gray-700"> Hospital </label>
                <select
                    name="hospitalId"
                    value={pedido.hospitalId}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-xl w-full" >
                    
                    <option value=""> Selecione </option>
                    {hospitais.map((hospital) => ( <option key={hospital.id} value={hospital.id} > {hospital.nome} </option> ))}
                </select>
                
                {errors.hospitalId && ( <p className="text-red-500 text-sm"> {errors.hospitalId} </p> )}
            </div>

            <div>
                <label className="font-medium text-gray-700"> Tipo Sanguíneo </label>
                <select
                    name="tipoSanguineo"
                    value={pedido.tipoSanguineo}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-xl w-full" >
                    
                    <option value="">Selecione</option> 
                    <option value="A">A</option> <option value="B">B</option> <option value="AB">AB</option> <option value="O">O</option>
                </select>
                {errors.tipoSanguineo && ( <p className="text-red-500 text-sm"> {errors.tipoSanguineo} </p> )}
            </div>

            <div>
                <label className="font-medium text-gray-700"> Fator RH </label>
                <select
                    name="fatorRh"
                    value={pedido.fatorRh}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-xl w-full" >
                    
                    <option value="">Selecione</option> 
                    <option value="+">+</option> <option value="-">-</option>
                </select>
                {errors.fatorRh && ( <p className="text-red-500 text-sm"> {errors.fatorRh} </p> )}
            </div>

            <div>
                <label className="font-medium text-gray-700"> Quantidade de Bolsas </label>
                
                <div className="flex items-center justify-between border border-gray-300 rounded-xl p-2">
                    <button
                        type="button"
                        onClick={() => setPedido((prev) => ({...prev, quantidadeBolsas: Math.max(1, prev.quantidadeBolsas - 1), }))}
                        className="w-8 h-8 bg-gray-300 rounded-lg text-gray-700" > -
                    </button>
                    
                    <span className="text-md"> {pedido.quantidadeBolsas} </span>
                    
                    <button
                        type="button"
                        onClick={() => setPedido((prev) => ({...prev, quantidadeBolsas: prev.quantidadeBolsas + 1, }))}
                        className="w-8 h-8 bg-gray-300 rounded-lg text-gray-700" > +
                    </button>
                </div>
            </div>
            
            <div>
                <label className="font-medium text-gray-700"> Prioridade </label>

                <div className="flex gap-2 mt-2 flex-wrap">
                    {["Baixa", "Média", "Alta", "Urgente"].map((p) => (
                        <button
                            key={p}
                            type="button"
                            onClick={() => setPedido((prev) => ({ ...prev, prioridade: p as any })) }
                            className={`px-3 py-1 rounded-xl border text-md transition
                                ${ pedido.prioridade === p ? "bg-red-600 border-red-500 text-white" : "bg-grey-700 border-gray-300 text-gray-900" }`} > 
                            {p}
                        </button>
                    ))}
                    {errors.prioridade && <p className="text-red-500 text-sm"> {errors.prioridade} </p>}
                </div>
            </div>

            <div className="col-span-2">
                <label className="font-medium text-gray-700"> Observações </label>

                <textarea
                    name="observacoes"
                    value={pedido.observacoes}
                    onChange={handleChange}
                    rows={4}
                    className="border border-gray-300 p-3 rounded-xl w-full" 
                />
            </div>

            <div className="col-span-2">
                <button
                    onClick={handleSubmit}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold" >
                    {pedidoEmEdicao ? "Atualizar Pedido" : "Registrar Pedido"}
                </button>
            </div>
        </div>
    </>
    );
}