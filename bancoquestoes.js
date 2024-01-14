let total = 0;
let errors = 0;
let corrects = 0;
let questions;
let prova = "N/A";
let ano = "N/A";
let banca = "N/A";
let textoBase;
let solvedQuestions = [];
let randomIndex;
//fetch('/questoes.json')
fetch('/questoes.json')
  .then(response => response.json())
  .then(data => { 
    questions = data;
  })
  .catch(error => { 
    console.error(
      'Erro ao carregar o arquivo JSON:', error);
  });

const container = document.getElementById('question-container');
const counter = document.getElementById('counter');

function generateRandomQuestion() {
  container.innerHTML = '';
     console.log("questions len -> "+questions.length)
     console.log("solved len -> "+solvedQuestions.length)

  if (solvedQuestions.length === questions.length){
    alert("Fim das questões")
    return // otimizado pq assim se a função é chamada 
           //novamente se recusa a executar!
  }

  randomIndex = Math.floor(Math.random() * questions.length);
  
  while (solvedQuestions.includes(randomIndex)  &&
        (solvedQuestions.length !== questions.length + 1 )) {
     randomIndex = Math.floor(Math.random() * questions.length);
  }

  if (!solvedQuestions.includes(randomIndex)){
       solvedQuestions.push(randomIndex);
  }

  const randomQuestion = questions[randomIndex]; 

  //const questionDiv = document.createElement('div');
  //questionDiv.classList.add('div-interno-questao');

  if (randomQuestion.banca !== undefined) { banca = randomQuestion.banca};
  if (randomQuestion.ano !== undefined) { ano = randomQuestion.ano};
  if (randomQuestion.prova !== undefined) { prova = randomQuestion.prova};

  container.appendChild(document.createElement('br'));
  if (randomQuestion.imagem !== undefined) { 
    let imagem = document.createElement('img');
    imagem.src = "/banco-questoes/"+randomQuestion.imagem;
    container.appendChild(imagem);
  }

  // o texto base vem antes da questao
  if (randomQuestion.texto_base !== undefined) { 
    let texto_base = document.createElement('p');
    texto_base.classList.add('texto-questao');
    texto_base.textContent = randomQuestion.texto_base;
    container.appendChild(texto_base);
  }

  const questaum = document.createElement('p');
  questaum.textContent = randomQuestion.questao;
  questaum.classList.add('texto-questao');
  container.appendChild(questaum);

  // Multipla escolha
  if (randomQuestion.tipo === 'multipla_escolha') {
     let answerIndex = 0;
     randomQuestion.alternativas.forEach(choice => {
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'answer'; 
      radio.value = choice;
      radio.id = `${answerIndex}`;

      const label = document.createElement('label');
      const breakline = document.createElement('br');
      label.innerHTML = choice;

      container.appendChild(radio);
      container.appendChild(label);
      container.appendChild(breakline);
      answerIndex = answerIndex + 1; 
    });
  // Verdadeiro e falso
  } else if (randomQuestion.tipo === 'verdadeiro_falso') {
    const trueRadio = document.createElement('input');
    trueRadio.type = 'radio';
    trueRadio.name = 'answer';
    trueRadio.value = 'true';
    trueRadio.id = 'true';

    const trueLabel = document.createElement('label');
    trueLabel.htmlFor = 'true';
    trueLabel.appendChild(document.createTextNode('Verdadeiro'));

    const falseRadio = document.createElement('input');
    falseRadio.type = 'radio';
    falseRadio.name = 'answer';
    falseRadio.value = 'false';
    falseRadio.id = 'false';
    const falseLabel = document.createElement('label');
    falseLabel.htmlFor = 'false';
    falseLabel.appendChild(document.createTextNode('Falso'));

    container.appendChild(trueRadio);
    container.appendChild(trueLabel);
    container.appendChild(falseRadio);
    container.appendChild(falseLabel);
  }
  container.appendChild(document.createElement('br'));

  const solveButton = document.createElement('button');
  solveButton.innerHTML = 'Resolver';
  solveButton.id = 'resolver';
  solveButton.onclick = () => checkAnswer(randomIndex);
  container.appendChild(solveButton);


  counter.innerHTML = `<span style="color: var(--termo)"> ${prova}</span><br>BANCA: <span style="color:var(--termo)"> ${banca}</span> ANO: <span style="color:var(--termo)"> ${ano}</span><br>Corretas:  <span style="color: var(--verde-servo)">${corrects} </span>Erradas:  <span style="color: red">${errors} </span><br>`
}

function checkAnswer(index) {
  // Captura a resposta marcada
  const checkedRadio = document.querySelector('input[name="answer"]:checked');
  
  if (checkedRadio) {
    const userAnswer = checkedRadio.id;
    // Lógica para verificar a resposta aqui
    // Compare a resposta marcada com o gabarito no array 'questions'
    if (userAnswer === JSON.stringify(questions[index].resposta_bool) ||
    userAnswer === JSON.stringify(questions[index].resposta_multipla)) {
      corrects = corrects + 1;
      document.getElementById('resolver').style.backgroundColor = 'green';
      document.getElementById('resolver').innerHTML = 'Acertou!';
      document.getElementById('resolver').disabled = true; 
    } else {
      errors = errors + 1;
      document.getElementById('resolver').style.backgroundColor = 'red';
      document.getElementById('resolver').innerHTML = 'Errou!';
      document.getElementById('resolver').disabled = true; 
    }
  } else {
    alert('Nenhuma opção marcada para a pergunta!');
  }

  counter.innerHTML = `<span style="color: var(--termo)"> ${prova}</span><br>BANCA: <span style="color:var(--termo)"> ${banca}</span> ANO: <span style="color:var(--termo)"> ${ano}</span><br>Corretas:  <span style="color: var(--verde-servo)">${corrects} </span>Erradas:  <span style="color: var(--vermelho-google)">${errors} </span><br>`
}
prova = "N/A";
ano = "N/A";
banca = "N/A";
textoBase = undefined;

generateRandomQuestion();

