//adding and displaying notes 
showNotes(); 
let addBtn = document.getElementById('addBtn');

addBtn.addEventListener('click', function (e) {

    let addTxt = document.getElementById('addTxt');

    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notes = [];
    } else {
        notes = JSON.parse(notes);
    }

    notes.push(addTxt.value);
    localStorage.setItem('notes', JSON.stringify(notes));
    addTxt.value = "";
    showNotes();
});

function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notes = [];
    } else {
        notes = JSON.parse(notes);
    }

    let html = ``;

    notes.forEach(function (element, index) {
        html += `  
                <div class="card" id="card">   
                <h1>NOTES - ${index}</h1> 
                <p>${element}</p> 
                <button id="${index}" onclick="deleteNote(this.id)"> DELETE NOTE </button>
                </div>`;
    });

    let notesElement = document.getElementById('card-wrapper');
    if (notes.length != 0) {
        notesElement.innerHTML = html;
    } else {
        notesElement.innerHTML = `NO NOTES ADDED :(`;
    }
}


function deleteNote(index) {
    let boolValue = confirm('DO YOU REALLY WANT TO DELETE THIS NOTE PERMANENTLY');

    if (boolValue) {

        let notes = localStorage.getItem('notes');
        if (notes == null) {
            notes = [];
        } else {
            notes = JSON.parse(notes);
        }

        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        showNotes();
    }
}

let searchbar = document.getElementById('searchBar'); 
searchbar.addEventListener('input', function(){ 
    let inputValue = searchbar.value.toLowerCase(); 

    let noteCards = document.getElementsByClassName('card'); 
    Array.from(noteCards).forEach(function(element){ 
        let cardText = element.getElementsByTagName('p')[0].innerText;  
        if(cardText.includes(inputValue)) {  
            console.log(cardText);
            element.style.display = 'block';
        } else{ 
            element.style.display = 'none';
        }
    })
});
