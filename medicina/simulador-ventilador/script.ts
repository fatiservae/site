const PH: number = 7.40;
const PCO2: number = 40;

let fr: number = 14;


type Pulmao = {
  fr: number;
  vq: number;
  volumeTotal: number;
  volumeCorrente: number;
}

type Sangue = {
  ph: number;
  pco2: number;
}

type Paciente = {
  nome: string;
  pulmao: Pulmao;
  sangue: Sangue;
}

function calcula(fr: number): { fr: number } {

  const pulmao: Pulmao = {
    fr: 14,
    vq: 8,
    volumeTotal: 3600,
    volumeCorrente: 600 
  };

  const sangue: Sangue = {
    ph: PH,
    pco2: PCO2
  };

  var paciente: Paciente = {
    nome: "jose",
    pulmao,
    sangue 
  };

  fr = fr + 4;
  // Retornar um objeto com a propriedade fr
  return {fr: fr};
}

//setInterval(run, 1000);


// Obtenha o contexto do canvas
var ctx = document.getElementById('volume').getContext('2d');
var cor = getComputedStyle(document.documentElement).getPropertyValue('--fonte');
// Inicialize os dados do gráfico
var dados = {
    labels: [],
    datasets: [{
        label: 'Volume inspiratório',
        borderColor: cor ,
        borderWidth: 1,
        data: []
    }]
};

// Crie um novo gráfico de linha
var volume = new Chart(ctx, {
    type: 'line',
    data: dados,
    options: {
        animation: false,
        scales: {
            x: {
                display: false
            },
            y: {
                beginAtZero: false
            }
        }
    }
});
// Atualize os dados do gráfico para desenhar uma onda sinusal
var tempo = 0;
var deslocamento = 0;
setInterval(function(fr: number) {
    fr += 0.1; // Altere a frequência da onda ajustando este valor
    var valor = Math.sin(fr);
    dados.labels.push('');
    dados.datasets[0].data.push(valor);
    deslocamento += 1; // Deslocamento para mover o gráfico para a esquerda
    // Remova os dados mais antigos para criar o efeito de deslizamento infinito
    if (deslocamento > 50) {
        dados.labels.shift();
        dados.datasets[0].data.shift();
    }
    volume.update();
}, 100); // Intervalo de atualização em milissegundos
