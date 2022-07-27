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