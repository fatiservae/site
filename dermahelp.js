let frases;
let index ;
let fraseAleatoria ;
let autor ;

fetch('/lesoes-elementares.json')
.then(response => response.json())
.then(data => { 
  const novoFormato = data.flatMap(item => item.citacoes.map(frase => ({ autor: item.autor, frase })));
  index = randomIndex(novoFormato.length);
  fraseAleatoria = novoFormato[index].frase;
  autor = novoFormato[index].autor;
  document.getElementById("frase").textContent = "\""+fraseAleatoria+"\"";
  if (autor.length > 1){
    document.getElementById("autor").innerHTML = `<mark id="autor">${autor}</mark>`;
  }
})
.catch(error => console.error('Erro ao buscar o JSON:', error));

setTimeout(function() {
    frase.classList.add('show');
}, 300);

function helpDx() {

}

