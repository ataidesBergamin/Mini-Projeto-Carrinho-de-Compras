import "../style/Sucesso.css";
import Botao from "../components/Botao";
import { Link, useLocation } from "react-router-dom";
import Cabecalho from "../components/Cabecalho";

function Sucesso() {
  const location = useLocation();
  // Resgata os produtos do estado da rota (ou assume um array vazio caso não existam)
  const produtos = location.state?.produtos || [];

  return (
    <main className="sucesso">
      <Cabecalho></Cabecalho>
      <section className="sucesso-conteudo" aria-labelledby="titulo-sucesso">
        <h1 id="titulo-sucesso">Compra Corfirmada!</h1>
        <h2>Seu pagamento foi aprovado.</h2>
        <h3>Itens da Compra:</h3>
        <div className="itens-sucesso">
          {produtos.map((produto) => (
            <article key={produto.id} className="item-sucesso">
              <strong>{produto.nome}</strong>
              <span>Quantidade: {produto.quantidade}</span>
            </article>
          ))}
        </div>
        <div className="sucesso-acoes">
          <Link to="/carrinho">
            <Botao>Retornar ao Carrinho</Botao>
          </Link>
        </div>
      </section>
    </main>
  );
}
export default Sucesso;
