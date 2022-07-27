function update() {
    gameManager.loop()
}

gameManager.load()

// _game.load()
setTab(game.getSave().ui.currentTab)
update()
setInterval(update, 1000 / UPDATE_SPEED)