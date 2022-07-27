const updateSpeed = 20
const baseLifeSpan = 60
const daysPerSecond = 6

function update() {
    gameManager.loop()
}

gameManager.load()

// _game.load()
setTab(game.getSave().ui.currentTab)
update()
setInterval(update, 1000 / updateSpeed)