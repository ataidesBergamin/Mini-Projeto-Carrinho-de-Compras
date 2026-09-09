import "./AlertaGolpe.css";

function AlertaGolpe({
  tipo = "vermelho",
  mensagem = "Possível tentativa de golpe detectada!",
}) {
  return (
    <div className={`alerta-container ${tipo}`}>
      <div className="alerta-icone">
        <div className="triangulo">
          <span className="exclamacao">!</span>
        </div>
      </div>

      <div className="alerta-texto">
        <h2>⚠️ ALERTA DE SEGURANÇA</h2>

        <p>{mensagem}</p>

        <span className="aviso">
          Retorne ao pagamento e tente usar outro cartão.
        </span>
      </div>
    </div>
  );
}

export default AlertaGolpe;
