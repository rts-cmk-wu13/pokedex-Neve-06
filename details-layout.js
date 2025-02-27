

let divElm = document.createElement("div")
divElm.id = "root"

divElm.innerHTML = `
    <header class="pokedex__header"></header>
    <main class="pokedex__main-details"></main>
    <footer class="pokedex__footer"></footer>
`

document.querySelector("body").append(divElm)