document.addEventListener("DOMContentLoaded", () => {
  const searched = document.querySelectorAll('#artlist li');
  const search = document.getElementById("search");
 
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
    document.querySelectorAll("#artlist li").forEach(out => {
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
});
