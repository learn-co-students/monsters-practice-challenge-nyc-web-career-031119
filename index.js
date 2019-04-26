//wait for DOM content to load
document.addEventListener('DOMContentLoaded',() => {
  //FEATURE: show first 50 monsters on page load

  //identify element(s) to modify
  const monsterContainer = document.getElementById('monster-container');
  const createMonster = document.getElementById('create-monster');
  const backButton = document.getElementById('back');
  const forwardButton = document.getElementById('forward');
  //create form
  const monsterForm = document.createElement('form');

  let pageNum = 1

  //callback function to render monster
  function renderMonster(monster){
    let monsterSpan = document.createElement('span');
    monsterSpan.innerHTML = `
    <h3>Name: ${monster.name}</h3>
    <h5>Age: ${monster.age}</h5>
    <p>Description: ${monster.description}</p>
    `
    //add to element
    hr = document.createElement('hr');
    monsterContainer.appendChild(monsterSpan,hr);
  }

  //communicate with API
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
    .then(res => res.json())
    //iterate through data array, render each monster
    .then(data => data.forEach((monster) => {
      renderMonster(monster);
    }));

  //FEATURE: add form to create monsters
    // create by name, age, description, 'create monster button'
    // save monster to API

  monsterForm.innerHTML = `
  <label> Monster Name: </label>
  <input type='text' id='monster-name'/>
  <label> Monster Age: </label>
  <input type='number' id='monster-age'/>
  <label> Monster Description: </label>
  <input type='text' id='monster-description'/>
  <input type='submit' value='Create Monster'/>
  `
  //listen for event
  monsterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //identify desired info
    let name = document.getElementById('monster-name');
    let age = document.getElementById('monster-age');
    let description = document.getElementById('monster-description');

    //communicate with API
    fetch('http://localhost:3000/monsters',{
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify (
        {name: `${name.value}`},
        {age: `${age.value}`},
        {description: `${description.value}`}
      )})
      .then(res => res.json())
      .then(monsterForm.reset())
    })

  //add form to element
  createMonster.appendChild(monsterForm);

  //FEATURE: page buttons
    // show button to navigate to next or previous 50 monsters

  //listen for event
  backButton.addEventListener('click', () => {
    //change page number
    pageNum -= 1;
    //conditional render
    if(pageNum === 0){
      pageNum += 1;
      window.alert('you are on the first page');
    } else {
      //clear page
      monsterContainer.innerHTML = '';
      //get data
      fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
        .then(res => res.json())
        //iterate and render
        .then(data => data.forEach((monster) => {
          renderMonster(monster);
        }))
    }
  })

  forwardButton.addEventListener('click', () => {
    //change page number
    pageNum += 1
    //get data
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
    .then(res => res.json())
    .then((monsters) => {
      //conditional render
      if(monsters.length === 0){
        pageNum -= 1;
        window.alert('no more monsters');
      } else {
        //clear page
        monsterContainer.innerHTML = '';
        //iterate and render
        monsters.forEach((monster) => {
          renderMonster(monster);
        })
      }
    })
  })
})
