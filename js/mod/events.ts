new GameEvent(event => {
    event.addText('You find a wallet with <span style="color: rgb(229, 193, 0);">1g </span> on the ground')
    event.addText("There is an address in there")
    event.addButton("Bring it to the owner", () => {
        game.getSave().story.wallet = "returned"
    })
    event.addButton("Keep it", () => {
        game.getSave().currency.coins += 10000
        game.getSave().story.wallet = "keep_it"
    })
    event.addRequirement(() => {
        return game.getSave().story.wallet == "not_chosen" && game.getSave().days / 365 >= 11
    })
})

new GameEvent(event => {
    event.addText("<h2>Groundhog</h2>")
    event.addText("Something feels wrong...")
    event.addText("Time has suddenly slowed down...")
    event.addText("A message on your phone: 'They are here. Reply \"goundhog\" to try again.'")
    event.addButton("Reply \"groundhog\"", () => {
        game.doRebirth("regularRebirth")
    })
    event.addRequirement(() => {
        return game.getSave().days / 365 >= BASE_LIFE_SPAN * Effect.getTotalEffect(EffectType.LIFESPAN)
    })
})
