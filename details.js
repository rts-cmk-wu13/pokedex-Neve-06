
let search = window.location.search
let params = new URLSearchParams(search)
let pokeName = params.get("name")
console.log(pokeName);


let sectionElm = document.createElement("section")
sectionElm.classList.add("columns")

fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
.then(response => response.json())
.then(pokemon => {
    console.log(pokemon)
    sectionElm.innerHTML = `
        <figure class="pokedex__pokemon-details">
        <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
        </figure>
        <section>
            ${pokemon.types.map(function(singleType){
                return `
                    <p>${singleType.type.name}</p>
                `
            })}
        </section>
        <section>
           ${pokemon.abilities.map(function(singleAbility){
            return `
                ${singleAbility.ability.name}
            `
           })}
        </section>

        <table class="pokedex__pokemon-stats">
            <h3>Base Stats</h3>
            ${pokemon.stats.map(function(singleStat){
                return `
                <tr>
                <th>${singleStat.stat.name}</th>
                <td>${singleStat.base_stat}</td>
                <td class="pokedex__pokemon-progressbar"><meter id="file" max="250" value="${singleStat.base_stat}"></td>
                </tr>
                `
            }).join("")
            }
        </table>

    `

document.querySelector("main").append(sectionElm);
})
