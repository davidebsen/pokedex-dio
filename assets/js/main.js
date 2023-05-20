const pokemonListElement = document.getElementById('pokemonList');
const limit = 8;
let offset = 0;

const maxRecords = 152;
const maxWidth = 55;

function convertPokemonToHTML(pokemon) {
  return `
    <li class="pokemon ${pokemon.type}">
      <div class="main">
        <span class="name">${pokemon.name}</span>
        <span class="number">#${pokemon.id}</span>
      </div>
      <ol class="types">
        ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
      </ol>
      <img src="${pokemon.photo}" alt="">
      <div class="data">
        <div class="views">
          <span class="view-info ${pokemon.type}">Info</span>
          <span>Evolution</span>
          <span>Moves</span>
        </div>
        <div class="info">
          <p class="about">${pokemon.about}</p>
          <div>
            <div class="container">
              <span>HP</span>
              <span class="value">${pokemon.hp}</span>
              <span style="width: calc((${pokemon.hp} / 100) * ${maxWidth}%);" class="skills HP ${pokemon.type}"></span>
            </div>
            <div class="container">
              <span>ATK</span>
              <span class="value">${pokemon.atk}</span>
              <span style="width: calc((${pokemon.atk} / 100) * ${maxWidth}%); "class="skills ATK ${pokemon.type}"></span>
            </div>
            <div class="container">
              <span>DEF</span>
              <span class="value">${pokemon.def}</span>
              <span style="width: calc((${pokemon.def} / 100) * ${maxWidth}%);" class="skills DEF ${pokemon.type}"></span>
            </div>
            <div class="container">
              <span>SATK</span>
              <span class="value">${pokemon.satk}</span>
              <span style="width: calc((${pokemon.satk} / 100) * ${maxWidth}%);"  class="skills SATK ${pokemon.type}"></span>
            </div>
            <div class="container">
              <span>SDEF</span>
              <span class="value">${pokemon.sdef}</span>
              <span style="width: calc((${pokemon.sdef} / 100) * ${maxWidth}%);" class="skills SDEF ${pokemon.type}"></span>
            </div>
            <div class="container">
              <span>SPD</span>
              <span class="value">${pokemon.spd}</span>
              <span style="width: calc((${pokemon.spd} / 100) * ${maxWidth}%);"  class="skills SPD ${pokemon.type}"></span>
            </div>
          </div>
        </div>
        <div class="weakness">
          Weak to
          <ol class="types">
            ${pokemon.weakness.map(weak => `<li class=${weak}>${weak}</li>`).join('')}
          </ol>
        </div>
      </div>
    </li>
  `;
}

function loadMorePokemons(offset, limit) {
  poke_api.get_pokemons(offset, limit).then((pokemons = []) => {
    pokemonListElement.innerHTML += pokemons.map(convertPokemonToHTML).join('');
  });
}

loadMorePokemons(offset, limit);

window.onscroll = function() {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    offset += limit;
    if (offset <= maxRecords) {
      loadMorePokemons(offset, limit);
    }
  }
};
