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
      let size = data[key].size !== undefined ? data[key].size : '--';
      let temas = data[key].subjects !== undefined ? 
                  data[key].subjects
                      .map(item => `${item}`)
                      .join(', ') : '--';
      let nome = data[key].name;
      let caminho = data[key].path+"/"+nome;
      listItem.innerHTML = 
          "<a href=\""+
          caminho+
          "\">"+nome+
          "</a><br><span style=\"color: var(--corTermo);\">Tamanho: </span>"+
          size+
          "<br><span style=\"color: var(--corTermo);\">Assuntos: </span>"+
          temas
      searched.appendChild(listItem);
    }
  })
  .catch(error => console.error('Erro no fetch JSON:', error));

// Motor de busca
// O motor trabalha em cima de "searched" tornando
// invisível as entradas não compatíveis com a busca.
search.addEventListener("input", () => {
  const searchText = search.value
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\s\-_]+/g, "").replace(/\p{Diacritic}/gu, "");

  const searchTerms = searchText.split(" ");
  const hasFilter = searchText.length > 0;
  document.querySelectorAll("#files li").forEach(out => {
    const searchString = `${out.innerText}`
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\s\-_]+/g, "").replace(/\p{Diacritic}/gu, "");
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
  // limpar com ESC
  // tem q ser em último
  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      document.querySelectorAll("#artlist li").forEach(out => {
        out.style.display = 'none'
      })
    }
  });
})
})
