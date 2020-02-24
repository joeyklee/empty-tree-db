

window.addEventListener('DOMContentLoaded', async () =>{
  let data;
  const baseUrl = 'https://joeyklee-empty-tree-db.glitch.me';
  // const baseUrl = 'http://localhost:3000';

  const $locationsList = document.querySelector('.locations__list');
  const $form = document.querySelector('.form');

  // initialize with an updated view
  await updateView();
  
  $form.addEventListener('submit', async (evt)=>{
    evt.preventDefault();
    const formData = new FormData($form);
    const newData = {
      latitude: Number(formData.get('latitude')),
      longitude: Number(formData.get('longitude')),
      empty: Boolean(formData.get('empty')),
    }

    console.log(newData);

    const options = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    }

    let results = await fetch(baseUrl + "/api/v1/trees", options)
    results = await results.json();
    console.log(results);

    await updateView();
  })

  async function updateView(){
    // clear the view
    $locationsList.innerHTML = "";
    // get the data - Note we are making a whole new network request each time 
    data = await fetch(baseUrl + "/api/v1/trees", {method:"GET"});
    data = await data.json();
    console.log(data);

    // update the dom
    data.forEach(item => {
      const $el = document.createElement('LI')
      $el.innerHTML = `
      <p>latitude: ${item.latitude}</p>
      <p>longitude: ${item.longitude}</p>
      <p>empty: ${item.empty}</p>
      `
      $locationsList.appendChild($el);
    });
  }

})

