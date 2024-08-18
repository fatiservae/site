function calcularTuboPed() {
  let idade = document.getElementById("idadeTuboPed").value;
  let tuboPed;
  let fatorTubo = 4;

  if (document.getElementById("comCuff").checked) {
      fatorTubo = 3.5;
  } 

  if (idade <= 1) {
      tuboPed = 3;
  } else {
      tuboPed = idade/4 + fatorTubo;
  }

  let fixacaoTuboPed = tuboPed*3;
  document.getElementById("resultadoTuboPed").innerHTML = "Tubo no. "+tuboPed.toFixed(0)+"<br>Inserir o tubo "+fixacaoTuboPed+"cm";
  
  if (idade > 10) {
      document.getElementById("resultadoTuboPed").innerHTML += "<br>Observe que a idade é incompatível com a pediatria!";
  } 
}
