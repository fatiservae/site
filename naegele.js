function adicionarDias(data, dias) {
    let novaData = new Date(data);
    novaData.setDate(novaData.getDate() + dias);
    return novaData;
}
function semDias(dataInformada) {
    // Captura a data atual
    let dataAtual = new Date();

    // Cria a data informada a partir da string
    let dataInicial = new Date(dataInformada);

    // Calcula a diferença em milissegundos
    let diferencaMs = Math.abs(dataAtual - dataInicial); // Abs para ignorar a ordem

    // Converte milissegundos para dias
    let diferencaDias = Math.floor(diferencaMs / (1000 * 60 * 60 * 24));

    // Calcula o número de semanas e dias restantes
    let semanas = Math.floor(diferencaDias / 7);
    let dias = diferencaDias % 7;

    return { semanas: semanas, dias: dias};
}

function naegele() {
  let dataDum = document.getElementById('dum').value;
  let dataUS = document.getElementById('us').value;
  let semUS = document.getElementById('semanasUS').value;
  let diaUS = document.getElementById('diasUS').value;

  // Idade por DUM 
  let igDum = semDias(dataDum);

  // Idade por ultrassonografia
  let igUS = semDias(dataUS);
  semUS += igUS.semanas; 
  diaUS += igUS.dias; 
  if (igUS.dias > 7) {
    semUS += (igUS.dias/7);
    diaUS = (igUS.dias % 7);
  }

  console.log(`Semanas: `);
  console.log(`Semanas: `);

  let erro = false;

  if (erro) {
    document.getElementById('resultadoNaegele').innerHTML = "Dados incorretos! Revise datas.";
    console.log(dataUS);
    console.log(dataDum);
    console.log(dataUS+dataDum);
  } else {
    document.getElementById('resultadoNaegele').innerHTML =
    `<h4>Pela última menstruação</h4>Idade Gestacional: ${igDum.semanas}s e ${igDum.dias}d.<br>Previsão do parto: em construção<br><br><h4>Pela ultrassonografia</h4>Idade Gestacional: ${igUS.semanas}s e ${igUS.dias}d<br>Previsão do parto: em construção.`;
  }
}
