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
    resultado.innerHTML += "<br><br>Nota:<br>A hepatite B crônica é defnida pela presença continuada do HBsAg no sangue por um período superior a seis meses.";
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

function calcularCPS() {
  let albumina = document.getElementById("cpsAb").value;
  let inr = document.getElementById("cpsInr").value;
  let bilirrubina = document.getElementById("cpsBr").value;
  let ascite = document.getElementById("ascite").value;
  let encefalopatia = document.getElementById("encefalopatia").value;
  let total = 0;
  let resultadoCPS = document.getElementById("resultadoCPS");

  if (bilirrubina < 0 || bilirrubina > 20) { // maior que 20 tb, pelo amor
    resultadoCPS.innerHTML = "Reveja dados!"
    return
  } else if (bilirrubina < 2) {
    total = total + 1 
  } else if (bilirrubina < 3) {
    total = total + 2 
  } else if (bilirrubina > 3) {
    total = total + 3 
  }

  if (albumina > 3.5) {
    total = total + 1 
  } else if (albumina > 2.8) {
    total = total + 2 
  } else if (albumina < 0) {
    resultadoCPS.innerHTML = "Reveja dados!"
    return
  } else if (albumina < 2.8) {
    total = total + 3 
  }

  if (inr < 0) {
    resultadoCPS.innerHTML = "Reveja dados!"
    return
  } else if (inr < 1.7) {
    total = total + 1 
  } else if (inr < 2.3) {
    total = total + 2 
  } else if (inr > 2.3) {
    total = total + 3 
  } 

  if (ascite == 0) {
    total = total + 1 
  } else if (ascite == 1) {
    total = total + 2 
  } else if (ascite == 2) {
    total = total + 3 
  } else {
    resultadoCPS.innerHTML = "Reveja dados!"
    return
  }

  if (encefalopatia == 0) {
    total = total + 1 
  } else if (encefalopatia == 1) {
    total = total + 2 
  } else if (encefalopatia == 2) {
    total = total + 3 
  } else {
    resultadoCPS.innerHTML = "Reveja dados!"
    return
  }

  if (total < 7) {
    resultadoCPS.innerHTML = "Escore total de "+total+" classe A, sobrevida de 100% no primeiro ano, mortalidade peri-cirúrgica de 10% e doença hepática compensada.";
  } else if (total < 10) {
    resultadoCPS.innerHTML = "Escore total de "+total+" classe B, sobrevida de 80% no primeiro ano, mortalidade peri-cirúrgica de 30% e doença hepática compensada. Considerar indicação de transplante.";
  } else if (total > 9) {
    resultadoCPS.innerHTML = "Escore total de "+total+", sobrevida de 45% no primeiro ano, mortalidade peri-cirúrgica de 10% e doença hepática compensada. Expectativa de vida de 1 a 3 anos.";
  }

}
