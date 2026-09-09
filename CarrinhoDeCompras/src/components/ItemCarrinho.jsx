function ItemCarrinho({ produto }) {
  return (
    <div style={{ padding: "10px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div
          key={produto.id}
          style={{
            border: "1px solid #00c13d",
            borderRadius: "8px",
            padding: "10px",
            backgroundColor: "#f0e8e8",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <h3 style={{ margin: "0 0 5px 0", fontSize: "18px" }}>
              {produto.nome}
            </h3>
            <p style={{ margin: 0, color: "#666" }}>
              Quantidade: {produto.quantidade}
            </p>
          </div>

          <div style={{ textAlign: "right" }}>
            <span
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#7d7f79",
              }}
            >
              R$ {produto.preco.toFixed(2)}
            </span>
            <p
              style={{
                margin: "5px 0 0 0",
                fontSize: "12px",
                color: "#0dc340",
              }}
            >
              Subtotal: R$ {(produto.preco * produto.quantidade).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemCarrinho;
