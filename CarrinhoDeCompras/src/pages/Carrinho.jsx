import "../style/Carrinho.css";
import ItemCarrinho from "../components/ItemCarrinho";
import ResumoCompra from "../components/ResumoCompra";
import produtos from "../data/produtos";
import Botao from "../components/Botao";
import { Link } from "react-router-dom";
import Cabecalho from "../components/Cabecalho";

function Carrinho() {
  return (
    <main className="carrinho">
      <Cabecalho></Cabecalho>
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
    </main>
  );
}

export default Carrinho;
