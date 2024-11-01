var currentTime = new Date().getHours();

let greeting = "Boa noite";

if (currentTime >= 0 && currentTime < 12) {
    greeting = "Bom dia!"; 
} else if (currentTime >= 12 && currentTime < 18) {
    greeting = "Boa tarde!"; 
} else {
    greeting =  "Boa noite!"; 
}

let boasvindas = document.createElement("h2");
boasvindas.innerHTML = greeting;
boasvindas.id = "boasvindas"

document.addEventListener('DOMContentLoaded', function() {
  let referencia = document.getElementById("maquinaescrever");
  referencia.parentNode.insertBefore(boasvindas, referencia);
});

let typed = "Escrevo aqui o que penso.\n Às vezes...";
let typedout = "";
let delay = 100;

for (let i = 0; i < typed.length; i++) {
  let f = i;
  if(i>=26){
    f = i + 15;
  };
  setTimeout(() => {
    typedout += typed[i];
    document.getElementById("typed").innerText = typedout;
  }, f * delay);
}
