document.getElementById('graceForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const idade = parseInt(document.getElementById('idade').value);
  const pas = parseInt(document.getElementById('pas').value);
  const fc = parseInt(document.getElementById('fc').value);
  const creatinina = parseFloat(document.getElementById('creatinina').value);
  const killip = parseInt(document.getElementById('killip').value);
  const parada = parseInt(document.getElementById('parada').value);
  const st = parseInt(document.getElementById('st').value);
  const enzimas = parseInt(document.getElementById('enzimas').value);

  const score = calcularScoreGRACE(idade, pas, fc, creatinina, killip, parada, st, enzimas);
  
  document.getElementById('resultadoGRACE').innerText = 'Score GRACE: ' + score;
});

function calcularScoreGRACE(idade, pas, fc, creatinina, killip, parada, st, enzimas) {
  let score = 0;

  // Pontuação para Idade
  if (idade >= 70 && idade <= 80) {
    score += 20;
  } else if (idade > 80) {
    score += 40;
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
  if (parada === 1) {
    score += 30;
  }

  // Pontuação para Alterações no Segmento ST
  if (st === 1) {
    score += 40;
  }

  // Pontuação para Enzimas Cardíacas Elevadas
  if (enzimas === 1) {
    score += 20;
  }

  return score;
}
