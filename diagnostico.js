function calcPosT() {
    let probPreT = document.getElementById("probPreT").value;
    let sensibilidade = document.getElementById("sensibilidade").value;
    let especificidade = document.getElementById("especificidade").value;
    console.log("especificidade: "+especificidade+"\nsensibilidade: "+sensibilidade+"\nPreteste: "+probPreT);

    let preTOdds = probPreT / (100 - probPreT);
    let verossimilhanca = sensibilidade / (100 - especificidade);
    let posTOdds = preTOdds * verossimilhanca;

    let probPosT = 100 * (posTOdds/(1 + posTOdds));
    document.getElementById("probPosT").innerText = probPosT.toFixed(2)+"%";
}
