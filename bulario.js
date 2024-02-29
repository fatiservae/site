  document.addEventListener("DOMContentLoaded", () => {
  //const search = document.getElementById("search");
  const searched = document.getElementById('resultado');
  fetch('/bulario.json')
  .then(response => response.json())
  .then(data => {
      for (i=0; i < Object.keys(data).length; i++){
        let atbAtual = data[i];
        let atb = document.createElement('div');
        atb.id = "divAtb" ;

        let nome = document.createElement('p');
        nome.classList.add('nome');
        nome.innerText = atbAtual.nome[0] === undefined ? "" : atbAtual.nome[0];

        let comercial = document.createElement('p');
        comercial.classList.add('comercial');
        comercial.innerText = atbAtual.nome[1] === undefined ? '' : atbAtual.nome.slice(1).map(item => `${item}`+'®').join('  ');
      
        let habitual = document.createElement('p');
        let instrucoes = atbAtual.posologias[1][3] === undefined ? '' : "<br><span style=\"color:var(--termo);\"><br>Instruções</span>: "+atbAtual.posologias[1][3];
        habitual.innerHTML = "Posologia habitual de "+atbAtual.posologias[1][0]+atbAtual.posologias[0][0]+'/'+atbAtual.posologias[1][1]+atbAtual.posologias[0][1]+" "+atbAtual.posologias[1][2]+instrucoes;
        
        atb.appendChild(comercial);
        atb.appendChild(nome);
        atb.appendChild(habitual);

        if (atbAtual.class !== undefined && Object.keys(data[i].class).length > 0 ) {
            let classes = document.createElement('p');
            classes.innerHTML = "<span style=\"color: var(--termo)\">Classes: </span>"+atbAtual.class.map(item => `${item}`).join(', ');
            atb.appendChild(classes);
        }

        let posologiasAdc = document.createElement('p');
        let noPosologias = Object.keys(data[i].posologias).length;
        if (noPosologias > 2) {
            posologiasAdc.innerHTML = "<span style=\"color: var(--termo)\">Demais posologias: <br><br></span>";
            for (j=2; j < noPosologias; j++){
              let instrucoes = atbAtual.posologias[j][3] === undefined ? '' : " "+atbAtual.posologias[j][3];
              posologiasAdc.innerHTML+= "<span style=\"color: var(--termo)\">"+(j-1)+") </span>"+atbAtual.posologias[j][0]+atbAtual.posologias[0][0]+'/'+atbAtual.posologias[j][1]+atbAtual.posologias[0][1]+" "+atbAtual.posologias[j][2]+instrucoes+"<br><br>";
            }
            atb.appendChild(posologiasAdc);
        }

        if (atbAtual.obs !== undefined){
          let obsTopic = document.createElement('p');
          obsTopic.innerHTML = "<hr>Observações";
          let obs = document.createElement('p');
          obs.classList.add('observacao');
          obs.innerText = atbAtual.obs[0] === undefined ? '' : atbAtual.obs.map(item => `${item}`).join('\n');

          atb.appendChild(obsTopic);
          atb.appendChild(obs);
        }

                
        searched.appendChild(atb);
      }
      //document.querySelectorAll("#resultado p").forEach(p => {
      //  p.style.display = 'none';
      //}
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
  document.querySelectorAll("#divAtb").forEach(out => {
  //out.style.display = 'none';
  //console.log(out.innerText);
    const searchString = `${out.innerText}`
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, ""); 
    let isMatch = searchTerms.every(
      term => searchString.includes(term)
    );
    if (isMatch && hasFilter){
      //out.classList.add('show')
      out.style.display = 'block';
    }else{
      //out.classList.remove('show')
      out.style.display = 'none';
    }
  })
})

