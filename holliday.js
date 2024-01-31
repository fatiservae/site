// Ringer Eurofarma
//Conteúdo Eletrolítico:
// Sódio 130,00mEq/L
// Potássio 4,0 mEq/L
// Cálcio 2,7 mEq/L
// Cloreto 109,0 mEq/L
// Lactato 27,0 mEq/L
//
//
function holliday() {
  const fluidoPrincipal = document.getElementById("fluidoPrincipal").value;
  const qteSodio = document.getElementById("qteSodioAmpola").value;
  const TipoAmpolaPotassio = document.getElementById("potassioAmpola").value;
  const massa = document.getElementById("massa").value;
  const volumeAmpNa = document.getElementById("VolumeSodio").value;
  const volumeAmpK = document.getElementById("VolumePotassio").value;

  let volumeLiq;
  let velocInfusao;
  let ampolasSodio;
  let totalSodio;
  let ampolasPotassio;

  // aporte calorico e hídrico deve manter 100kcal/100ml
  // cada 1g de glicose hidratada tem 3.4kcal
 
  if (massa > 20) {
    volumeLiq = 1500 + (20 * (massa - 20)); // mL/dia
    velocInfusao = 60 + (massa - 20); // mL/h
  } else if (massa > 10 && massa < 20 ){
    volumeLiq = 1000 + (10 * (massa - 10)); 
    velocInfusao = 40 + (2 * (massa - 10)); 
  } else {
    volumeLiq = 100 * massa;
    velocInfusao = 4 * massa;
  }
 
  // valor seguro de 20mEq a cada 100ml, ou seja 0.02mEq/ml
  let totalPotassio = 0.02 * volumeLiq; 

  console.log(totalPotassio)
  console.log("tipo amp k "+TipoAmpolaPotassio)
  console.log("volume amp K "+volumeAmpK)
  if ( TipoAmpolaPotassio === '19' ) {
    // uma amp de 19% é 2562 mEq/L... pesquisar demais 
    ampolasPotassio = totalPotassio / ( 2.562 * volumeAmpK);  
  } else if ( volumeAmpK === 5 ) {
    // calc para 5%
  } else if ( volumeAmpK === 10 ) {
    // calc para 10%
  } else {
    document.getElementById("resultado").innerText = "SELECIONE TIPO AMPOLA DE POTASSIO";
  }

  if (document.getElementById("sodioIso").checked) {
    totalSodio = 0.135 * volumeLiq; // 135mEq/L para sódio iso
    ampolasSodio = totalSodio / qteSodio;
  } else if (document.getElementById("sodioHipo").checked){
    totalSodio = 0.03 * volumeLiq;
    ampolasSodio = totalSodio / qteSodio;
  } else {
    document.getElementById("resultado").innerText = "ESCOLHA TONICIDADE";
  }

  volumeLiq = volumeLiq - volumeAmpNa - volumeAmpK;

// final(volumeLiq, velocInfusao, totalSodio, totalPotassio); //desconstruir a função? 

  
  document.getElementById("resultado").innerText = 
    "\nSerá necessário adicionar:\n - "+totalPotassio.toFixed(2)+"mEq de Potássio ou "+ampolasPotassio.toFixed(2)+"ampola(s); e\n - "+totalSodio.toFixed(2)+"mEq de Sódio ou "+ampolasSodio.toFixed(2)+" ampola(s).\n Dilua as ampolas em "+volumeLiq+"mL de soro a 0.9% ou Ringer por dia de manutenção.\nCorrer "+velocInfusao+"ml por hora.";

  document.getElementById("alertas").style.display = 'block';
  console.log(potassio)
}
