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
setInterval(function() {
    tempo += 0.1; // Altere a frequência da onda ajustando este valor
    var valor = Math.sin(tempo);
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
