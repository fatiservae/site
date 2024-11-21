let cars = []; // Variável para armazenar os dados dos carros

// Carrega os dados do JSON externo
async function loadCars() {
  try {
    const response = await fetch('/carros.json');
    if (!response.ok) throw new Error('Erro ao carregar o JSON');
    cars = await response.json();

    // Preenche os campos de seleção
    const car1Select = document.getElementById('car1');
    const car2Select = document.getElementById('car2');

    cars.forEach(car => {
      const option1 = document.createElement('option');
      option1.value = car.id;
      option1.textContent = car.modelo;
      car1Select.appendChild(option1);

      const option2 = document.createElement('option');
      option2.value = car.id;
      option2.textContent = car.modelo;
      car2Select.appendChild(option2);
    });
  } catch (error) {
    console.error(error);
    alert('Erro ao carregar os dados dos carros.');
  }
}

// Compara os carros selecionados
function compareCars() {
  const car1Select = document.getElementById('car1');
  const car2Select = document.getElementById('car2');

  const car1Id = parseInt(car1Select.value);
  const car2Id = parseInt(car2Select.value);

  const car1 = cars.find(car => car.id === car1Id);
  const car2 = cars.find(car => car.id === car2Id);

  const resultTable = document.getElementById('resultTable').querySelector('tbody');
  resultTable.innerHTML = '';

  if (car1 && car2) {
    const keys = Object.keys(car1);
    keys.forEach(key => {
      if (key !== 'id') { // Ignorar o ID na comparação
        const row = document.createElement('tr');
        const cellFeature = document.createElement('td');
        const cellCar1 = document.createElement('td');
        const cellCar2 = document.createElement('td');

        cellFeature.textContent = key;
        cellCar1.textContent = car1[key];
        cellCar2.textContent = car2[key];

        row.appendChild(cellFeature);
        row.appendChild(cellCar1);
        row.appendChild(cellCar2);

        resultTable.appendChild(row);
      }
    });
  } else {
    alert('Selecione dois carros para comparar.');
  }
}

// Inicializa a aplicação
document.addEventListener('DOMContentLoaded', loadCars);
