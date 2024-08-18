function calcularHepB() {
  let HbSAg = document.getElementById("HbSAg").checked;
  let antiHbS = document.getElementById("antiHbS").checked;
  let antiHbCIgM = document.getElementById("antiHbCIgM").checked;
  let antiHbCIgG = document.getElementById("antiHbCIgG").checked;
  let resultado = document.getElementById("resultadoHepB");
  let infectado = false;
  let imune = false;
  let contatoPrevio = false; 

  resultado.innerHTML = "";
  
  if (antiHbS || antiHbCIgG) {
    contatoPrevio = true;
  }

  if (HbSAg || antiHbCIgM) {
    infectado = true;
  }

  if (antiHbS) {
    imune = true;
  }

  //infectados
  if (infectado) {
    if (imune) {
      resultado.innerHTML = "Combinação de exames impossível, verificar falsos positivos e falsos negativos.";
    } else if (contatoPrevio) {
      resultado.innerHTML = "Paciente infectado novamente, questionar infecção passada com falha de soroconversão.<br>Falsos positivos e negativos?";
    } else {
      resultado.innerHTML = "Paciente recém infectado e não imune.";
    };
    resultado.innerHTML += "<br><br>A hepatite B crônica é defnida pela presença continuada do HBsAg no sangue por um período superior a seis meses.";
  }

  //imunizados
  if (imune && !infectado) {
    if (!antiHbCIgM && !antiHbCIgG) {
      resultado.innerHTML = "Paciente imune por provável vacinação.";
    } else if (antiHbCIgG && antiHbCIgM) {
      resultado.innerHTML = "Paciente imune por infecção prévia em vigência de infecção atual.";
    } else if (antiHbCIgG) {
      resultado.innerHTML = "Paciente imune por infecção prévia.";
    }
  };

  // não infectados e não imunizados
  if (!imune && !infectado) {
    if (contatoPrevio) {
      resultado.innerHTML = "Paciente previamente exposto não soroconvertido.<br>Falsos positivo e negativo?<br>Investigar!";
    }
  }
}
