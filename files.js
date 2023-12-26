document.addEventListener("DOMContentLoaded", () => {
  const searched = document.getElementById('files');
  const search = document.getElementById("search");


  // A variável searched deve ser incrementada com os 
  // dados que vão sofrer a busca.
  // O exemplo abaixo alimenta searched com dados de 
  // um JSON. Outras formas incluem manipulação do DOM
  // ou dados raw.
  //
  fetch('/files_atuais.json')
  .then(response => response.json())
  .then(data => {
    for (let key in data) {
      const listItem = document.createElement('li');
      let nome = data[key].name.replace(/[-_]/g, ' ');
      listItem.innerHTML = 
          "<span style=\"color: tomato\"><a href=\""+
          data[key].path+
          "\">"+
          nome+
          "</a></span><br>Tamanho: <span style=\"color: var(--frase);\">"+
          data[key].size+
          "</span><br>Assuntos: <span style=\"color: var(--frase)\"></purple>"+
          data[key].subjects+
          "</span><br>Extensão: <span style=\"color: var(--frase)\"></purple>"+
          data[key].extension;

      searched.appendChild(listItem);
    }
  })
  .catch(error => console.error('Erro no fetch JSON:', error));
})

// Motor de busca
// O motor trabalha em cima de "searched" tornando
// invisível as entradas não compatíveis com a busca.
search.addEventListener("input", () => {
  const searchText = search.value
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, "");
  const searchTerms = searchText.split(" ");
  const hasFilter = searchText.length > 0;
  document.querySelectorAll("#files li").forEach(out => {
    const searchString = `${out.innerText}`
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, ""); 
    let isMatch = searchTerms.every(
      term => searchString.includes(term)
    );
    if (!isMatch && hasFilter){
      out.style.display = 'none'
      //out.classList.remove('show')
    }else{
      out.style.display = 'block'
      //out.classList.add('show')
    }
  })
})

// Limpar a busca
document.getElementById("clear-search")
  .addEventListener("click", () => {
    search.value = "";
    document.querySelectorAll("#search-output li").forEach(out => {
      out.classList.remove("show");
    })
});

function fechardialogo() {
  let aviso = document.getElementById("aviso");
  aviso.style.display = 'none'
};
