// BunMasters
new JobCategory("BunMasters", "#55a630", category => {
    category.addTask("Burger Flipper", "Flipping burgers is hard work. You have to work long hours with minimal pay.", task => {
        task.setIncome(4)
        task.setDifficultyMultiplier(100)
    })
    category.addTask("Chief Flipper", "You are the best burger flipper of your restaurant. You get paid a little bit more due to your experience.", task => {
        task.setIncome(6)
        task.setDifficultyMultiplier(150)
        task.addRequirement(new TaskRequirement("Burger Flipper", 10))
    })
    category.addTask("Kitchen Manager", "You are responsible for the entire kitchen making sure every customer gets the correct food.", task => {
        task.setIncome(10)
        task.setDifficultyMultiplier(200)
        task.addRequirement(new TaskRequirement("Chief Flipper", 10))
    })
    category.addTask("Shift Manager", "The shift manager has to manage every employee of the restaurant. Hard work but it does pay of.", task => {
        task.setIncome(15)
        task.setDifficultyMultiplier(400)
        task.addRequirement(new TaskRequirement("Kitchen Manager", 10))
        task.addRequirement(new TaskRequirement("Efficiency", 10))
    })
    category.addTask("Assistant Manager", "You are the right hand of the restaurant manager, helping them where possible.", task => {
        task.setIncome(25)
        task.setDifficultyMultiplier(800)
        task.addRequirement(new TaskRequirement("Shift Manager", 10))
    })
    category.addTask("Restaurant Manager", "The pay as restaurant manager is quite high. It does give you quite a bit of stress.", task => {
        task.setIncome(75)
        task.setDifficultyMultiplier(1600)
        task.addRequirement(new TaskRequirement("Assistant Manager", 10))
        task.addRequirement(new TaskRequirement("Leadership", 25))
    })
    category.addTask("Regional Manager", "The regional manager requires a lot of leadership, but the pay is substantial", task => {
        task.setIncome(250)
        task.setDifficultyMultiplier(3200)
        task.addRequirement(new TaskRequirement("Restaurant Manager", 10))
        task.addRequirement(new TaskRequirement("Leadership", 50))
    })
    category.addTask("Chief Strategist", "As the chief strategist of BunMasters you have a large say in the policy.", task => {
        task.setIncome(1000)
        task.setDifficultyMultiplier(6400)
        task.addRequirement(new TaskRequirement("Regional Manager", 10))
        task.addRequirement(new TaskRequirement("Leadership", 100))
    })
    category.addTask("BunMasters CEO", "Being the CEO of BunMasters takes a lot of time. BunMasters does pay a lot of bonusses for good decisions", task => {
        task.setIncome(2000)
        task.setDifficultyMultiplier(12800)
        task.addRequirement(new TaskRequirement("Chief Strategist", 10))
    })
})

// Yugle
new JobCategory("Yugle", "#b52454", category => {
    category.addTask("Unpaid Intern", "", task => {
        task.setIncome(0)
        task.setDifficultyMultiplier(100)
    })
    category.addTask("Junior Developer", "", task => {
        task.setIncome(10)
        task.setDifficultyMultiplier(200)
        task.addRequirement(new TaskRequirement("Unpaid Intern", 10))
    })
    category.addTask("Software Engineer", "", task => {
        task.setIncome(18)
        task.setDifficultyMultiplier(400)
        task.addRequirement(new TaskRequirement("Junior Developer", 10))
    })
    category.addTask("Project Lead", "", task => {
        task.setIncome(25)
        task.setDifficultyMultiplier(800)
        task.addRequirement(new TaskRequirement("Software Engineer", 10))
    })
    category.addTask("Team Lead", "", task => {
        task.setIncome(45)
        task.setDifficultyMultiplier(1600)
        task.addRequirement(new TaskRequirement("Project Lead", 10))
    })
    category.addTask("Senior Architect", "", task => {
        task.setIncome(100)
        task.setDifficultyMultiplier(3200)
        task.addRequirement(new TaskRequirement("Team Lead", 10))
    })
    category.addTask("Division Lead", "", task => {
        task.setIncome(250)
        task.setDifficultyMultiplier(6400)
        task.addRequirement(new TaskRequirement("Senior Architect", 10))
    })
    category.addTask("Product Manager", "", task => {
        task.setIncome(500)
        task.setDifficultyMultiplier(12800)
        task.addRequirement(new TaskRequirement("Division Lead", 10))
    })
    category.addTask("CTO", "", task => {
        task.setIncome(1500)
        task.setDifficultyMultiplier(25600)
        task.addRequirement(new TaskRequirement("Product Manager", 10))
    })
    category.addTask("Yugle CEO", "", task => {
        task.setIncome(2500)
        task.setDifficultyMultiplier(51200)
        task.addRequirement(new TaskRequirement("CTO", 10))
    })
})

// Dark Plateau
new JobCategory("Dark Plateau", "#662691", category => {
    
})

// Sellf Improvement
new SkillCategory("Self Improvement", "#2d9621", category => {
    category.addTask("Study Skills", "", task => {
        task.setEffect(EffectType.EXPERIENCE, () => {
            return 1 + task.getLevel() * 0.01
        }, task => {
            return task.getCategory().getType() == CategoryType.SKILL
        })
        task.setEffectText("Skill XP")
    })
    // TODO - Getting Stuff Done
    category.addTask("Meditation", "", task => {
        task.setEffect(EffectType.ENERGY, () => {
            return 1 + task.getLevel() * 0.01
        })
        task.setEffectText("Energy")
    })
})

// Buisness
new SkillCategory("Buisness", "#32a6a8", category => {
    category.addTask("Leadership", "", task => {
        task.setEffect(EffectType.EXPERIENCE, () => {
            return 1 + task.getLevel() * 0.02
        }, task => {
            return task.getCategory().getType() == CategoryType.JOB
        })
        task.setEffectText("Jobs XP")
    })
    category.addTask("Efficiency", "", task => {
        task.setDifficultyMultiplier(200)
        task.setEffect(EffectType.INCOME, () => {
            return 1 + task.getLevel() * 0.01
        })
        task.setEffectText("Income")
    })
})

// Computer Science
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

// Housing
new ItemCategory("Housing", "#55a630", ItemCategoryType.SINGLE, category => {
    category.addTask("Parents Basement", "", task => {
        task.setCost(0)
        task.setEffect(EffectType.HAPPINESS, () => {
            return 1.1
        })
        task.setEffectText("Happiness")
        task.addRequirement(new CurrencyRequirement(CurrencyType.COINS, task.getCost() * 100))
    })
    category.addTask("Shared Apartment", "", task => {
        task.setCost(15)
        task.setEffect(EffectType.HAPPINESS, () => {
            return 1.2
        })
        task.setEffectText("Happiness")
        task.addRequirement(new CurrencyRequirement(CurrencyType.COINS, task.getCost() * 100))
    })
    category.addTask("Studio Apartment", "", task => {
        task.setCost(50)
        task.setEffect(EffectType.HAPPINESS, () => {
            return 1.3
        })
        task.setEffectText("Happiness")
        task.addRequirement(new CurrencyRequirement(CurrencyType.COINS, task.getCost() * 100))
    })
    category.addTask("Normal Apartment", "", task => {
        task.setCost(100)
        task.setEffect(EffectType.HAPPINESS, () => {
            return 1.5
        })
        task.setEffectText("Happiness")
        task.addRequirement(new CurrencyRequirement(CurrencyType.COINS, task.getCost() * 100))
    })
    category.addTask("Small House", "", task => {
        task.setCost(500)
        task.setEffect(EffectType.HAPPINESS, () => {
            return 1.75
        })
        task.setEffectText("Happiness")
        task.addRequirement(new CurrencyRequirement(CurrencyType.COINS, task.getCost() * 100))
    })
    category.addTask("House", "", task => {
        task.setCost(2500)
        task.setEffect(EffectType.HAPPINESS, () => {
            return 2
        })
        task.setEffectText("Happiness")
        task.addRequirement(new CurrencyRequirement(CurrencyType.COINS, task.getCost() * 100))
    })
    category.addTask("Penthouse", "", task => {
        task.setCost(10000)
        task.setEffect(EffectType.HAPPINESS, () => {
            return 2.5
        })
        task.setEffectText("Happiness")
        task.addRequirement(new CurrencyRequirement(CurrencyType.COINS, task.getCost() * 100))
    })
    category.addTask("Mansion", "", task => {
        task.setCost(50000)
        task.setEffect(EffectType.HAPPINESS, () => {
            return 3
        })
        task.setEffectText("Happiness")
        task.addRequirement(new CurrencyRequirement(CurrencyType.COINS, task.getCost() * 100))
    })
    category.addTask("Villa", "", task => {
        task.setCost(200000)
        task.setEffect(EffectType.HAPPINESS, () => {
            return 4
        })
        task.setEffectText("Happiness")
        task.addRequirement(new CurrencyRequirement(CurrencyType.COINS, task.getCost() * 100))
    })
    category.addTask("Palace", "", task => {
        task.setCost(1000000)
        task.setEffect(EffectType.HAPPINESS, () => {
            return 5
        })
        task.setEffectText("Happiness")
        task.addRequirement(new CurrencyRequirement(CurrencyType.COINS, task.getCost() * 100))
    })
})

// Food
new ItemCategory("Food", "#217aa3", ItemCategoryType.SINGLE, category => {
    category.addTask("Student Cuisine", "", task => {
        task.setCost(10)
        task.setEffect(EffectType.HEALTH, () => {
            return 1.1
        })
        task.setEffectText("Health")
        task.addRequirement(new CurrencyRequirement(CurrencyType.COINS, task.getCost() * 100))
    })
    category.addTask("BunMasters", "", task => {
        task.setCost(25)
        task.setEffect(EffectType.HEALTH, () => {
            return 1.2
        })
        task.setEffectText("Health")
        task.addRequirement(new CurrencyRequirement(CurrencyType.COINS, task.getCost() * 100))
    })
    category.addTask("Regular Cooking", "", task => {
        task.setCost(75)
        task.setEffect(EffectType.HEALTH, () => {
            return 1.3
        })
        task.setEffectText("Health")
        task.addRequirement(new CurrencyRequirement(CurrencyType.COINS, task.getCost() * 100))
    })
    category.addTask("Fancy Cooking", "", task => {
        task.setCost(250)
        task.setEffect(EffectType.HEALTH, () => {
            return 1.5
        })
        task.setEffectText("Health")
        task.addRequirement(new CurrencyRequirement(CurrencyType.COINS, task.getCost() * 100))
    })
    category.addTask("Chef", "", task => {
        task.setCost(1000)
        task.setEffect(EffectType.HEALTH, () => {
            return 1.75
        })
        task.setEffectText("Health")
        task.addRequirement(new CurrencyRequirement(CurrencyType.COINS, task.getCost() * 100))
    })
    category.addTask("Three Star Chef", "", task => {
        task.setCost(5000)
        task.setEffect(EffectType.HEALTH, () => {
            return 2
        })
        task.setEffectText("Health")
        task.addRequirement(new CurrencyRequirement(CurrencyType.COINS, task.getCost() * 100))
    })
    category.addTask("Five Star Chef", "", task => {
        task.setCost(50000)
        task.setEffect(EffectType.HEALTH, () => {
            return 2.5
        })
        task.setEffectText("Health")
        task.addRequirement(new CurrencyRequirement(CurrencyType.COINS, task.getCost() * 100))
    })
    category.addTask("Molecular Cooking", "", task => {
        task.setCost(2500000)
        task.setEffect(EffectType.HEALTH, () => {
            return 3
        })
        task.setEffectText("Health")
        task.addRequirement(new CurrencyRequirement(CurrencyType.COINS, task.getCost() * 100))
    })
})

// Companions
new ItemCategory("Companions", "#a83264", ItemCategoryType.MULTI, category => {
    category.addTask("Cleaner", "", task => {
        task.setCost(100)
        task.setEffect(EffectType.HAPPINESS, () => {
            return 1.25
        })
        task.setEffectText("Health")
        task.addRequirement(new CurrencyRequirement(CurrencyType.COINS, task.getCost() * 100))
    })
    category.addTask("Research Assistant", "", task => {
        task.setCost(500)
        task.setEffect(EffectType.EXPERIENCE, () => {
            return 1.5
        }, task => {
            return task.getCategory().getType() == CategoryType.SKILL
        })
        task.setEffectText("Skill XP")
        task.addRequirement(new CurrencyRequirement(CurrencyType.COINS, task.getCost() * 100))
    })
    category.addTask("Personal Secretary", "", task => {
        task.setCost(500)
        task.setEffect(EffectType.EXPERIENCE, () => {
            return 1.5
        }, task => {
            return task.getCategory().getType() == CategoryType.JOB
        })
        task.setEffectText("Job XP")
        task.addRequirement(new CurrencyRequirement(CurrencyType.COINS, task.getCost() * 100))
    })
    category.addTask("Life Coach", "", task => {
        task.setCost(5000)
        task.setEffect(EffectType.HAPPINESS, () => {
            return 1.25
        })
        task.setEffectText("Hapiness")
        task.addRequirement(new CurrencyRequirement(CurrencyType.COINS, task.getCost() * 100))
    })
    category.addTask("Fitness Instructor", "", task => {
        task.setCost(100000)
        task.setEffect(EffectType.ENERGY, () => {
            return 1.25
        })
        task.setEffectText("Health")
        task.addRequirement(new CurrencyRequirement(CurrencyType.COINS, task.getCost() * 100))
    })
    category.addTask("Personal Medic", "", task => {
        task.setCost(10000000)
        task.setEffect(EffectType.HEALTH, () => {
            return 1.5
        })
        task.setEffectText("Health")
        task.addRequirement(new CurrencyRequirement(CurrencyType.COINS, task.getCost() * 100))
    })
})

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
})