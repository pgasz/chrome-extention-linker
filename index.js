const inputEl = document.querySelector('#input-el');
const inputBtn = document.querySelector('#input-btn');
const ulEl = document.querySelector('#ul-el');
const deleteBtn = document.querySelector('#delete-btn');
const tabBtn = document.querySelector('#tab-btn');
const copyBtn = document.querySelector('#copy-btn');

function startLinks(array) {
    array.forEach((element, index) => {
        createElement(element, index);
    });
}

function createElement(el) {
    const aEl = document.createElement('a');
    aEl.setAttribute('href', el);
    aEl.setAttribute('target', '_blank');
    aEl.textContent = el;
    const liEl = document.createElement('li');
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa-close');
    deleteIcon.classList.add('fa');
    deleteIcon.addEventListener('click', (e) => {
        deleteElement(e.target.parentElement);
    });
    liEl.appendChild(aEl);
    liEl.appendChild(deleteIcon);
    ulEl.appendChild(liEl);
}

function deleteElement(element) {
    deleteFromLocalStorage(element.textContent);
    element.remove();
}

function addToLocalStorage(sth, key) {
    const myLinks = JSON.parse(localStorage.getItem(key));
    if (!myLinks) {
        localStorage.setItem('myLinks', JSON.stringify([]));
    }
    if (!myLinks.includes(sth)) {
        myLinks.push(sth);
    }
    localStorage.setItem(key, JSON.stringify(myLinks));
}

function deleteFromLocalStorage(value) {
    const myLinks = JSON.parse(localStorage.getItem('myLinks'));
    myLinks.splice(myLinks.indexOf(value), 1);
    localStorage.setItem('myLinks', JSON.stringify(myLinks));
}

function saveToClipboard(elementId) {
    const myLinks = JSON.parse(localStorage.getItem('myLinks'));
    const copyString = myLinks.reduce((result, e) => {
        return `${result}\n${e}`;
    }, '');
    navigator.clipboard.writeText(copyString);
}

function saveInput(inputValue) {
    if (inputValue && myLinks.includes(inputValue) === false) {
        myLinks.push(inputValue);
        addToLocalStorage(inputValue, 'myLinks');
        createElement(inputValue);
    }
    inputEl.value = '';
}

function deleteAll() {
    localStorage.setItem('myLinks', JSON.stringify([]));
    myLinks = [];
    ulEl.innerHTML = '';
}

function saveTab() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const windowUrl = tabs[0].url;
        if (!myLinks.includes(windowUrl)) {
            addToLocalStorage(windowUrl, 'myLinks');
            createElement(windowUrl);
            myLinks.push(windowUrl);
        }
    });
}

function enterSaveInput(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        saveInput(inputEl.value);
    }
}

tabBtn.addEventListener('click', () => {
    saveTab();
});

deleteBtn.addEventListener('dblclick', () => {
    deleteAll();
});

inputBtn.addEventListener('click', () => {
    saveInput(inputEl.value);
});

inputEl.addEventListener('keyup', (e) => {
    enterSaveInput(e);
});

var timer = null;
copyBtn.addEventListener('click', (event) => {
    saveToClipboard(event.target.id);
    const el = event.target;
    console.log(event.target);
    el.classList.add('active');
    clearTimeout(timer);
    timer = setTimeout(function () {
        el.classList.remove('active');
    }, 1500);
});

let myLinks = [];
const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLinks'));
if (leadsFromLocalStorage) {
    myLinks = leadsFromLocalStorage;
    startLinks(myLinks);
} else {
    localStorage.setItem('myLinks', JSON.stringify(myLinks));
}
