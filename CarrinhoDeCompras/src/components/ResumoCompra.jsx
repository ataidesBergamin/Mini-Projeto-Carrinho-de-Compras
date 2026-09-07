import produtos from "../data/produtos";

function Total() {
  const total = produtos.reduce((acumulador, produto) => {
    return acumulador + produto.preco * produto.quantidade;
  }, 0);
  return (
    <>
      <div style={{ padding: "20px" }}>
        <div>
          <h3 style={{ margin: "0 0 5px 0", fontSize: "22px" }}>
            {"Total da compra"}
          </h3>
        </div>

        <div style={{ textAlign: "right" }}>
          <span
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#2ecc71",
            }}
          >
            R$ {total.toFixed(2)}
          </span>
        </div>
      </div>
    </>
  );
}
export default Total;
