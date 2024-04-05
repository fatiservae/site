//let fr = document.getElementById("frequencia-respiratoria").value;
//let volumeTidal = 300;
let tins = 8;
//let texp= 4 * tins;
var volumeResidual = 300;
//let fatorFr = 1;
//let fatorVol;
//let fatorPh;
//let fatorLact;
//let fatorBic
//let ph = 7.4;
//let pco2;
//let po2;
//let bic;
//let lact;
//let nome;
//let idade;
//let patologia;

function atualizar() {
    fr = document.getElementById("frequencia-respiratoria").value;
    volumeTidal = parseFloat(document.getElementById("volume-tidal").value);
    ;
    fatorFr = 1;
    ph = document.getElementById("ph").value;
    pco2 = document.getElementById("pco2").value;
    bic = document.getElementById("bicarbonato").value;
    //fatorVol;
    //fatorPh;
    //fatorLact;
    //fatorBic
    //pco2;
    //po2;
    //lact;
    //nome;
    //idade;
    //patologia;
}

// Obtenha o contexto do canvas
var ctx = document.getElementById('volume').getContext('2d');
var cor = getComputedStyle(document.documentElement).getPropertyValue('--fonte');

// Inicialize os dados do gráfico
var dados = {
    labels: [],
    datasets: [{
        label: '% Volume pulmonar', // so pra por um titulo marrom
        borderColor: cor ,
        borderWidth: 1,
        data: []
    }]
};

// Crie um novo gráfico de linha
var respiracao = new Chart(ctx, {
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
var valor = 300;

function respirar(tempo, fr, ph, volumeTidal, valor){
    return Math.abs(Math.sin(tempo))
}
 
setInterval(function() {
    if (tempo < tins){
        tempo += .5
    } else {
        tempo = 0;
    }; 
    // Altere a frequência da onda ajustando este valor
    //var valor = Math.sin(tempo);
    valor = respirar(tempo, fr, ph, volumeTidal, valor);
    dados.labels.push('');
    dados.datasets[0].data.push(valor);
    deslocamento += 1; // Deslocamento para mover o gráfico para a esquerda
    // Remova os dados mais antigos para criar o efeito de deslizamento infinito
    if (deslocamento > 50) {
        dados.labels.shift();
        dados.datasets[0].data.shift();
    }
    console.log("fr: "+fr+"\nph: "+ph+"\npCO2: "+pco2+"\nvolume pulmonar: "+valor+"\nbic: "+bic+"\nvolume tidal :"+volumeTidal);
    respiracao.update();
}, 800); // Intervalo de atualização em milissegundos

atualizar()
