import "../style/Falha.css";
import { Link } from "react-router-dom";
import AlertaGolpe from "../components/AlertaGolpe";
import Botao from "../components/Botao";

function Falha() {
  return (
    <main className="falha">
      <section className="falha-conteudo" aria-labelledby="titulo-falha">
        <h1 id="titulo-falha">tentativa de golpe</h1>
        <AlertaGolpe
          tipo="amarelo" /* Pode ser alterado para tipo "vermelho" */
          mensagem="Possível tentativa de golpe detectada!"
        />
        <div className="falha-acoes">
          <Link to="/pagamento">
            <Botao>Retornar ao Pagamento</Botao>
          </Link>
        </div>
      </section>
    </main>
  );
}
export default Falha;
