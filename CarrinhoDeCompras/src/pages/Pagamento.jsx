import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Botao from "../components/Botao";
import { usePagamento } from "../hooks/usePagamento.js";
import ResumoCompra from "../components/ResumoCompra.jsx";
import produtos from "../data/produtos";
import "../style/Pagamento.css";
import Cabecalho from "../components/Cabecalho.jsx";

const cartaoSchema = z.object({
  nomeTitular: z
    .string()
    .min(1, "O nome é obrigatório")
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, "O nome deve conter somente letras"),

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
    <>
      <Cabecalho></Cabecalho>
      <main className="pagamento">
        <section className="resumo-pagamento" aria-labelledby="titulo-resumo">
          <h2 id="titulo-resumo">Resumo da Compra</h2>
          <div>
            {produtos.map((produto) => (
              <article key={produto.id} className="item-resumo">
                <strong>{produto.nome}</strong>
                <span> -- Quantidade: {produto.quantidade}</span>
              </article>
            ))}
          </div>
          <ResumoCompra produtos={produtos} />
        </section>
        <section
          className="formulario-pagamento"
          aria-labelledby="titulo-pagamento"
        >
          <h1 id="titulo-pagamento">Cadastro do Cartão de Crédito</h1>
          <form onSubmit={handleSubmit(aoEnviar)}>
            <div className="campo">
              <label htmlFor="nomeTitular">Nome impresso no cartão</label>
              <input
                id="nomeTitular"
                type="text"
                autoComplete="cc-name"
                disabled={processando}
                aria-invalid={errors.nomeTitular ? "true" : "false"}
                aria-describedby={errors.nomeTitular ? "erro-nome" : undefined}
                {...register("nomeTitular", {
                  onChange: (evento) => {
                    let valor = evento.target.value;
                    valor = valor.replace(/[^A-Za-zÀ-ÿ\s]/g, "");
                    evento.target.value = valor;
                  },
                })}
              />
              {errors.nomeTitular && (
                <span id="erro-nome" className="mensagem-erro" role="alert">
                  {errors.nomeTitular.message}
                </span>
              )}
            </div>
            <div className="campo">
              <label htmlFor="numeroCartao">Número do cartão</label>

              <input
                id="numeroCartao"
                type="text"
                inputMode="numeric"
                autoComplete="cc-number"
                maxLength="19"
                disabled={processando}
                aria-invalid={errors.numeroCartao ? "true" : "false"}
                aria-describedby={
                  errors.numeroCartao ? "erro-cartao" : undefined
                }
                {...register("numeroCartao", {
                  setValueAs: (valor) => valor.replace(/\s/g, ""),

                  onChange: (evento) => {
                    let valor = evento.target.value;

                    // Remove tudo que não for número
                    valor = valor.replace(/\D/g, "");

                    // Limita aos 16 dígitos
                    valor = valor.slice(0, 16);

                    // Insere espaço a cada 4 números
                    valor = valor.replace(/(\d{4})(?=\d)/g, "$1 ");

                    evento.target.value = valor;
                  },
                })}
              />

              {errors.numeroCartao && (
                <span id="erro-cartao" className="mensagem-erro" role="alert">
                  {errors.numeroCartao.message}
                </span>
              )}
            </div>

            <div className="dados-cartao">
              <div className="campo">
                <label htmlFor="validade">Validade (MM/AA)</label>

                <input
                  id="validade"
                  type="text"
                  inputMode="numeric"
                  placeholder="12/29"
                  maxLength="5"
                  autoComplete="cc-exp"
                  disabled={processando}
                  aria-invalid={errors.validade ? "true" : "false"}
                  aria-describedby={
                    errors.validade ? "erro-validade" : undefined
                  }
                  {...register("validade")}
                />

                {errors.validade && (
                  <span
                    id="erro-validade"
                    className="mensagem-erro"
                    role="alert"
                  >
                    {errors.validade.message}
                  </span>
                )}
              </div>

              <div className="campo">
                <label htmlFor="cvv">CVV</label>

                <input
                  id="cvv"
                  type="text"
                  inputMode="numeric"
                  maxLength="3"
                  autoComplete="cc-csc"
                  disabled={processando}
                  aria-invalid={errors.cvv ? "true" : "false"}
                  aria-describedby={errors.cvv ? "erro-cvv" : undefined}
                  {...register("cvv")}
                />

                {errors.cvv && (
                  <span id="erro-cvv" className="mensagem-erro" role="alert">
                    {errors.cvv.message}
                  </span>
                )}
              </div>
            </div>

            <Botao type="submit" disabled={processando}>
              {processando ? "Processando Pagamento..." : "Pagar Agora"}
            </Botao>
          </form>
        </section>
      </main>
    </>
  );
}

export default Pagamento;
