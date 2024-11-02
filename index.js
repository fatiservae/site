document.addEventListener("DOMContentLoaded", function() {
    var currentTime = new Date().getHours();
    
    let greeting = "Olá!";
    
    if (currentTime >= 0 && currentTime < 12) {
        greeting = "Bom dia!"; 
    } else if (currentTime >= 12 && currentTime < 18) {
        greeting = "Boa tarde!"; 
    } else {
        greeting =  "Boa noite!"; 
    }
    
    document.getElementById("greeting").innerHTML = greeting;
})
