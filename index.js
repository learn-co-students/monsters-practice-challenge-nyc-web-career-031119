document.addEventListener('DOMContentLoaded', () => {
  const newMonst = document.querySelector('#create-monster');
  const monstCont = document.querySelector('#monster-container');
  const forward = document.querySelector('#forward')
  const backs = document.querySelector('#backs')


  let startI = 0;
  let endI = 50;
  let pageNum = 1

  monstCont.innerHTML = ''

  function fetchMonsters(pageNum) {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
      .then(resp => resp.json())
      .then(json => {
        for (let i = startI; i < json.length; i++){
          monstCont.innerHTML +=
            `<div>
              <h2> ${json[i].name} </h2>
              <h4> ${json[i].age} </h4>
              <p> ${json[i].description} </p>
            </div>`
        }
      })
  }
  fetchMonsters()

  forward.addEventListener('click', e => {
    monstCont.innerHTML = ''
    pageNum += 1
    fetchMonsters(pageNum)
    console.log(pageNum)
  })
  back.addEventListener('click', e => {
    if (pageNum > 1){
      monstCont.innerHTML = ''
      pageNum -= 1
      fetchMonsters(pageNum)
    }
    console.log(pageNum)
  })
})
