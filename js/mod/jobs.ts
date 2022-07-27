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
        task.addRequirement(new TaskRequirement("Efficiency", 5))
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

// The Army
new JobCategory("The Army", "#239672", category => {
    
})

// Dark Plateau
new JobCategory("Dark Plateau", "#662691", category => {
    
})