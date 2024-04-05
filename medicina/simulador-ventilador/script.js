"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var auto_1 = require("chart.js/auto");
var PH = 7.40;
var PCO2 = 40;
var fr = 14;
function calcula(fr) {
    var pulmao = {
        fr: 14,
        vq: 8,
        volumeTotal: 3600,
        volumeCorrente: 600
    };
    var sangue = {
        ph: PH,
        pco2: PCO2
    };
    var paciente = {
        nome: "jose",
        pulmao: pulmao,
        sangue: sangue
    };
    fr = fr + 4;
    // Retornar um objeto com a propriedade fr
    return { fr: fr };
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
            borderColor: cor,
            borderWidth: 1,
            data: []
        }]
};
// Crie um novo gráfico de linha
var volume = new auto_1.default(ctx, {
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
setInterval(function (fr) {
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
