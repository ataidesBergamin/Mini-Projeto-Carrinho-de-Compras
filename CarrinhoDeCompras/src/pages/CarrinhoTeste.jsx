import { useEffect, useState } from "react";
import ItemCarrinho from "../components/ItemCarrinho";
import ResumoCompra from "../components/ResumoCompra";
import { Link } from "react-router-dom";
import Botao from "../components/Botao";
import "../style/Carrinho.css";

function CarrinhoTeste() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    console.log("1 - Iniciando busca dos produtos...");

    fetch("/data/produtos.js")
      .then((response) => {
        console.log("2 - Resposta recebida:", response);
        console.log("3 - Status:", response.status);
        console.log("4 - OK:", response.ok);

        return response.json();
      })
      .then((dados) => {
        console.log("5 - Dados recebidos:", dados);

        setProdutos(dados);
      })
      .catch((erro) => {
        console.error("6 - ERRO:", erro);
      });
  }, []);

  return (
    <section className="carrinho-conteudo" aria-labelledby="titulo-carrinho">
      <h1 id="titulo-carrinho">Itens no seu carrinho de compras</h1>
      <div className="lista-carrinho">
        {produtos.map((produto) => (
          <ItemCarrinho key={produto.id} produto={produto} />
        ))}
      </div>

      <ResumoCompra produtos={produtos} />

      <div className="carrinho-acoes">
        <Link to="/pagamento">
          <Botao>Ir Para Pagamento</Botao>
        </Link>
      </div>
    </section>
  );
}

export default CarrinhoTeste;
