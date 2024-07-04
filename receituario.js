//let medicamentos = [];

//function adicionarElemento() {
//  const selectElement = document.getElementById('elementos');
//  const selectedOption = selectElement.options[selectElement.selectedIndex];
//  
//  elementosSelecionados.push(selectedOption.value);
//  const elementosSelecionadosList = document.getElementById('elementosSelecionados');
//  const listItem = document.createElement('p');
//  listItem.appendChild(document.createTextNode(selectedOption.text));
//  elementosSelecionadosList.appendChild(listItem);
//}

function adicionar() {
  class Medicamento {
    constructor(nome, apresentacao, dose, quantidade) {
      this.nome = nome;
      this.apresentacao = apresentacao;
      this.dose = dose;
      this.quantidade = quantidade;
    }
  }

  let nomeMed = document.getElementById("med-nome").value;
  let apresMed = document.getElementById("med-apres").value;
  let doseMed = document.getElementById("med-dose").value;
  let qtdMed = document.getElementById("med-qtde").value;

  let medicamento = new Medicamento(nomeMed, apresMed, doseMed, qtdMed);

  medicamentos.push(medicamento);
  console.log(medicamentos);
  console.log(nomeMed);
  console.log(apresMed);
  console.log(doseMed);
  console.log(qtdMed);
}

async function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  //LOGOS
  const imgDirPath = document.getElementById("logoDir").value;
  const imgEsqPath = document.getElementById("logoEsq").value;
  if (!imgDirPath == ""){
    let imgDir = "/pix/"+imgDirPath+".png";
    const logoDir = await getImageData(imgDir);
    doc.addImage(logoDir, 'PNG', 170, 10, 30, 30);
  };
  if (!imgEsqPath == ""){
    let imgEsq = "/pix/"+imgEsqPath+".png";
    const logoEsq = await getImageData(imgEsq);
    doc.addImage(logoEsq, 'PNG', 20, 10, 30, 30);
  };

  // CABECALHO
  doc.setFontSize(12);
  const cabecalho = document.getElementById('cabecalho').value;
  doc.text(`${cabecalho}`, 100, 20, {maxWidth: 60, align: "center"});

  // TITULO
  doc.setFontSize(20);
  const titulo = document.getElementById('titulo').value;
  doc.text(`${titulo}`, 90, 50, {maxWidth: 140, align: "center"});

  // TEXTO
  doc.setFontSize(11);
  const corpo = document.getElementById('corpo').value;
  doc.text(`${corpo}`, 30, 70, {maxWidth: 160, align: "justify"});

  // ASS
  doc.line(50, 200, 150, 200, 'S');
  const assinatura = document.getElementById("assinatura").value;
  doc.text(`${assinatura}`, 100, 210, {maxWidth: 140, align: "center"});

  // DATA
  const dia = document.getElementById("dia").value;
  const mes = document.getElementById("mes").value;
  const ano = document.getElementById("ano").value;
  let data = dia+" de "+mes+" de "+ano;
  doc.text(`${data}`, 100, 220, {maxWidth: 140, align: "center"});

  // MEDICAMENTOS
  //medicamentos.forEach((medicamento) => {
  //  doc.text(medicamento, 10, 70);
  //})
  //doc.text(`Notas:`, 10, 90);
  //doc.text(notas, 10, 100);

  const nomeArquivo = document.getElementById("nomeArquivo").value;
  doc.save(`${nomeArquivo}.pdf`);
}

function getBase64Image(img) {
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  return canvas.toDataURL("image/png").replace(/^data:image\/(png|jpg);base64,/, "");
}

async function getImageData(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
