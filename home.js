
/**
 * Extract id as string from url to pokemon
 * @param {string} pokemonUrl - a url to a pokemon from pokeApi 
 * @returns {string}
 */
function getIdFromPokemon(pokemonUrl) {
    return pokemonUrl.slice(0, -1).split("/").pop()
}

const artworkUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork"


const observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
        if(entry.isIntersecting){
            currentOffset = currentOffset + 50;
            if (currentOffset < 1304){

                fetchPokemon(currentOffset)
            } else {
                console.log("could not fetch pokemon");
                
            }
        }
    })
})

let headerElm = document.createElement("nav")
headerElm.innerHTML = `
    <nav>
        <h1>Pokedex</h1>
    </nav>
`

document.querySelector("header").append(headerElm)


// her begynder selve komponentet
let sectionElm = document.createElement("section")
sectionElm.className = "pokelist"

let currentOffset = 0 

function fetchPokemon(offset){

    
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=50`)
    .then(function(response) {
        return response.json()
    }).then(
        function(data) {
            sectionElm.innerHTML +=  data.results.map(pokemon => `
                <article class="pokedex__pokemon-container">
                <p class="pokedex__pokemon-number">#${getIdFromPokemon(pokemon.url).padStart(3, "0")}</p>
                <figure class="pokedex__pokemon-figure">
                <img src="${artworkUrl}/${getIdFromPokemon(pokemon.url)}.png" alt="${pokemon.name}">
                </figure>
                <p class="pokedex__pokemon-name">${pokemon.name}</p>
                <a class="pokedex__pokemon-link" href="/details.html?name=${pokemon.name}"></a>
                </article>
            `).join("")
            
            let observedPokemon = sectionElm.querySelector("article:nth-last-child(5)")
            observer.observe(observedPokemon)
        }
    )
    
    document.querySelector("main").append(sectionElm)
    
}

fetchPokemon(currentOffset)