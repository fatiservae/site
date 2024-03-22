function copiarTexto() {
  const texto = document.getElementById('vim').innerText;
  navigator.clipboard.writeText(texto)
    .then(() => console.log('Texto copiado com sucesso!'))
    .catch(err => console.error('Erro ao copiar texto:', err));
}

function colarTexto() {
  navigator.clipboard.readText()
    .then(texto => {
      document.getElementById('vim').innerText = texto;
      console.log('Texto colado com sucesso!');
    })
    .catch(err => console.error('Erro ao colar texto:', err));
}
