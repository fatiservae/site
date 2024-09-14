function riscoAddrs(){
    let resultado = document.getElementById("resultado");
    let exame = parseInt(document.getElementById("exame").value);
    let dor = parseInt(document.getElementById("dor").value);
    let historia = parseInt(document.getElementById("historia").value);
    let addrs = exame + dor + historia;
    console.log(addrs)
    if (addrs == 0) {
        resultado.innerHTML = 'Considere <mark>abandonar</mark> o diferencial de dissecação de aorta.'
    } else if (addrs > 1) {
        resultado.innerHTML = '<span>Score Alto!<br>Solicite <mark>angiotomografia</mark>, outro exame de imagem conclusivo ou abordagem cirúrgica direta!</span>'
    } else {
        resultado.innerHTML = '<label for=ddimero>Solicite D-dímero (ng/ml):</label><br><input id=ddimero type=number ></input><br><br><button onclick=\"ddimero()\">Calcule</button>'
    }
}
function ddimero(){
    let d_dimero = document.getElementById("ddimero").value;
    if (d_dimero < 500) {
        resultado.innerHTML = 'Considere <mark>abandonar</mark> o diferencial de dissecação de aorta.'
    } else if ( d_dimero > 499 ) {
        resultado.innerHTML = '<span>Score alto!<br>Solicite <mark>angiotomografia</mark>, outro exame de imagem conclusivo ou abordagem cirúrgica direta!</span>'
    }
}
