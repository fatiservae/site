function calcularHASBLED() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  let pontos = 0;
  
  for (let index = 0; index < checkboxes.length; index++) {
    const element = checkboxes[index];
    if (element.checked) {
      pontos = pontos + 1;
    }
  }

  switch (pontos) {
    case 0:
      orientacao = "1,13 sangramentos por 100 pacientes/anos";
      break;
    case 1:
      orientacao = "1,02 sangramentos por 100 pacientes/anos";
      break;
    case 2:
      orientacao = "1,88 sangramentos por 100 pacientes/anos";
      break;
    case 3:
      orientacao = "3.74 sangramentos por 100 pacientes/anos";
      break;
    case 4:
      orientacao = "8.70 sangramentos por 100 pacientes/anos";
      break;
    default:
      orientacao = "<strong>risco muito alto</strong>, pois quaisquer valores acima de 5 não foram validados mas são provavelmente maiores em risco"; 
      break;
  } 
  document.getElementById("resultadoHASBLED").innerHTML = "O escore HAS-BLED foi de "+pontos+" pontos e isso corresponde à "+orientacao+".";
}
