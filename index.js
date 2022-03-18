const inputEl = document.querySelector('#input-el')
const inputBtn = document.querySelector('#input-btn')
const ulEl = document.querySelector('#ul-el')
const deleteBtn = document.querySelector('#delete-btn')
const tabBtn = document.querySelector('#tab-btn')

// let myLinks = ["https://www.youtube.com/", 'https://flaviocopes.com/', 'https://scrimba.com/']

// localStorage.setItem('myLeads', JSON.stringify(myLinks))


const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'))
console.log(leadsFromLocalStorage)

// addToLocalStorage("https://stackoverflow.com/", "myLeads")
let myLinks = []
if(leadsFromLocalStorage){
    myLinks = leadsFromLocalStorage
    startLinks(myLinks)

}else(
    localStorage.setItem('myLeads', JSON.stringify([]))
)
console.log(myLinks)

tabBtn.addEventListener('click', ()=>{
    // const windowUrl = window.location.href//dobrze ale my bierzemy url z innego okna deFacto
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        const windowUrl = tabs[0].url
        if(myLinks.includes(windowUrl) === false){
            addToLocalStorage(windowUrl, "myLeads")
            createElement(windowUrl)
            myLinks.push(windowUrl)
        }
    })
    
    // console.log(windowUrl)
    // if(myLinks.includes(windowUrl) === false){
    //     addToLocalStorage(windowUrl, "myLeads")
    //     createElement(windowUrl)
    //     myLinks.push(windowUrl)
    // }
    
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
        addToLocalStorage(inputValue, "myLeads")
        createElement(inputValue)
    }
    inputEl.value = ''

})
function startLinks(array){
    array.forEach((element) => {
    // JSON.parse(localStorage.getItem('myLeads')).forEach((element) => {
    // myLinks.forEach((element) => {
        createElement(element)
    })
}

function createElement(el){
    let aEl = document.createElement('a')
    aEl.setAttribute('href', el)
    aEl.setAttribute('target', '_blank')
    // console.log(aEl)
    let liEl = document.createElement('li')
    liEl.textContent = el
    aEl.appendChild(liEl)
    ulEl.appendChild(aEl)
}


function addToLocalStorage(sth, key){
    if(JSON.parse(localStorage.getItem(key))){
    }else(
        localStorage.setItem('myLeads', JSON.stringify([]))
    )
    let array = Object.values(JSON.parse(localStorage.getItem(key)))
    if(array.includes(sth) === false){
        array.push(sth)
    }
    // console.log(array)
    localStorage.setItem(key, JSON.stringify(array))
    // console.log(JSON.parse(localStorage.getItem(key)))


}
