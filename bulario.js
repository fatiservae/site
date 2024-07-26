function maiuscula(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
document.addEventListener("DOMContentLoaded", () => {
  const searched = document.getElementById('resultado');
  /*
      * bulario.json é estruturado com os campos
      * nome, class, posologias e obs
      * na falta de posologias, a entrada é ignorada
      * class e obs são opcionais
      * falta de nome quebra o processamento do toJSON 
      *
      * A quebra do JSON é intencional para provocar a 
      * conferência das entradas.
  */
  fetch('/bulario.json')
  .then(response => response.json())
  .then(data => {
    for (i=0; i < Object.keys(data).length; i++){
      //console.log(data[i].posologias);
      // na falta de posologias, a entrada é ignorada
      if (data[i].posologias == "" || 
          data[i].posologias == '' || 
          data[i].posologias == null || 
          data[i].posologias == undefined)
      {
         continue 
      }

      let atbAtual = data[i];

      let atb = document.createElement('div');
      let nome = document.createElement('p');
      let comercial = document.createElement('p');
      let prescricoes = document.createElement('p');
      prescricoes.innerHTML += "Prescrições:<br>";
      
      atb.id = "divAtb" ;

      nome.classList.add('nome');
      nome.innerText = atbAtual.nome[0] === undefined ? "" : 
                       atbAtual.nome[0];

      comercial.classList.add('nomeComercial');
      comercial.innerText = atbAtual.nome[1] === undefined ? '' : 
                            atbAtual.nome.slice(1)
                                         .map(item => maiuscula(`${item}`)+'®')
                                         .join('  ');
      comercial.classList.add("primeiraMaiuscula");
      
      atb.appendChild(comercial);
      atb.appendChild(nome);

      if (atbAtual.class !== undefined && 
      Object.keys(data[i].class).length > 0 ) 
      {
        let classes = document.createElement('p');
        classes.innerHTML = 
          "<span style=\"color: var(--termo)\">Classes: </span>"+
          atbAtual.class.map(item => `${item}`)
                        .join(', ');
        atb.appendChild(classes);
      }

      let posologias = atbAtual.posologias;

      posologias.forEach(posologia => {
        let indexUnidades = posologia.unidades.length - 1;
        let dose = document.createElement('p');

        // Criar classe e eliminar dose.style
        dose.style.color = "var(--termo)";
        dose.style.background = "none";
        dose.style.borderRadius = "var(--raioBordas)";
        dose.style.padding = "5px";
        dose.style.width = "fit-content";
        dose.style.fontWeight = "bold";
        dose.style.border = "var(--bordas)";
        for (var i = 0; i < posologia.unidades.length; i++)
        {
          if (i != 0)
          {
            dose.innerText += "/";
          };

          let dosagem = posologia.dosagem[i];

          if (i > 0 && dosagem === 1)
          {
              dosagem = '';
          }
          dose.innerHTML += dosagem+posologia.unidades[i];
          indexUnidades--
        };

        dose.innerHTML += " "+posologia.via;

        let instrucao = document.createElement('p');
        instrucao.style.color = "var(--fonte)";
        instrucao.style.margin = "0px";
        instrucao.className = "primeiraMaiuscula";
        instrucao.innerHTML = posologia.instrucao === undefined ? '' :
                              posologia.instrucao;

        dose.appendChild(instrucao);
        instrucao.style.fontWeight = "normal";
        atb.appendChild(dose);
      });

      if (atbAtual.obs !== undefined){
        let obsTopic = document.createElement('p');
        obsTopic.innerHTML = "<hr>Observações:";
        let obs = document.createElement('p');
        obs.classList.add('observacao');
        obs.className = "primeiraMaiuscula";
        obs.innerHTML = atbAtual.obs[0] === undefined ? '' : 
                        atbAtual.obs.map(item => `${item}`)
                                    .join('<br>');

        atb.appendChild(obsTopic);
        atb.appendChild(obs);
      }

      if (atbAtual.mecanismo !== undefined){
          //let mecanismo = atbAtual.mecanismo;
          let mecanismo = document.createElement('p');
          mecanismo.classList.add('mecanismo');
          let conteudo = atbAtual.mecanismo === undefined ? '' : 
                          atbAtual.mecanismo;
          mecanismo.innerHTML = "<span style=\"color: var(--termo)\">Mecanismo:</span> "+conteudo;
          atb.appendChild(mecanismo);
      }

       searched.appendChild(atb);
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
