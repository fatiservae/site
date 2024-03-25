//function diferencial() {
//  let doencas = document.querySelectorAll("input");
//  
//  doencas.forEach(doenca => {
//    if (doenca.checked) {
//    console.log(doenca)
//    }
//  })
//}


// Classe Doença
class Doenca {
  constructor(
    exantema, 
    leucocitose, 
    febre, 
    prodromos) 
  {
    this.exantema = exantema;
    this.leucocitose = leucocitose;
    this.febre = febre;
    this.prodromos = prodromos;
  }
}

// Exemplo de utilização da classe Doenca
const sarampo = new Doenca(
  ["morbiliforme", "afeta áreas do corpo como face, tronco e membros", "prurido leve"],
  true, // leucocitose presente
  true, // febre presente
  ["tosse seca", "coriza", "conjuntivite"] // sintomas prodromicos
);

const rubéola = new Doenca(
  ["maculopapular", "inicia na face e se espalha para o corpo", "prurido moderado"],
  false, // leucocitose ausente
  true, // febre presente
  ["linfadenopatia retroauricular", "conjuntivite", "rinorreia"] // sintomas prodromicos
);
