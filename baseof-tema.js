let temaAtual = localStorage.getItem('tema');
let temaEspecificado = localStorage.getItem('temaEspecificado');

if (temaAtual == "dark"){
  document.getElementById("nomeTema").innerHTML = ".light";
} else if (temaAtual == "light") {
  document.getElementById("nomeTema").innerHTML = ".dark";
}

if (temaEspecificado == "true") {
  document.documentElement.setAttribute('data-tema', temaAtual);
} else if (temaAtual == "dark") {
  document.documentElement.setAttribute('data-tema', "dark");
  localStorage.setItem('tema', "dark"); 
  document.getElementById("nomeTema").innerHTML = ".light";
  setNomeTema();
} else {
  document.documentElement.setAttribute('data-tema', "light");
  localStorage.setItem('tema', "light"); 
  document.getElementById("nomeTema").innerHTML = ".dark";
}

function temaEspecifico(nome) {
  if (nome == "OFF") {
    document.documentElement.setAttribute('data-tema', "light")
    localStorage.setItem('temaEspecificado', "false"); 
    localStorage.setItem('tema', "light"); 
    document.getElementById("nomeTema").innerHTML = ".dark";
  } else if (nome !== undefined) {
    document.documentElement.setAttribute('data-tema', nome)
    localStorage.setItem('temaEspecificado', "true"); 
    localStorage.setItem('tema', nome); 
  } else {
    console.log("Erro: nome do tema precisa ser definido ou OFF para desativar");
  }
}

function tema() {
  temaAtual = localStorage.getItem('tema');
  if (temaAtual == "light") {
    document.documentElement.setAttribute('data-tema', "dark");
    localStorage.setItem('tema', "dark"); 
    document.getElementById("nomeTema").innerHTML = ".light";
  } else {
    document.documentElement.setAttribute('data-tema', "light");
    localStorage.setItem('tema', "light"); 
    document.getElementById("nomeTema").innerHTML = ".dark";
  }  

  location.reload();
}
