import ItemCarrinho from "../components/ItemCarrinho";
import ResumoCompra from "../components/ResumoCompra";
import produtos from "../data/produtos";

function Carrinho() {
  return (
    <>
      <h2>Itens no seu Carrinho</h2>

      {produtos.map((produto) => (
        <ItemCarrinho key={produto.id} produto={produto} />
      ))}
      <ResumoCompra produtos={produtos} />
    </>
  );
}

export default Carrinho;
