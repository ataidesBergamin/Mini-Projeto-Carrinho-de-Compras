import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Botao from "../components/Botao";
import { usePagamento } from "../hooks/usePagamento.js";

const cartaoSchema = z.object({
  nomeTitular: z
    .string()
    .min(1, "O nome é obrigatório")
    .min(3, "O nome deve ter pelo menos 3 caracteres"),

  numeroCartao: z
    .string()
    .min(1, "O número do cartão é obrigatório")
    .regex(/^[0-9]{16}$/, "Insira exatamente 16 dígitos numéricos"),

  validade: z
    .string()
    .min(1, "A validade é obrigatória")
    .regex(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, "Formato inválido (use MM/AA)"),

  cvv: z
    .string()
    .min(1, "O CVV é obrigatório")
    .regex(/^[0-9]{3}$/, "O CVV deve ter 3 dígitos numéricos"),
});

function Pagamento() {
  const { processarPagamento, processando } = usePagamento();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(cartaoSchema),
  });

  const aoEnviar = (dados) => {
    processarPagamento(dados);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2>Cadastro do Cartão de Crédito</h2>

      <form
        onSubmit={handleSubmit(aoEnviar)}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>Nome Impresso no Cartão</label>
          <input
            type="text"
            disabled={processando}
            {...register("nomeTitular")}
          />
          {errors.nomeTitular && (
            <span style={{ color: "red", fontSize: "12px" }}>
              {errors.nomeTitular.message}
            </span>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>Número do Cartão</label>
          <input
            type="text"
            maxLength="16"
            disabled={processando}
            {...register("numeroCartao")}
          />
          {errors.numeroCartao && (
            <span style={{ color: "red", fontSize: "12px" }}>
              {errors.numeroCartao.message}
            </span>
          )}
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <label>Validade (MM/AA)</label>
            <input
              type="text"
              placeholder="12/29"
              maxLength="5"
              disabled={processando}
              {...register("validade")}
            />
            {errors.validade && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {errors.validade.message}
              </span>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <label>CVV</label>
            <input
              type="text"
              maxLength="3"
              disabled={processando}
              {...register("cvv")}
            />
            {errors.cvv && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {errors.cvv.message}
              </span>
            )}
          </div>
        </div>

        <Botao type="submit" disabled={processando}>
          {processando ? "Processando Pagamento..." : "Pagar Agora"}
        </Botao>
      </form>
    </div>
  );
}

export default Pagamento;
