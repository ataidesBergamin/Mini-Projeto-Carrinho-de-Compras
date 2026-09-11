import "./ResumoCompra.css";

function ResumoCompra({ produtos }) {
  const total = produtos.reduce((acumulador, produto) => {
    return acumulador + produto.preco * produto.quantidade;
  }, 0);
  return (
    <section className="resumo-compra" aria-labelledby="titulo-total">
      <h3 id="titulo-total">Total da compra</h3>

      <span className="valor-total">
        R$ {total.toFixed(2).replace(".", ",")}
      </span>
    </section>
  );
}
export default ResumoCompra;
