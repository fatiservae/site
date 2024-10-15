function naegele() {
  let diaDum = parseInt(document.getElementById("diaDum").value, 10);
  let mesDum = parseInt(document.getElementById("mesDum").value, 10);
  let anoDum = parseInt(document.getElementById("anoDum").value, 10);
  let meses31 = [1, 3, 5, 7, 8, 10, 12];
  let diaParto = 0; 

  const today = new Date();
  const diaHoje = today.getDate();
  const mesHoje = today.getMonth() + 1;
  const anoHoje = today.getFullYear();
  console.log("hoje:"+diaHoje+"-"+mesHoje+"-"+anoHoje);

  let dias = ((anoHoje - anoDum)*365) + ((mesHoje - mesDum)*30) + (diaHoje - diaDum);
  let semanas = Math.floor(dias/7);
  let diasRestantes = dias % 7;
  console.log("dias:"+dias);
  console.log("dia:"+diaDum+"\nmes:"+mesDum+"\nano:"+anoDum);
  diaDum += 7;

  if (meses31.includes(mesDum)) {
    if (diaDum > 31) {
      mesDum += 1;
      diaParto = diaDum - 31;
    };
  } else {
    if (diaDum > 30) {
      mesDum += 1
      diaParto = diaDum - 30;
    }else {
      diaParto = diaDum;
    };
  };
  
  if (mesDum < 4) {
    mesDum += 9;
  } else {
    mesDum -= 3;
    anoDum += 1;
  };


  document.getElementById('resultadoNaegele').innerHTML =
    `Idade Gestacional: ${semanas} semanas e ${diasRestantes} dias.<br>Data prevista do parto: ${diaParto}/${mesDum}/${anoDum}`;
}
