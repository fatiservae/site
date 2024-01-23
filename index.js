document.addEventListener("DOMContentLoaded", () => {
  //if (document.querySelectorAll('#artlist li').length > 21) {
  //  for (let i = document.querySelectorAll('#artlist li').length - 1; i >= 20 ; i--) {
  //    document.querySelectorAll('#artlist li')[i].style.display = 'none'
  //  }
  //}

  //for (let i = 0; i < document.querySelectorAll('#artlist li').length;  i++) {
  //  document.querySelectorAll('#artlist li')[i].style.display = 'none'
  //}


  const search = document.getElementById("search");
  // const searched = document.querySelectorAll('#artlist li'); // por algum motivo não funciona!
  
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
      //if (!isMatch || !hasFilter){
      if (!isMatch){
        out.style.display = 'none'
        //out.classList.remove('show')
      }else{
        out.style.display = 'block'
        //out.classList.add('show')
      }
      })
      if (!hasFilter) { // permite a lista crescer se há busca
        for (let i = 0; i < 41;  i++) {
          if (i % 2 !== 0) {
            document.querySelectorAll('#artlist li')[i].style.display = 'none'
          }
        }
      }
      
    })
  });
