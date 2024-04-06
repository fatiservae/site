/*
 * tempo em ms
 * fr em irpm - Lembrar de sempre converter
 * volume em ml 
 * fio2 em %
*/
let fr = 12;
let volTidal = 300;
let tins = ((60000/fr)/5); // 1/5 do tempo da fr
let texp = ((240000/fr)/5); // 4/5 do tempo da fr
let fio2 = 30;
let volResidual = 300;
let bic;
let ph = 7.4;
let pco2;
let po2;
let flux; /* ml/ms */
let peep; /* normalmente informada em cmH2O, deve ser convertida em mmHg */
let lact; /* influencia em que? */
let idade; /* influencia em que? */
/*
 * patologia deve ser definida via função:
 * - pneumonia e.g. alterar valores de pH etc
let patologia;
*/

//let fatorFr = 1;
//let fatorVol;
//let fatorPh;
//let fatorLact;
//let fatorBic
//let nome;

function atualizar() {
    fr = ((document.getElementById("frequencia-respiratoria").value) / 60000);
    volTidal = parseFloat(document.getElementById("vol-tidal").value);
    fatorFr = 1;
    ph = document.getElementById("ph").value;
    pco2 = document.getElementById("pco2").value;
    bic = document.getElementById("bicarbonato").value;
}

// Obtenha o contexto do canvas
var ctx = document.getElementById('volume').getContext('2d');
var cor = getComputedStyle(document.documentElement).getPropertyValue('--fonte');

var vol = {
    labels: [],
    datasets: [{
        label: 'Volume pulmonar', // so pra por um titulo marrom
        borderColor: cor ,
        borderWidth: 1,
        data: []
    }]
};

// Crie um novo gráfico de linha
var respiracao = new Chart(ctx, {
    type: 'line',
    data: vol,
    options: {
        animation: false,
        scales: {
            x: {
                display: true 
            },
            y: {
                beginAtZero: true 
            }
        }
    }
});
var tempo = 0;
var deslocamento = 0;
var valor = 300;

/*
    * respirar() devolve:
    * ph / pco2 / po2 / compl
*/
function atualizarFisiologia (fr, fio2, peep, volTidal, flux) {
    /* Influência de FR em PH */
    if (fr>22) {
        ph = ph - ph*20/100;
    }else if(fr>18){
        ph = ph - ph*10/100;
    }
}

// Intervalo de atualização em ms
let intervalo = 1000 ; 
let tCiclo = 0; /* tempo do ciclo respiratorio em ms */
const maxT = (60000/fr) + 5000;
let ultimoVol = volResidual;

function respirar(tCiclo, ultimoVol) {
    let fracaoTidalIns = ultimoVol + ultimoVol*(40/100);
    let fracaoTidalExp = ultimoVol - ultimoVol*(1/100);

    if (tCiclo < tins){
        // como uma curva de inspiração
        return fracaoTidalIns + volResidual
    }else if(tCiclo < tins + texp){
        // como uma curva de expiração 
        return fracaoTidalExp + volResidual
    }else{
        // residuo
        return volResidual
    }
}

setInterval(function() {
    tCiclo = tCiclo + intervalo;
    if (tCiclo > maxT) {
        tCiclo = 0;
    }
    /* Altere a frequência da onda ajustando este valor */ 
    calcVol = respirar(tCiclo, ultimoVol);
    ultimoVol = calcVol;
    vol.labels.push('');
    vol.datasets[0].data.push(calcVol);
    deslocamento += 1; 
    /* Remova dados antigos para efeito deslizamento infinito */
    if (deslocamento > 10) {
        vol.labels.shift();
        vol.datasets[0].data.shift();
    }
    console.log(
        "fr: "+fr+
        "\nph: "+ph+
        "\npCO2: "+pco2+
        "\nvol pulmonar: "+calcVol+
        "\nbic: "+bic+
        "\nvol tidal :"+volTidal+
        "\ntCiclo :"+tCiclo+
        "\ntIns: :"+tins+
        "\ntExp: :"+texp
    );
    respiracao.update();
}, intervalo); 

atualizar()
