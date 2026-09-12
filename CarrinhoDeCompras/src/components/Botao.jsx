import "../style/Botao.css";

function Botao({ onClick, children, type = "button", disabled = false }) {
  return (
    <button className="botao" type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default Botao;
