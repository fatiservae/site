document.addEventListener('DOMContentLoaded', () => {

  const fileList = document.getElementById('fileList');
  const directory = '/files/';

  console.log(directory)
  fetch(directory)
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const html = parser.parseFromString(data, 'text/html');
      const files = html.querySelectorAll('a');

      files.forEach(file => {
        const fileName = file.textContent;
        //const theme = fileName.split('-')[0].trim(); // Assuming the theme is before the first '-'
        //const extension = fileName.split('.').pop();
        //const fileSize = ''; // You need server-side logic to get file sizes

        const listItem = document.createElement('li');
        const fileLink = document.createElement('a');
        fileLink.href = fileName;
        //fileLink.textContent = `${fileName} - ${theme} - ${extension} - ${fileSize}`;
        fileLink.setAttribute('download', '');
        listItem.innerHTML = fileName ;
        listItem.appendChild(fileLink);
        fileList.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('Erro ao buscar os arquivos:', error);
    });
});
