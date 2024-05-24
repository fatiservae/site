  function dadosErrados(idade, peso, creatinina, altura) {
    if (idade < 5 || idade > 95 || isNaN(idade) ||
        peso < 20 || peso > 150 ||
        altura < 130 || altura > 210 ||
        isNaN(creatinina)) // adicionar restrições à creatinina??
    {
      //console.log(idade, altura, peso, creatinina);
      return true
    } else {
      return false
    }
  }

  function calcularTFG() {
    document.getElementById("resultado").innerHTML = "";

    var idade = parseFloat(document.getElementById("idade").value);
    var peso = parseFloat(document.getElementById("peso").value);
    var altura = parseFloat(document.getElementById("altura").value);
    var creatinina = parseFloat(document.getElementById("creatinina").value);
    var sexo = document.getElementById("sexo").value;
    var ajuste = sexo === "masculino" ? 1 : 0.85;
    var pesoMin = sexo === "masculino" ? 50 : 45.5;
    var negro = document.getElementById("negro");
    var fatormdrd1 = 1;
    var fatormdrd2 = 1;

    if (negro.checked) {
      fatormdrd1 = 1.21;
    } 
    if (sexo === "feminino") {
      fatormdrd2 = 0.742
    }

    var mdrdMax = 186 * Math.pow(creatinina, -1.154) * Math.pow(idade, -0.203) * fatormdrd1 * fatormdrd2; 
    var mdrdMin = 175 * Math.pow(creatinina, -1.154) * Math.pow(idade, -0.203) * fatormdrd1 * fatormdrd2; 

    var pesoIdeal = pesoMin + 2.3 * ((altura - 152.4)/2.54);
    var pesoAjustado = pesoIdeal + 0.4 * (peso - pesoIdeal);
    var cockroftGault = ((140 - idade) * peso) * ajuste / (72 * creatinina)
    var cockroftGaultPesoIdeal = ((140 - idade) * pesoAjustado) * ajuste / (72 * creatinina)

    document.getElementById("resultado").innerHTML += 
      "<span style=\"color: var(--termo)\">"+
      "Cálculos da taxa de filtração glomerular</span>";
   
    if (!isNaN(peso) && !isNaN(altura)) {
      document.getElementById("resultado").innerHTML += 
        "<br>Por Cockcroft-Gault: "+
        "<span style=\"color: var(--termo)\">"+
        cockroftGault.toFixed(2)+"mL/min</span>"+
        "<br>Cockcroft-Gault ajustada por peso ideal calculado: "+
        "<span style=\"color: var(--termo)\">"+
        cockroftGaultPesoIdeal.toFixed(2)+"mL/min</span>"
    };

    document.getElementById("resultado").innerHTML += 
      "<br>Pela estimativa do estudo MDRD: "+
      "<span style=\"color: var(--termo)\"> de "+
      mdrdMin.toFixed(2)+" a "+mdrdMax.toFixed(2)+"mL/min</span>"

    if (dadosErrados(idade, peso, creatinina, altura))
    {
      document.getElementById("resultado").innerText = 
        "DADOS ERRADOS OU FORA DO INTERVALO!\n"+
        "VERIFIQUE DADOS INSERIDOS!\nUSE PONTOS, NÃO VÍRGULAS!";
    }

    document.getElementById("botao-copiar").style.display = 'block';
    const botaoCopiar = document.getElementById('botao-copiar');
    const paragrafo = document.getElementById('resultado');
    
    botaoCopiar.addEventListener('click', () => {
      const textoParaCopiar = paragrafo.textContent;
      navigator.clipboard.writeText(textoParaCopiar);
      //alert('Texto copiado para a área de transferência!');
    });
  }

