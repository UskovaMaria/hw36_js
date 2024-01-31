const apiUrl = 'https://swapi.dev/api/people';
const charactersPerPage = 10; 

async function fetchCharacters(page = 1) {
  const response = await fetch(`${apiUrl}/?page=${page}`);
  const data = await response.json();
  return data.results;
}

function parseImageId(url) {
  const segments = url.split('/');
  const id = segments[segments.length - 2];
  return id ? id : 'noimg.webp';
}

function createCharacterElement(character) {
  const characterId = parseImageId(character.url);
  const imageSrc = `http://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`;

  const characterElement = document.createElement('div');
  characterElement.className = 'character';
  characterElement.innerHTML = `<img src="${imageSrc}" alt="${character.name}"><br>${character.name}`;

  return characterElement;
}

function displayCharacters(characters) {
  const charactersBlock = document.querySelector('.characters__block');
  charactersBlock.innerHTML = '';

  characters.forEach((character) => {
    const characterElement = createCharacterElement(character);
    charactersBlock.appendChild(characterElement);
  });
}

function createPagination(totalPages, currentPage) {
  const paginationElement = document.querySelector('.pagination');
  paginationElement.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement('li');
    li.textContent = i;
    li.addEventListener('click', () => loadCharacters(i));
    
    if (i === currentPage) {
      li.classList.add('active');
    }

    paginationElement.appendChild(li);
  }
}

async function loadCharacters(page) {
  const characters = await fetchCharacters(page);
  displayCharacters(characters);

  const totalPages = Math.ceil(82 / charactersPerPage);
  createPagination(totalPages, page);
}

document.addEventListener('DOMContentLoaded', () => {
  loadCharacters(1);
});