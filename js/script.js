const enemiesContainer = document.getElementById('enemies-container')
const enemyItem = document.getElementsByClassName(`enemy-item`)

const enemiesURL = "./json/enemies.json"
let arrayEnemies = []


//fetch arrayEnemies

async function loadEnemies() {
    try {
        const response = await fetch(enemiesURL)

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`)
        }
        arrayEnemies = await response.json()

        console.log(`${enemiesURL} data load succefully: `, arrayEnemies)

        return arrayEnemies
    }
    catch (error) {
        console.error("Error loading enemies", error)
        return []
    }
}

//create enemy cards

function createEnemyCards(enemies) {
    if (!enemies || enemies.length == 0) {
        enemiesContainer.innerHTML = `<h2>Error</h2>
        <p>No enemies found in the bestiary</p>`
        return
    }

    let htmlCard = `<h2>Bestiary</h2> <ul class="enemies-display">`

    enemies.forEach(enemy => {
        htmlCard += `<li class="enemy-item"> <img src="${enemy.img}" alt="${enemy.name} img" class="monster-img">
                    <ul>
                    <li>Name: ${enemy.name}</li>
                    <li>Type: ${enemy.type}</li>
                    <li>Level: ${enemy.level}</li>
                    <li>Description: ${enemy.description}</li>
                    </ul>
                    </li>`

    })

    htmlCard += `</ul>`

    enemiesContainer.innerHTML = htmlCard


}

async function init() {
    await loadEnemies()
    createEnemyCards(arrayEnemies)
}


init()


