//variables

const enemiesContainer = document.getElementById('enemies-container')
const enemyItem = document.getElementsByClassName(`enemy-item`)

const enemiesURL = "./json/enemies.json"
let arrayEnemies = []
let enemyFilter


//async function to fetch arrayEnemies

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

//function to create enemy cards

function createEnemyCards(enemies) {
    if (!enemies || enemies.length == 0) {
        enemiesContainer.innerHTML = `<h2>Error</h2>
        <button class ="enemy-button" id = "monster-button">Monster</button> <button class ="enemy-button" id = "dragon-button">Dragon</button> 
    <button class ="enemy-button" id = "elemental-button">Elemental</button> <button class ="enemy-button" id = "insect-button">Insect</button> 
    <button class ="enemy-button" id = "fiend-button">Fiend</button> <button class ="enemy-button" id = "undead-button">Undead</button>
    <button class ="enemy-button" id = "one-button">1</button> <button class ="enemy-button" id = "two-button">2</button> 
    <button class ="enemy-button" id = "three-button">3</button> 
        <p>No enemies found in the bestiary</p>
        <ul class="enemies-display"></ul>`
        buttonEvents()
        return
    }

    let htmlCard = `<h2>Bestiary</h2>
    <button class ="enemy-button" id = "monster-button">Monster</button> <button class ="enemy-button" id = "dragon-button">Dragon</button> 
    <button class ="enemy-button" id = "elemental-button">Elemental</button> <button class ="enemy-button" id = "insect-button">Insect</button> 
    <button class ="enemy-button" id = "fiend-button">Fiend</button> <button class ="enemy-button" id = "undead-button">Undead</button>
    <button class ="enemy-button" id = "one-button">1</button> <button class ="enemy-button" id = "two-button">2</button> 
    <button class ="enemy-button" id = "three-button">3</button> 
    <ul class="enemies-display">`

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

    buttonEvents()

}

// function to fillter enemies

function filterEnemies(enemies, data, value) {
    return enemies.filter(enemy => {
        if (data === "level") {
            return enemy.level == value
        }
        if (data === "type") {
            return enemy.type.toLowerCase() === value.toLowerCase()
        }
        return true
    }
    )

}

// function to add button events

function buttonEvents() {
    const monsterButton = document.getElementById(`monster-button`)
    const dragonButton = document.getElementById(`dragon-button`)
    const elementalButton = document.getElementById(`elemental-button`)
    const insectButton = document.getElementById(`insect-button`)
    const fiendButton = document.getElementById(`fiend-button`)
    const undeadButton = document.getElementById(`undead-button`)

    const oneButton = document.getElementById(`one-button`)
    const twoButton = document.getElementById(`two-button`)
    const threeButton = document.getElementById(`three-button`)

    monsterButton.addEventListener(`click`, function () {
        enemyFilter = filterEnemies(arrayEnemies, "type", "monster")
        createEnemyCards(enemyFilter)
    })

    dragonButton.addEventListener(`click`, function () {
        enemyFilter = filterEnemies(arrayEnemies, "type", "dragon")
        createEnemyCards(enemyFilter)
    })

    elementalButton.addEventListener(`click`, function () {
        enemyFilter = filterEnemies(arrayEnemies, "type", "elemental")
        createEnemyCards(enemyFilter)
    })

    insectButton.addEventListener(`click`, function () {
        enemyFilter = filterEnemies(arrayEnemies, "type", "insect")
        createEnemyCards(enemyFilter)
    })

    fiendButton.addEventListener(`click`, function () {
        enemyFilter = filterEnemies(arrayEnemies, "type", "fiend")
        createEnemyCards(enemyFilter)
    })

    undeadButton.addEventListener(`click`, function () {
        enemyFilter = filterEnemies(arrayEnemies, "type", "undead")
        createEnemyCards(enemyFilter)
    })

    oneButton.addEventListener(`click`, function () {
        enemyFilter = filterEnemies(arrayEnemies, "level", 1)
        createEnemyCards(enemyFilter)
    })

    twoButton.addEventListener(`click`, function () {
        enemyFilter = filterEnemies(arrayEnemies, "level", 2)
        createEnemyCards(enemyFilter)
    })

    threeButton.addEventListener(`click`, function () {
        enemyFilter = filterEnemies(arrayEnemies, "level", 3)
        createEnemyCards(enemyFilter)
    })

}

// async function to wait for fetch

async function init() {
    await loadEnemies()
    enemyFilter = filterEnemies(arrayEnemies, "level", 1)
    createEnemyCards(enemyFilter)

}

// start program
init()





