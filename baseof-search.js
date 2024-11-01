if (noglobalsearch) {
  console.log("Globalsearch desativada nessa página!");
  document.getElementById("globalsearch").style.display = 'none';
}else{
  document.addEventListener("DOMContentLoaded", () => {
    const search = document.getElementById("globalsearch");
    search.addEventListener("input", () => {
      const searchText = search.value
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, "");
      const searchTerms = searchText.split(" ");
      let hasFilter = false;
      if (searchText.length > 0) {hasFilter = true};
      document.querySelectorAll("#artlist li").forEach(out => {
        let titulo = `${out.innerText}`
          .toLowerCase()
          .normalize('NFD')
          .replace(/\p{Diacritic}/gu, "");
        let tags = `${out.getAttribute('data-tags')}`
          .toLowerCase()
          .normalize('NFD')
          .replace(/\p{Diacritic}/gu, "");
        let searchString = titulo + tags;
        searchString
          .toLowerCase()
          .normalize('NFD')
          .replace(/\p{Diacritic}/gu, "")
          .replace(/\[/g, '');
        let isMatch = searchTerms.every(
          term => searchString.includes(term)
        );
        //if (!isMatch || !hasFilter){
        //if (!isMatch){
        if (isMatch){
          out.style.display = 'block'
          //out.classList.remove('show')
        } else {
          out.style.display = 'none'
        }
  
        if (!hasFilter) {
          out.style.display = 'none'
          //out.classList.add('show')
        }
      })
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
  });
}
