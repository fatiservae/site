function holliday() {
  const sodio = document.getElementById("sodioAmpola").value;
  const potassio = document.getElementById("potassioAmpola").value;
  const massa = document.getElementById("massa").value;
  let quantidade;
  let fluxo;

  if (massa > 20) {
    quantidade = 1500 + (20 * (massa - 20)); // mL/dia
    fluxo = 60 + (massa - 20); // mL/h
  } else if (massa > 10 ) {
    quantidade = 1000 + (10 * (massa - 10)); 
    fluxo = 60 + (massa - 10); 
  } else {
    quantidade = 100 * massa;
    fluxo = 4 * massa;
  }

  let ampolasSodio;
  let totalSodio;
  let volumeAmpNa = document.getElementById("VolumeSodio").value;
  let volumeAmpK = document.getElementById("VolumePotassio").value;

  // converter pra % pq é o mais comum
  // uma amp de 19% é 2562 mEq/L... pesquisar demais 
  let totalPotassio = 0.02 * quantidade; // valor seguro min
  let ampolasPotassio = totalPotassio / potassio;

  if (document.getElementById("sodioIso").checked) {
    totalSodio = 0.135 * quantidade; // 135mEq/L para sódio iso
    ampolasSodio = totalSodio / sodio;
  } else if (document.getElementById("sodioHipo").checked){
    totalSodio = 0.03 * quantidade;
    ampolasSodio = totalSodio / sodio;
  } else {
    document.getElementById("resultado").innerText = "ESCOLHA TONICIDADE";
  }

  quantidade = quantidade - volumeAmpNa - volumeAmpK;

  final(quantidade, fluxo, totalSodio, totalPotassio); //desconstruir a função? 

  function final(quantidade, fluxo, totalSodio, totalPotassio) {
    document.getElementById("resultado").innerText = "Fazer "+quantidade+"mL ao dia de manutenção.\nCorrer "+fluxo+"ml por hora.\nSerá necessário adicionar:\n - "+totalPotassio.toFixed(2)+"mEq de Potássio ou "+ampolasPotassio.toFixed(2)+"ampola(s); e\n - "+totalSodio.toFixed(2)+"mEq de Sódio ou "+ampolasSodio.toFixed(2)+" ampola(s).";

    document.getElementById("alertas").style.display = 'block';
  }
}
