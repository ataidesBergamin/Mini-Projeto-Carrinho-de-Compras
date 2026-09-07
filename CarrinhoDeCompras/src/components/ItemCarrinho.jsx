import produtos from "../data/produtos";

function Itens() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Itens no seu Carrinho</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {produtos.map((produto) => (
          <div
            key={produto.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              backgroundColor: "#f9f9f9",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
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
                  color: "#2ecc71",
                }}
              >
                R$ {produto.preco.toFixed(2)}
              </span>
              <p
                style={{ margin: "5px 0 0 0", fontSize: "12px", color: "#999" }}
              >
                Subtotal: R$ {(produto.preco * produto.quantidade).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Itens;
