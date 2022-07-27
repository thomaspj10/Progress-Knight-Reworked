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