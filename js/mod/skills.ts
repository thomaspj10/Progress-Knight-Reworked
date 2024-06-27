new SkillCategory("Self Improvement", "#2d9621", category => {
    category.addTask("Study Skills", "Being good at studying helps you achieve your goals faster.", task => {
        task.setEffect(EffectType.EXPERIENCE, () => {
            return 1 + task.getLevel() * 0.01
        }, task => {
            return task.getCategory().getType() == CategoryType.SKILL
        })
        task.setEffectText("Skill XP")
    })
    // TODO - Getting Stuff Done
    category.addTask("Meditation", "You start your day with way more energy if you meditate each morning!", task => {
        task.setEffect(EffectType.HEALTH, () => {
            return 1 + task.getLevel() * 0.01
        })
        task.setEffectText("Health")
    })
})

new SkillCategory("Buisness", "#32a6a8", category => {
    category.addTask("Leadership", "Your co-workers will respect you way more if you are a good leader.", task => {
        task.setEffect(EffectType.EXPERIENCE, () => {
            return 1 + task.getLevel() * 0.02
        }, task => {
            return task.getCategory().getType() == CategoryType.JOB
        })
        task.setEffectText("Jobs XP")
    })
    category.addTask("Efficiency", "Being efficient at work increases your salary significantly.", task => {
        task.setEffect(EffectType.INCOME, () => {
            return 1 + task.getLevel() * 0.005
        })
        task.setEffectText("Income")
    })
})

new SkillCategory("Computer Science", "#fc0356", category => {
    category.addTask("Programming", "", task => {
        task.setDifficultyMultiplier(200)
        task.setEffect(EffectType.INCOME, () => {
            return 1 + task.getLevel() * 0.01
        }, task => {
            return task.getCategory().getName() == "Yugle"
        })
        task.setEffectText("Yugle Income")
    })
    category.addTask("Algorithms", "", task => {
        task.setDifficultyMultiplier(200)
        task.setEffect(EffectType.EXPERIENCE, () => {
            return 1 + task.getLevel() * 0.01
        }, task => {
            return task.getName() == "Programming"
        })
        task.setEffectText("Programming XP")
    })
    category.addTask("Software Architecture", "", task => {
        task.setDifficultyMultiplier(200)
        task.setEffect(EffectType.EXPERIENCE, () => {
            return 1 + task.getLevel() * 0.01
        }, task => {
            return task.getName() == "Programming"
        })
        task.setEffectText("Programming XP")
    })
})

new SkillCategory("School", "#ef42f5", category => {
    category.addTask("Quantum Science", "", task => {
        task.setEffect(EffectType.NONE, () => {
            return 1
        })
        task.setDifficultyMultiplier(400)
        task.setEffectText("Quantum Knowledge")
        task.addRequirement(new TaskRequirement("Study Skills", 100))
    })
})
