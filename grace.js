function grace() {
  const idade = parseInt(document.getElementById('idade').value);
  const pas = parseInt(document.getElementById('pas').value);
  const fc = parseInt(document.getElementById('fc').value);
  const creatinina = parseFloat(document.getElementById('creatinina').value);
  const killip = parseInt(document.getElementById('killip').value);
  const parada = parseInt(document.getElementById('parada').value);
  const st = document.getElementById('st');
  const enzimas = document.getElementById('enzimas');
  const iccc = document.getElementById('icc-c');

  let score = 0;
  let mortalidade = 0;

  // Pontuação para Idade
  console.log(idade);
  if (idade >= 40 && idade <= 49) {
    score += 18;
  } else if (idade >= 50 && idade <= 59) {
    score += 36;
  } else if (idade >= 60 && idade <= 69) {
    score += 55;
  } else if (idade >= 70 && idade <= 79) {
    score += 73;
  } else if (idade >= 80 && idade <= 89) {
    score += 91;
  } else if (idade > 90 && idade <= 120) {
    score += 100
  } else if (idade > 120) {
    document.getElementById('resultadoGRACE').innerHTML = "Idade absurda!";
    return
  } else {
    //
  }

  // Pontuação para Pressão Arterial Sistólica
  if (pas < 100) {
    score += 50;
  } else if (pas >= 100 && pas < 120) {
    score += 30;
  }

  // Pontuação para Frequência Cardíaca
  if (fc > 100) {
    score += 30;
  }

  // Pontuação para Creatinina
  if (creatinina >= 2) {
    score += 20;
  }

  // Pontuação para Classe de Killip
  switch (killip) {
    case 1:
      score += 0;
      break;
    case 2:
      score += 20;
      break;
    case 3:
      score += 40;
      break;
    case 4:
      score += 60;
      break;
  }

  // Pontuação para Parada Cardíaca
  if (parada) {
    score += 30;
  }

  // Pontuação para Alterações no Segmento ST
  if (st) {
    score += 11;
  }

  // Pontuação para Enzimas Cardíacas Elevadas
  console.log(enzimas);
  if (enzimas === 1) {
    score += 15;
  }

  if (iccc) {
    score += 24;
  }


  mortalidade = 1 - Math.exp(-0.00102586*(score-70)).toFixed(2);

  document.getElementById('resultadoGRACE').innerHTML = "Escore: "+score+"<br>Mortalidade associada: "+mortalidade;
}
