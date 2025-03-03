
let search = window.location.search
let params = new URLSearchParams(search)
let pokeName = params.get("name")
console.log(pokeName);


let sectionElm = document.createElement("section")
// sectionElm.classList.add("columns")

fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
.then(response => {
    console.log(response.ok);
    
    if(!response.ok) {
        throw new Error("Den findes ikke!!! !")
    }
    return response.json()
})
.then(pokemon => {
            sectionElm.innerHTML = `
            
            <h2>${pokemon.name}</h2>
            `
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`)
    .then(response => response.json())
    .then(species => {

      
            
    

        let flavorTextEntry = species.flavor_text_entries.find(entry => entry.language.name === "en");
        let flavorText = flavorTextEntry ? flavorTextEntry.flavor_text.replace(/\n|\f/g, ' ') : "No description available.";
        
    sectionElm.innerHTML = `
        <figure class="pokedex__pokemon-details">
        <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
        </figure>
        <div class="pokedex__pokemon-info columns">
        <section>
            <p>${pokemon.weight} kg</p>
            <p>weight</p>
        </section>
        <section>
            <p>${pokemon.height} cm</p>
            <p>height</p>
        </section>
        <section>
           ${pokemon.abilities.map(function(singleAbility){
            return `
                <p>${singleAbility.ability.name}</p>
            `
            
           })}
        </section>
        <section class="pokedex__pokemon-flavortext">
        <h3 >${flavorText}</h3>
        </section>

        </div>

        <table class="pokedex__pokemon-stats">
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
})
}).catch(function(error) {
    console.log(error)
    
    sectionElm.innerHTML = `
        <h2>${error.message}</h2>
        <p>Go back to the <a href="index.html">details view</a></p>
        `

})
document.querySelector(".pokedex__main-details").append(sectionElm);
