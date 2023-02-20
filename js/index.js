const monsterList = document.querySelector('#monster-container')
const form= document.querySelector('#create-monster')


function fetchMonsterData() {
    return fetch(`http://localhost:3000/monsters/?_limit=50`)
    .then(resp => resp.json())
    .then(json => getMonsters(json))
}

function getMonsters(monsters) {
    monsters.forEach(monster => {
        const monsterDiv=document.createElement('div');
        const h2= document.createElement('h2');
        const h4= document.createElement('h4')
        const p= document.createElement('p')
        h2.innerHTML=monster.name
        h4.innerHTML=`Age: ${monster.age}`
        p.innerHTML=`Bio: ${monster.description}`
        monsterList.appendChild(monsterDiv)
        monsterDiv.appendChild(h2)
        monsterDiv.appendChild(h4)
        monsterDiv.appendChild(p)
    })
}
fetchMonsterData()



function createForm() {
    const formDiv= document.createElement('div')
    const nameInput=document.createElement('input')
    const ageInput=document.createElement('input')
    const bioInput=document.createElement('input')
    const btn=document.createElement('button')
    nameInput.id='name'
    nameInput.placeholder='Name...'
    ageInput.id='age'
    ageInput.placeholder='Age...'
    bioInput.id='description'
    bioInput.placeholder='Description...'
    btn.innerHTML='Create'
    btn.addEventListener('click',(event) => {
        event.preventDefault()
        const newMonsterName = nameInput.value
        const newMonsterAge = ageInput.value
        const newMonsterBio = bioInput.value
            const newMonsterObj = {
                name : newMonsterName,
                age: newMonsterAge,
                bio: newMonsterBio
            }
            fetch (`http://localhost:3000/monsters`, {
                method: 'POST',
                headers:
                {
                  "Content-Type": "application/json",
                  Accept: "application/json"
                },
                body:JSON.stringify(newMonsterObj)
            })
            .then(resp=>resp.json())
            .then(event=> event)
            })
       
    form.appendChild(formDiv)
    formDiv.appendChild(nameInput)
    formDiv.appendChild(ageInput)
    formDiv.appendChild(bioInput)
    formDiv.appendChild(btn)
}
createForm()

function addNavButtons () {
    let forward = document.querySelector('#back')
    let back = document.querySelector('#forward')
    let page = 1
    back.addEventListener('click', ()=> {
        page++
        fetchMonsterData(page)
    })
    forward.addEventListener('click', () => {
        1<page? (page--,
        fetchMonsterData(page))
        :alert('Out of Monsters')
    })
}

addNavButtons()
