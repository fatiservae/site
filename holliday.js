function holliday() {
  // principal
  const tipoFluidoPrincipal = document.getElementById("tipoFluidoPrincipal").value;
  const massa = document.getElementById("massa").value;

  // sodio 
  const concentAmpNa = document.getElementById("concentAmpNa").value;
  const volumeAmpNa = document.getElementById("volumeAmpNa").value;
  
  // potassio
  const concentAmpK = document.getElementById("concentAmpK").value;
  const volumeAmpK = document.getElementById("volumeAmpK").value;

  // aporte calorico e hídrico deve manter 100kcal/100ml
  // cada 1g de glicose hidratada tem 3.4kcal
  
  let volumeLiq;
  let velocInfusao;
  if (massa > 20) {
    volumeLiq = 1500 + (20 * (massa - 20)); // mL/dia
    velocInfusao = 60 + (massa - 20); // mL/h
  } else if (massa >= 11){
    volumeLiq = 1000 + (50 * (massa - 10)); 
    velocInfusao = 40 + (2 * (massa - 10)); 
  } else {
    volumeLiq = 100 * massa;
    velocInfusao = 4 * massa;
  }

  // POTASSIO
  // valor seguro de 20mEq a cada 100ml, ou seja 0.02mEq/ml
  let ampolasPotassio;
  let totalPotassio = 0.02 * volumeLiq; 
  if ( concentAmpK === '19' ) {
    // uma amp de 19% é 2562 mEq/L... pesquisar demais 
    ampolasPotassio = totalPotassio / (2562/1000 * volumeAmpK);
  } else if ( concentAmpK === '5' ) {
  } else if ( concentAmpK === 'fosft2meqml' ) {
    ampolasPotassio = totalPotassio / (2 * volumeAmpK);
    // calc para 5%
  } else if ( concentAmpK === '10' ) {
    // 1.34mEq/ml
    ampolasPotassio = totalPotassio / ((134/10)* volumeAmpK);
  } else {
    document.getElementById("resultado").innerText = "SELECIONE TIPO AMPOLA DE POTASSIO";
    return
  }

  // GLICOSE
  let totalGlicose;
  let glicoseAdd;
  let glicoseFluido;
  let ampolasGlic;
  let percentualGlic = document.getElementById("percentualGlic").value;
  if(isNaN(percentualGlic)){
    percentualGlic = 0;
  };
  let volumeAmpGlic = document.getElementById("volumeAmpGlic").value;
  if(isNaN(volumeAmpGlic)){
    volumeAmpGlic = 0;
  };

  // SODIO E/OU GLICOSE
  let ampolasSodio;
  let totalSodio;
  let sodioAdd;
  let sodioFluido;
  glicoseAdd = (volumeLiq) * 5/100; // 5g/100ml ou seja 0.05g/ml
  if (tipoFluidoPrincipal === 'sf09') {
    sodioFluido = volumeLiq * 0.13; // 0.13mEq por ml de soro 
    glicoseFluido = 0;
  } else if (tipoFluidoPrincipal === 'sg5') {
    glicoseAdd = 0; // pra evitar ser NaN
    sodioFluido = 0;
    glicoseFluido = volumeLiq * 5/100; // vai dar certinho 5g/100ml
  } else if (tipoFluidoPrincipal === 'sg10') {
    document.getElementById("resultado").innerText = "DILUA SEU FLUIDO PRINCIPAL PARA 5% DE GLICOSE.\n No caso de Soro a 10% de glicose dobre o volume da solução com água para injeção.\n Ex.: 100ml de soro a 10% adicione mais 100ml de água.\nReinicie a calculadora com soro a 5% de glicose ou outro.";
    return
    //
  } else if (tipoFluidoPrincipal === 'sg20') {
    document.getElementById("resultado").innerText = "DILUA SEU FLUIDO PRINCIPAL PARA 5% DE GLICOSE.\n No caso de Soro a 20% de glicose adicione 3x (três) vezes o volume atual da solução com água para injeção.\n Ex.: 100ml de soro a 20% adicione mais 300ml de água.\nReinicie a calculadora com soro a 5% de glicose ou outro.";
    return
    //
  } else if (tipoFluidoPrincipal === 'sf5') {
    //
  } else if (tipoFluidoPrincipal === 'ringer') {
    sodioFluido = volumeLiq * 0.13;
    totalPotassio = totalPotassio + ( volumeLiq/1000 * 4); // Ringer tem 4mEq/L de K
    glicoseFluido = 0;
    // Sódio 130,00mEq/L Potássio 4,0 mEq/L Cálcio 2,7 mEq/L Cloreto 109,0 mEq/L Lactato 27,0 mEq/L
  } else {
    document.getElementById("resultado").innerText = "SELECIONE TIPO FLUIDO PRINCIPAL";
    return
  };
 
  if (document.getElementById("sodioIso").checked) {
    totalSodio = 0.135 * volumeLiq; // 135mEq/L iso padrão
  } else if (document.getElementById("sodioHipo").checked){
    totalSodio = 0.03 * volumeLiq; // 30mEq/L hipotonico padrao
  } else {
    document.getElementById("resultado").innerText = "ESCOLHA TONICIDADE";
    return
  }
  
  sodioAdd = totalSodio - sodioFluido; // 135mEq/L para sódio iso

  totalGlicose = glicoseAdd + glicoseFluido;
  ampolasGlic = totalGlicose / ((percentualGlic/100) * volumeAmpGlic);
  if(isNaN(totalGlicose)){totalGlicose = 0;};
  if(isNaN(ampolasGlic) || !isFinite(ampolasGlic)){ampolasGlic = 0;}
  if (totalGlicose > 0  && percentualGlic === "" ) {
    document.getElementById("resultado").innerText = "ESCOLHA AMPOLAS DE GLICOSE";
    return
  }

  if (concentAmpNa === '20') {
    ampolasSodio = sodioAdd / (3.4 * volumeAmpNa);
  } else if (concentAmpNa === '10') {
    ampolasSodio = sodioAdd / (1.7 * volumeAmpNa);
  } else {
    document.getElementById("resultado").innerText = "ESCOLHA TIPO AMPOLA SODIO";
    return
  }

  totalSodio = sodioFluido + sodioAdd;

  // GLICOSE
  
  //volumeLiq = volumeLiq - volumeAmpNa - volumeAmpK;
  // final(volumeLiq, velocInfusao, totalSodio, totalPotassio); //desconstruir a função? 

  document.getElementById("resultado").innerText = "\nPara alcançar o Potássio necessário, adicione "+totalPotassio.toFixed(2)+"mEq ou "+ampolasPotassio.toFixed(2)+"ampola(s); \n\nO fluido escolhido contém "+sodioFluido.toFixed(2)+"mEq de Sódio.\n Portanto, para alcançar "+totalSodio.toFixed(2)+"mEq de Sódio, adicione "+ampolasSodio.toFixed(2)+" ampolas de Sódio.\n\nSerá necessário "+totalGlicose.toFixed(2)+"g de Glicose.\nO fluido escolhido oferta "+glicoseFluido.toFixed(2)+"g de glicose.\nAdicione "+ampolasGlic.toFixed(2)+" ampolas de glicose.\n\n Dilua todas as ampolas em "+volumeLiq.toFixed(2)+"mL do fluido principal escolhido.\n\n Correr "+velocInfusao.toFixed(2)+"ml por hora. Esta é a manutenção de um dia (24h).";

  document.getElementById("alertas").style.display = 'block';
}
