
let search = window.location.search
let params = new URLSearchParams(search)
let pokeName = params.get("name")
console.log(pokeName);


let sectionElm = document.createElement("section")
sectionElm.classList.add("columns")

fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
.then(response => response.json())
.then(pokemon => {
    sectionElm.innerHTML = `
        <figure class="pokedex__pokemon-details">
        <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
        </figure>
    `

document.querySelector("main").append(sectionElm);
})
