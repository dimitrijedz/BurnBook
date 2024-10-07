// Selektuj elemente iz DOM-a
const burnForm = document.getElementById('burn-form');
const burnList = document.getElementById('burn-list');
const nicknameInput = document.getElementById('nickname');
const burnTextInput = document.getElementById('burn-text');

// Učitaj postojeće klevete iz LocalStorage-a
let burns = JSON.parse(localStorage.getItem('burns')) || [];

// Funkcija za prikazivanje kleveta
function renderBurns() {
  burnList.innerHTML = '';
  burns.forEach((burn, index) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${burn.nickname}:</strong> ${burn.text} <button onclick="deleteBurn(${index})">Delete</button>`;
    burnList.appendChild(li);
  });
}

// Funkcija za dodavanje nove klevete
function addBurn(e) {
  e.preventDefault();
  
  const nickname = nicknameInput.value.trim();
  const text = burnTextInput.value.trim();
  
  if (nickname && text) {
    const newBurn = { nickname, text };
    burns.push(newBurn);
    
    // Sačuvaj u LocalStorage
    localStorage.setItem('burns', JSON.stringify(burns));
    
    // Prikaži ažuriranu listu
    renderBurns();
    
    // Očisti polja za unos
    nicknameInput.value = '';
    burnTextInput.value = '';
  }
}

// Funkcija za brisanje klevete
function deleteBurn(index) {
  burns.splice(index, 1);
  
  // Ažuriraj LocalStorage
  localStorage.setItem('burns', JSON.stringify(burns));
  
  // Ažuriraj prikaz
  renderBurns();
}

// Dodaj event listener na formu
burnForm.addEventListener('submit', addBurn);

// Prikaži klevete kad se stranica učita
renderBurns();
