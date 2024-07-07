let elementosSelecionados = [];

function adicionarElemento() {
  const selectElement = document.getElementById('elementos');
  const selectedOption = selectElement.options[selectElement.selectedIndex];
  
  elementosSelecionados.push(selectedOption.value);
  const elementosSelecionadosList = document.getElementById('elementosSelecionados');
  const listItem = document.createElement('p');
  listItem.appendChild(document.createTextNode(selectedOption.text));
  elementosSelecionadosList.appendChild(listItem);
}

function calcular() {
  document.getElementById('resultado').innerHTML = '';

  let meiaperna = 9;
  let meiacabeca = 4.5;
  let genitalia = 1;
  let palma = 1;
  let pescoco = 1;
  let meiobraco = 4.5;
  let torax = 18;
  let dorso = 18;
  let nadega = 0;
  let scq = 0;
  let dose;
  let meiaDose;
  let debito;
  let eletrica = document.getElementById("eletrica").checked;
  let peso = document.getElementById("peso").value;
  // qual idade criança msm?
  let pediatrico = false;
  if ( document.getElementById("idade").value < 3){
    pediatrico = true
  };
  let lesao_pescoco = false;

  if (pediatrico) { 
    meiaperna = 7;
    meiacabeca = 9;
    dorso = 13;
    nadega = 2.5;
  }

  elementosSelecionados.forEach(elemento => {
    if (elemento === 'meiacabeca') { scq = scq + meiacabeca}
    else if ( elemento === 'meiaperna') {scq = scq + meiaperna}
    else if ( elemento === 'nadega') {scq = scq + nadega}
    else if ( elemento === 'meiaperna') {scq = scq + meiaperna}
    else if ( elemento === 'meiobraco') {scq = scq + meiobraco}
    else if ( elemento === 'pescoco') {scq = scq + pescoco; lesao_pescoco = true}
    else if ( elemento === 'torax') {scq = scq + torax}
    else if ( elemento === 'dorso') {scq = scq + dorso}
    else if ( elemento === 'genitalia') {scq = scq + genitalia}
    else if ( elemento === 'palma') {scq = scq + palma}
  })

  let classificacao;
  let grau = "pequeno";
  if (scq > 20 ) {
    grau = "grande";
  } else if (scq > 10 && pediatrico) { 
    grau = "grande"
  } else { classificacao = ""}
  classificacao = "Paciente " + grau +" queimado."
  document.getElementById('resultado').innerHTML = 
    classificacao + "<br>"+scq+"% da superfície corporal queimada.";

  // Parkland
  if (eletrica) {
    dose = scq * peso * 4 ;
    debito = 1.5 * peso ;
    meiaDose = dose / 2;
  } else if (idade < 14 || peso < 31){
    dose = scq * peso * 3;
    debito = 1 * peso ;
    meiaDose = dose / 2;
  } else{
    dose = scq * peso * 2;
    meiaDose = dose / 2;
    debito = 0.5 * peso ;
  };

  if (lesao_pescoco === true) {
    document.getElementById('resultado').innerHTML += 
    "<br><strong>Atente-se para lesões de pescoço pela fatalidade de síndromes compressivas no sítio!</strong>";
  }

  if (grau === "pequeno") {
    document.getElementById('resultado').innerHTML += 
    "<br><strong>Em pacientes pequenos queimados, repense a necessidade de reidratação.</strong>";
  }

  document.getElementById('resultado').innerHTML += 
    "<br>Fazer "+dose+"ml de Ringer Lactato em 24h.<br>Correr "+meiaDose+"ml nas primeiras 8h. Débito urinário esperado em torno de "+debito+"mL/h.<br>Observe sempre se a urina é clara!<br>Considere hidratação de manutenção.<br><br>A administração de líquidos deve ser baseada na resposta fisiológica do doente, ajustando-se a quantidade de volume para mais ou para menos baseada no débito urinário."
}
