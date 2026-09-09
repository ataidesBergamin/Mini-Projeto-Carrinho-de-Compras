import Botao from "../components/Botao";
import { Link, useLocation } from "react-router-dom";

function Sucesso() {
  const location = useLocation();
  // Resgata os produtos do estado da rota (ou assume um array vazio caso não existam)
  const produtos = location.state?.produtos || [];

  return (
    <div>
      <h1>Compra Corfirmada!</h1>
      <h2>Seu pagamento foi aprovado.</h2>
      <h3>Itens da Compra:</h3>
      {produtos.map((produto) => (
        <div
          key={produto.id}
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "10px",
              backgroundColor: "#ffffffee",
              margin: "10px 0px",
              border: "2px solid #069636",
              borderRadius: "10px",
            }}
          >
            <strong>{produto.nome}</strong> - Quantidade: {produto.quantidade}
          </div>
        </div>
      ))}

      <Link to="/carrinho" style={{ textDecoration: "none" }}>
        <Botao>Retornar ao Carrinho</Botao>
      </Link>
    </div>
  );
}
export default Sucesso;
