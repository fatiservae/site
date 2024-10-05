function naegele() {
  let diaDum = parseInt(document.getElementById("diaDum").value);
  let mesDum = parseInt(document.getElementById("mesDum").value);
  let anoDum = parseInt(document.getElementById("anoDum").value);
  let meses31 = [1, 3, 5, 7, 8, 10, 12];

  console.log("dia:"+diaDum+"mes:"+mesDum+"ano:"+anoDum);
  diaDum += 7;

  if (meses31.includes(mesDum)) {
    if (diaDum > 31) {
      mesDum += 1
    };
  } else {
    if (diaDum > 30) {
      mesDum += 1
    };
  }
  
  if (mesDum < 4) {
    mesDum += 9;
  } else {
    mesDum -= 3;
    anoDum += 1;
  };


  document.getElementById('resultadoNaegele').textContent =
    //`Idade Gestacional: ${semanasGestacionais} semanas e ${diasRestantes} dias. ` +
    `Data prevista do parto: ${diaDum}/${mesDum}/${anoDum}`;
}
