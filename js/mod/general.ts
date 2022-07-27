// Reduce the health based on the age.
new Effect(EffectType.HEALTH, () => {
    let modifier = Math.log(game.getSave().days / 365) / Math.log(30)
    if (modifier < 1) modifier = 1
    return 1 / modifier
})

// Reduce the hapiness when in debt.
new Effect(EffectType.HAPPINESS, () => {
    if (game.getIncome() - game.getExpense() < 0)
        return 0.75
    return 1
})

// Happiness * Health = Energy
new Effect(EffectType.ENERGY, () => {
    return Effect.getTotalEffect(EffectType.HAPPINESS) * Effect.getTotalEffect(EffectType.HEALTH)
})

// Experience *= Energy
new Effect(EffectType.EXPERIENCE, () => {
    return Effect.getTotalEffect(EffectType.ENERGY)
})

new RebirthOption("regularRebirth", () => {
    for (const job of game.getTasksByType(CategoryType.JOB)) {
        if (job.maxLevel < job.level)
            job.maxLevel = job.level
        job.level = 0
        job.experience = 0
    }
    for (const skill of game.getTasksByType(CategoryType.SKILL)) {
        if (skill.maxLevel < skill.level)
        skill.maxLevel = skill.level
        skill.level = 0
        skill.experience = 0
    }
    for (const item of game.getTasksByType(CategoryType.ITEM)) {
        item.selected = false
    }

    game.getSave().days = STARTING_AGE * 365
    game.getSave().currency.coins = 0
    game.getSave().paused = true

    game.getSave().ui.selectedJob = "Burger Flipper"
    game.getSave().ui.selectedSkill = "Study Skills"
    setTab("jobs")
})