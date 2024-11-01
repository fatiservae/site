var currentTime = new Date().getHours();

let greeting = "Olá!";

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
