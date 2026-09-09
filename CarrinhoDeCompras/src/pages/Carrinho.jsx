import ItemCarrinho from "../components/ItemCarrinho";
import ResumoCompra from "../components/ResumoCompra";
import produtos from "../data/produtos";
import Botao from "../components/Botao";
import { Link } from "react-router-dom";

function Carrinho() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Itens no seu Carrinho</h1>

      {produtos.map((produto) => (
        <ItemCarrinho key={produto.id} produto={produto} />
      ))}

      <ResumoCompra produtos={produtos} />

      <Link to="/pagamento" style={{ textDecoration: "none" }}>
        <Botao>Ir Para Pagamento</Botao>
      </Link>
    </div>
  );
}

export default Carrinho;
