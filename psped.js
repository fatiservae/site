let tabela = document.getElementById("tabela");
let adicionarDroga = document.getElementById("inserir-droga");
let calcular = document.getElementById("calcular");
let drogas = [];

adicionarDroga.addEventListener("click", () => {
  drogas.push("\n"+document.getElementById("drogas").value); 
  console.log("Adicionado");
  document.getElementById("drogas-adicionadas").innerText = drogas;
})
calcular.addEventListener("click", () => {
  updateTable()
  console.log("Calcular")
})

function updateTable() {
let idade = document.getElementById("idade").value;
let peso = document.getElementById("peso").value;


  document.getElementById("tabela").innerHTML = '';
  const tbl = document.getElementById("tabela");
  const tblBody = document.createElement("tbody");
 
  const row_heading = document.createElement("tr");
  const cell_idade = document.createElement("td");
  cell_idade.appendChild(document.createTextNode("Idade: "+idade+"anos Peso: "+peso+"Kg"));
  row_heading.appendChild(cell_idade);
  tblBody.appendChild(row_heading);

  drogas.forEach((droga) => {
    const row = document.createElement("tr");
    const cell = document.createElement("td");

    cell.appendChild(document.createTextNode(droga));
    row.appendChild(cell);
    tblBody.appendChild(row);

    //considerar retirar a quebra de linha
    if (droga === "\nAdrenalina 1:10.000") {
      const row = document.createElement("tr");
      const calculo = peso * 0.2;
      const diluicao = calculo * 9;

      // posologia 
      let cell1 = document.createElement("td");
      cell1.textContent = "0.01 a 0.03 mg/Kg - 1ml/0.1mg";
      row.appendChild(cell1);
      
      // dose 
      let cell2 = document.createElement("td");
      cell2.textContent = calculo + "ml (0.02mg/Kg)"+ "diluir em "+diluicao+"ml de água destilada";
      row.appendChild(cell2);
      
      // obs
      let cell3 = document.createElement("td");
      cell3.textContent = "Dose máxima 1mg/dose";
      row.appendChild(cell3);

      tblBody.appendChild(row);
    
    } else if (droga === "\nAdrenalina 1:1.000") {
      const row = document.createElement("tr");
      const calculo = peso * 0.02; //adrenalina mais concentrada
      const diluicao = calculo * 9;

      // posologia 
      let cell1 = document.createElement("td");
      cell1.textContent = "0.01 a 0.03 mg/Kg - 1ml/1mg";
      row.appendChild(cell1);

      // dose 
      let cell2 = document.createElement("td");
      cell2.textContent = calculo+"ml (0.02mg/Kg); diluir em "+diluicao+"ml de água destilada";
      row.appendChild(cell2);

      // obs
      let cell3 = document.createElement("td");
      cell3.textContent = "Dose máxima 1mg/dose";
      row.appendChild(cell3);

      tblBody.appendChild(row);

    } else if (droga === "\nAtropina 0.25mg/ml") {
    }
  })

  tbl.appendChild(tblBody);
}
