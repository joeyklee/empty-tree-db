

window.addEventListener('DOMContentLoaded', async () =>{
  let data;
  // const baseUrl = 'https://joeyklee-empty-tree-db.glitch.me';
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

    const options = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    }

    let results = await fetch("/api/v1/trees", options)
    results = await results.json();

    await updateView();
  })

  async function updateView(){
    // clear the view
    $locationsList.innerHTML = "";
    // get the data - Note we are making a whole new network request each time 
    data = await fetch("/api/v1/trees", {method:"GET"});
    data = await data.json();
    console.log(data);

    // update the dom
    data.forEach(item => {
      const $el = document.createElement('LI')
      $el.classList.add("location__item");
      $el.id = item.id;

      $el.innerHTML = `
      <p>latitude: ${item.latitude}</p>
      <p>longitude: ${item.longitude}</p>
      <p>empty: ${item.empty}</p>
      <button class="location__delete">delete</button>
      `

      $el.addEventListener('click', async(evt) => {
        evt.preventDefault();
        const id = evt.target.parentNode.id
        let deleteMessage = await fetch(baseUrl + `/api/v1/trees/${id}`, {method:"DELETE"});
        deleteMessage = await deleteMessage.json();
        alert(JSON.stringify(deleteMessage));
        await updateView()
      });

      $locationsList.appendChild($el);
    });
  }

})

