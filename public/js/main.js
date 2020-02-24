window.addEventListener('DOMContentLoaded', async () =>{
  const baseUrl = 'https://joeyklee-empty-tree-db.glitch.me';

  let data = await fetch(baseUrl + "/api/v1/trees", {method:"GET"});
  data = await data.json();
  console.log(data);

  const $locationsList= document.querySelector('.locations__list');

  data.forEach(item => {
    const $el = document.createElement('LI')
    $el.innerHTML = `
    <p>latitude: ${item.latitude}</p>
    <p>longitude: ${item.longitude}</p>
    <p>empty: ${item.empty}</p>
    `

    $locationsList.appendChild($el);
  })



})