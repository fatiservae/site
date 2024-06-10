function calcular(){
  let idade = parseFloat(document.getElementById("idade").value);
  let tonsilas = document.getElementById("tonsilas").value;
  let tosse = false;
  let linfonodomegalia = false;
  let resultado2 = document.getElementById("resultado2");

  if (document.getElementById("tosse").checked) {
    tosse = true 
  }

  if (document.getElementById("linfonodomegalia").checked) {
    linfonodomegalia = true 
  }

  cantor = 0; 

  if (idade > 2 && idade < 15) {
    cantor = cantor + 1 ;
  } else if (idade > 44) {
    cantor = cantor - 1 ;
  }

  if (tonsilas == "anormal") {
    cantor = cantor + 1 ;
  }
  
  if (linfonodomegalia == true ) {
    cantor = cantor + 1 ;
  } 

  if (tosse == false ) {
    cantor = cantor + 1 ;
  }

  console.log(idade, tonsilas, tosse, cantor);

  if (cantor > 2) {
    resultado.innerText = "Inicie profilaxia";
  } else {
    resultado.innerText = "Desnecessário profilaxia";
  }
}

function calcularJones() {
  let maiores = 0 ;
  let menores = 0 ;
  let evidencia = false ;

  let resultado2 = document.getElementById("resultado2");
  let riscoAlto = document.getElementById("riscoAlto");
  let monoartrite  = document.getElementById("monoartrite");
  let poliartrite  = document.getElementById("poliartrite");
  let coreia  = document.getElementById("coreia");
  let cardite = document.getElementById("cardite");
  let nodulos = document.getElementById("nodulos");
  let eritema = document.getElementById("eritema");
  let febre  = document.getElementById("febre");
  let ecg  = document.getElementById("ecg");
  let vhs = document.getElementById("vhs").value ;
  let pcr = document.getElementById("pcr").value ;
  let cultura  = document.getElementById("cultura");
  let titulos = document.getElementById("titulos");
  let altorisco = false;

    if (riscoAlto.checked) { altorisco = true };

    if (altorisco) {
      if (monoartrite.checked ) { 
        maiores = maiores + 1
      }
      if (poliartrite.checked ) { 
        maiores = maiores + 1
      }
      if (poliartralgia.checked ) { 
        maiores = maiores + 1
      };
    } else if (poliartrite.checked) {
        maiores = maiores + 1 
    }

    if (coreia.checked ) { 
        maiores = maiores + 1
    }
    if (nodulos.checked ) { 
        maiores = maiores + 1
    }
    if (eritema.checked ) { 
        maiores = maiores + 1
    }
    if (cardite.checked ) { 
        maiores = maiores + 1
    }

    if (poliartralgia.checked) {
        menores = menores + 1
    }

    if (febre.checked ) { 
        menores = menores + 1
    }

    if (ecg.checked) { 
        menores = menores + 1
    };

    if (pcr > 2.99) {
      menores = menores + 1 
    } else if (vhs > 59) {
      menores = menores + 1 
    } else if (vhs > 29) {
        if (riscoAlto) {
          menores = menores + 1 
        }
    }

    if (cultura.checked || titulos.checked) { 
      evidencia = true 
    };

    if ((maiores > 1) || (maiores > 0 && menores > 1 && evidencia )) {
      resultado2.innerText = "Indicado tratamento considerando febre reumática.";
    } else {
      resultado2.innerText = "Não indicado tratar.";
    }

    console.log(maiores, menores, evidencia)
}
