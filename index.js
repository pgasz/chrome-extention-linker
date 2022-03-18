const inputEl = document.querySelector('#input-el')
const inputBtn = document.querySelector('#input-btn')
const ulEl = document.querySelector('#ul-el')
const deleteBtn = document.querySelector('#delete-btn')
const tabBtn = document.querySelector('#tab-btn')


const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLinks'))
console.log(leadsFromLocalStorage)

let myLinks = []
if(leadsFromLocalStorage){
    myLinks = leadsFromLocalStorage
    startLinks(myLinks)

}else(
    localStorage.setItem('myLinks', JSON.stringify([]))
)
console.log(myLinks)

tabBtn.addEventListener('click', ()=>{
    const windowUrl = window.location.href
    
    
    console.log(windowUrl)
    if(myLinks.includes(windowUrl) === false){
        addToLocalStorage(windowUrl, "myLinks")
        createElement(windowUrl)
        myLinks.push(windowUrl)
    }
    
})

deleteBtn.addEventListener("dblclick", ()=>{
    localStorage.clear()
    myLinks = []
    ulEl.innerHTML = ''
})

inputBtn.addEventListener("click", (e)=>{
    const inputValue = inputEl.value
    if(inputValue && myLinks.includes(inputValue) === false){
        console.log('tutaj w listenerze inlutBtn')
        myLinks.push(inputValue)
        addToLocalStorage(inputValue, "myLinks")
        createElement(inputValue)
    }
    inputEl.value = ''

})
function startLinks(array){
    array.forEach((element) => {
        createElement(element)
    })
}

function createElement(el){
    let aEl = document.createElement('a')
    aEl.setAttribute('href', el)
    aEl.setAttribute('target', '_blank')
    let liEl = document.createElement('li')
    liEl.textContent = el
    aEl.appendChild(liEl)
    ulEl.appendChild(aEl)
}


function addToLocalStorage(sth, key){
    if(JSON.parse(localStorage.getItem(key))){
    }else(
        localStorage.setItem('myLinks', JSON.stringify([]))
    )
    let array = Object.values(JSON.parse(localStorage.getItem(key)))
    if(array.includes(sth) === false){
        array.push(sth)
    }

    localStorage.setItem(key, JSON.stringify(array))
}
