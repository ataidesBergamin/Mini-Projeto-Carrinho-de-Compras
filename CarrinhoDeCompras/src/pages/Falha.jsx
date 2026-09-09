import { Link } from "react-router-dom";
import AlertaGolpe from "../components/AlertaGolpe";
import Botao from "../components/Botao";

function Falha() {
  return (
    <>
      <h1>tentativa de golpe</h1>
      <AlertaGolpe
        tipo="vermelho"
        mensagem="Possível tentativa de golpe detectada!"
      />
      <Link to="/pagamento" style={{ textDecoration: "none" }}>
        <Botao>Retornar ao Pagamento</Botao>
      </Link>
    </>
  );
}
export default Falha;
