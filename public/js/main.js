window.addEventListener('DOMContentLoaded', async () =>{
  const baseUrl = 'http://localhost:3000';

  let data = await fetch(baseUrl + "/api/v1/trees", {method:"GET"});
  data = await data.json();
  console.log(data);

  const $main = document.querySelector('.main');

  data.forEach(item => {
    const $el = document.createElement('LI')
    $el.innerHTML = `
    <p>latitude: ${item.latitude}</p>
    <p>longitude: ${item.longitude}</p>
    <p>empty: ${item.empty}</p>
    `

    $main.appendChild($el);
  })
})