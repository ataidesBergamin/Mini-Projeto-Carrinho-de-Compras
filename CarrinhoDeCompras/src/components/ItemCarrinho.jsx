import "../style/ItemCarrinho.css";

function ItemCarrinho({ produto }) {
  const subtotal = produto.preco * produto.quantidade;

  return (
    <article className="item-carrinho">
      <div className="itens-conteiner">
        <div className="conteiner-img">
          <img src={produto.img} alt={`Imagem ${produto.nome}`} />
        </div>
        <div className="item-carrinho-info">
          <h2>{produto.nome}</h2>
          <p>
            <span>Quantidade: </span>
            {produto.quantidade}
          </p>
        </div>
      </div>
      <div className="item-carrinho-valores">
        <p>
          <span>Preço unitário:</span>{" "}
          {produto.preco.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>

        <p>
          <span>Subtotal:</span>{" "}
          {subtotal.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </div>
    </article>
  );
}

export default ItemCarrinho;
