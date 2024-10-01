function naegele() {
  let diaDum = parseInt(document.getElementById("diaDum").value);
  let mesDum = parseInt(document.getElementById("mesDum").value);
  let anoDum = parseInt(document.getElementById("anoDum").value);

  console.log("dia:"+diaDum+"mes:"+mesDum+"ano:"+anoDum);
  diaDum += 7;

  if (diaDum > 30) {
    mesDum += 1
  };
  
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
