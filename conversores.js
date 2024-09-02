function converta() {
  let entradaGrandeza;
  let entradaUnidades = document.getElementById("inputConverter").value;
  let saidaUnidades = document.getElementById("outputConverter").value;
  let resultado = document.getElementById("resultadoConverter");
  let valorInput = document.getElementById("inputValor").value; 
  
  switch (entradaUnidades) {
    case 'minutos':
      entradaGrandeza = "tempo";
      if (valorInput.includes(":")) {
        const valores = valorInput.split(":");
        let valorFinal = 0;
        for (let i = 0; i < valores.length; i++) {
          if (i == 0 ) {
             //console.log(valores[i]);
             valorFinal = Number(valores[0]);
             //console.log(valorFinal);
          } else if (i == 1 ) {
             valorFinal += Number(valores[i])/60; // considerar 60 exponencial a i para mais precisao
             //console.log(valores[i]);
          } else if (i == 2 ) {
             console.log("terceiro valor"+valores[i]);
             valorFinal += Number(valores[i])/3600000;
          } else {
             resultado.innerHTML = "Valores incompatíveis";
             return
          }
        //console.log(valorFinal);
        }
      valorInput = valorFinal.toFixed(4);
        // recusar se mais de um :
      } 
    break;
    default:
      entradaGrandeza = "nenhuma";
  }
 
  switch (entradaGrandeza) {
    case "tempo":
      switch (saidaUnidades) {
        case 'minutos':
          resultado.innerHTML = valorInput+"min";
        break;
        case 'horas':
          if (entradaGrandeza != "tempo") {
            resultado.innerHTML = "Grandezas incompatíveis";
          }
        break;
        default:
          resultado.innerHTML = "defina";
      }
    break;
    case 'distancia':
    break;
    default:
  }
}

document.getElementById("botao-copiar").style.display = 'block';
const botaoCopiar = document.getElementById('botao-copiar');
const paragrafo = document.getElementById('resultadoConverter');
botaoCopiar.addEventListener('click', () => {
  const textoParaCopiar = paragrafo.textContent;
  navigator.clipboard.writeText(textoParaCopiar);
  //alert('Texto copiado para a área de transferência!');
});
