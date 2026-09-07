export const validarSegurancaCartao = (numeroCartao) => {
  // Regex que verifica se o primeiro dígito (\d) se repete até o final da string (15 vezes)
  const regexNumerosRepetidos = /^(\d)\1{15}$/;

  if (regexNumerosRepetidos.test(numeroCartao)) {
    return false;
  }

  return true;
};
