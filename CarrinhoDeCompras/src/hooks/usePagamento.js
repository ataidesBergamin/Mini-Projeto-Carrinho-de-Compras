import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validarSegurancaCartao } from "../utils/pagamento";

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
          // Aqui geramos um ID de pedido fake
          const pedidoIdFake = Math.floor(Math.random() * 90000) + 10000;

          if (!validarSegurancaCartao(dadosCartao.numeroCartao)) {
            reject(
              new Error("Transação recusada: tentativa de golpe detectada."),
            );
            // Simulação: se o CVV for "999", simulamos uma falha do banco para testes
          } else if (dadosCartao.cvv === "999") {
            reject(
              new Error("Saldo insuficiente ou cartão bloqueado pelo banco."),
            );
          } else {
            resolve({ sucesso: true, id: pedidoIdFake });
          }
        }, 2000);
      });

      // Se a Promise resolveu com sucesso, manda para a rota dinâmica de sucesso
      navigate(`/sucesso/${respostaApi.id}`);
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
