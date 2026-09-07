import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Botao from "../components/Botao";
import { validarSegurancaCartao } from "../utils/pagamento";

const cartaoSchema = z.object({
  nomeTitular: z
    .string()
    .min(1, "O nome é obrigatório")
    .min(3, "O nome deve ter pelo menos 3 caracteres"),

  numeroCartao: z
    .string()
    .min(1, "O número do cartão é obrigatório")
    .regex(/^[0-9]{16}$/, "Insira exatamente 16 dígitos numéricos")
    .refine((val) => validarSegurancaCartao(val), {
      message: "Transação recusada: tentativa de golpe detectada.",
    }),

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
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(cartaoSchema),
  });

  // Função disparada apenas se todos os campos passarem na validação
  const aoEnviar = (dados) => {
    console.log("Dados do Cartão Enviados:", dados);

    // Simula uma resposta de sucesso da API e gera um ID de pedido fake
    const pedidoIdFake = Math.floor(Math.random() * 90000) + 10000;

    navigate(`/sucesso/${pedidoIdFake}`);
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
            {...register("nomeTitular", { required: "O nome é obrigatório" })}
          />
          {errors.nomeTitular && (
            <span style={{ color: "red", fontSize: "12px" }}>
              {errors.nomeTitular.message}
            </span>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>Número do Cartão</label>
          <input type="text" maxLength="16" {...register("numeroCartao")} />
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
            <input type="text" maxLength="3" {...register("cvv")} />
            {errors.cvv && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {errors.cvv.message}
              </span>
            )}
          </div>
        </div>

        <Botao type="submit">Pagar Agora</Botao>
      </form>
    </div>
  );
}

export default Pagamento;
