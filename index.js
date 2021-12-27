const cardContainer = document.getElementById("cardContainer");
const spinner = document.getElementById("spinner");
const previus = document.getElementById("Previous");
const next = document.getElementById("Next");

let offset = 1;
let limit = 17;

previus.addEventListener("click", () => {
  if (offset != 1) {
    offset -= 18;
    removeChildNodes(cardContainer);
    fetchPokemons(offset, limit);
  }
});

next.addEventListener("click", () => {
  offset += 17;
  removeChildNodes(cardContainer);
  fetchPokemons(offset, limit);
});

const fetchDataPoke = async (id) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data = await response.json();
    const pokemon = {
      img: data.sprites.other.dream_world.front_default,
      name: data.name,
      id: data.id,
    };
    console.log(data);
    createCard(pokemon);
    spinner.style.display = "none";
  } catch (err) {
    console.error(err);
  }
};

function fetchPokemons(offset, limit) {
  spinner.style.display = "block";
  for (let i = offset; i <= offset + limit; i++) {
    fetchDataPoke(i);
  }
}

function createCard(pokemon) {
  const container = document.createElement("div");
  container.classList.add("card-container");

  const background = document.createElement("div");
  background.classList.add("background");

  const cardimg = document.createElement("div");
  cardimg.classList.add("card-img");

  const sprite = document.createElement("img");
  sprite.src = pokemon.img;

  const info = document.createElement("div");
  info.classList.add("card-info");

  const nombrepoke = document.createElement("h2");
  nombrepoke.classList.add("card-title");
  nombrepoke.textContent = pokemon.name;

  const parrafoid = document.createElement("p");
  parrafoid.classList.add("id-poke");
  parrafoid.textContent = `#${pokemon.id.toString().padStart(3, 0)} `;

  container.appendChild(background);
  cardimg.appendChild(sprite);
  container.appendChild(cardimg);
  info.appendChild(nombrepoke);
  info.appendChild(parrafoid);
  container.appendChild(info);

  cardContainer.appendChild(container);
}
function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
fetchPokemons(offset, limit);
