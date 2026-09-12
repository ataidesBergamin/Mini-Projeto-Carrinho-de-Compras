import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validarSegurancaCartao } from "../utils/pagamento";
import produtos from "../data/produtos";

export function usePagamento() {
  const [processando, setProcessando] = useState(false);
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  const processarPagamento = async (dadosCartao) => {
    setProcessando(true);
    setErro(null);

    try {
      const respostaApi = await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Aqui gera um ID de pedido fake
          const pedidoIdFake = Math.floor(Math.random() * 90000) + 10000;

          if (!validarSegurancaCartao(dadosCartao.numeroCartao)) {
            reject(
              new Error("Transação recusada: tentativa de golpe detectada."),
            );
          } else {
            resolve({ sucesso: true, id: pedidoIdFake });
          }
        }, 2000);
      });

      // Se a Promise resolveu com sucesso, manda para a rota dinâmica de sucesso
      // No momento do sucesso, envie o 'state' com os produtos
      navigate(`/sucesso/${respostaApi.id}`, { state: { produtos: produtos } });
    } catch (err) {
      setErro(err.message);

      // Manda o usuário para a rota dinâmica de falha
      const tentativaId = Math.floor(Math.random() * 90000) + 10000;
      navigate(`/falha/${tentativaId}`);
    } finally {
      // Desativa o estado de carregamento independente de ter dado certo ou errado
      setProcessando(false);
    }
  };

  return {
    processarPagamento,
    processando,
    erro,
  };
}
