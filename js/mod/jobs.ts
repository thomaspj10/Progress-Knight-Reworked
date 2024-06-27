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

new JobCategory("Yugle", "#b52454", category => {
    category.addTask("Unpaid Intern", "", task => {
        task.setIncome(0)
        task.setDifficultyMultiplier(100)
    })
    category.addTask("Junior Developer", "", task => {
        task.setIncome(10)
        task.setDifficultyMultiplier(200)
        task.addRequirement(new TaskRequirement("Unpaid Intern", 10))
        task.addRequirement(new TaskRequirement("Algorithms", 10))
    })
    category.addTask("Software Engineer", "", task => {
        task.setIncome(18)
        task.setDifficultyMultiplier(400)
        task.addRequirement(new TaskRequirement("Junior Developer", 10))
        task.addRequirement(new TaskRequirement("Software Architecture", 10))
    })
    category.addTask("Project Lead", "", task => {
        task.setIncome(25)
        task.setDifficultyMultiplier(800)
        task.addRequirement(new TaskRequirement("Software Engineer", 10))
        task.addRequirement(new TaskRequirement("Algorithms", 25))
    })
    category.addTask("Team Lead", "", task => {
        task.setIncome(45)
        task.setDifficultyMultiplier(1600)
        task.addRequirement(new TaskRequirement("Project Lead", 10))
        task.addRequirement(new TaskRequirement("Leadership", 25))
    })
    category.addTask("Senior Architect", "", task => {
        task.setIncome(100)
        task.setDifficultyMultiplier(3200)
        task.addRequirement(new TaskRequirement("Team Lead", 10))
        task.addRequirement(new TaskRequirement("Software Architecture", 50))
    })
    category.addTask("Division Lead", "", task => {
        task.setIncome(250)
        task.setDifficultyMultiplier(6400)
        task.addRequirement(new TaskRequirement("Senior Architect", 10))
        task.addRequirement(new TaskRequirement("Leadership", 50))
    })
    category.addTask("Product Manager", "", task => {
        task.setIncome(500)
        task.setDifficultyMultiplier(12800)
        task.addRequirement(new TaskRequirement("Division Lead", 10))
        task.addRequirement(new TaskRequirement("Leadership", 100))
    })
    category.addTask("Yugle CTO", "", task => {
        task.setIncome(1500)
        task.setDifficultyMultiplier(25600)
        task.addRequirement(new TaskRequirement("Product Manager", 10))
    })
    category.addTask("Yugle CEO", "", task => {
        task.setIncome(2500)
        task.setDifficultyMultiplier(51200)
        task.addRequirement(new TaskRequirement("Yugle CTO", 10))
    })
})

new JobCategory("The Army", "#239672", category => {
    category.addTask("Private", "", task => {
        task.setIncome(5)
        task.setDifficultyMultiplier(200)
    })
    category.addTask("Corporal", "", task => {
        task.setIncome(12)
        task.setDifficultyMultiplier(400)
        task.addRequirement(new TaskRequirement("Private", 10))
    })
    category.addTask("Sergeant", "", task => {
        task.setIncome(20)
        task.setDifficultyMultiplier(800)
        task.addRequirement(new TaskRequirement("Corporal", 10))
        task.addRequirement(new TaskRequirement("Leadership", 10))
    })
    category.addTask("Major", "", task => {
        task.setIncome(40)
        task.setDifficultyMultiplier(1600)
        task.addRequirement(new TaskRequirement("Sergeant", 10))
        task.addRequirement(new TaskRequirement("Leadership", 25))
    })
    category.addTask("Corporal", "", task => {
        task.setIncome(85)
        task.setDifficultyMultiplier(3200)
        task.addRequirement(new TaskRequirement("Major", 10))
        task.addRequirement(new TaskRequirement("Leadership", 50))
    })
    category.addTask("Colonel", "", task => {
        task.setIncome(225)
        task.setDifficultyMultiplier(6400)
        task.addRequirement(new TaskRequirement("Corporal", 10))
        task.addRequirement(new TaskRequirement("Leadership", 100))
    })
    category.addTask("General", "", task => {
        task.setIncome(600)
        task.setDifficultyMultiplier(12800)
        task.addRequirement(new TaskRequirement("Colonel", 10))
        task.addRequirement(new TaskRequirement("Leadership", 200))
    })
})

new JobCategory("Dark Plateau", "#662691", category => {
    category.addTask("Junior Scientist", "", task => {
        task.setIncome(35)
        task.setDifficultyMultiplier(400)
        task.addRequirement(new TaskRequirement("Quantum Science", 50))
    })
    category.addTask("Scientist", "", task => {
        task.setIncome(135)
        task.setDifficultyMultiplier(400 * 2)
        task.addRequirement(new TaskRequirement("Junior Scientist", 10))
        task.addRequirement(new TaskRequirement("Quantum Science", 100))
    })
    category.addTask("Senior Scientist", "", task => {
        task.setIncome(200)
        task.setDifficultyMultiplier(400 * 4)
        task.addRequirement(new TaskRequirement("Scientist", 10))
        task.addRequirement(new TaskRequirement("Quantum Science", 150))
    })
    category.addTask("Project Manager", "", task => {
        task.setIncome(450)
        task.setDifficultyMultiplier(400 * 8)
        task.addRequirement(new TaskRequirement("Senior Scientist", 10))
        task.addRequirement(new TaskRequirement("Quantum Science", 200))
    })
    category.addTask("Operation Nova Scientist", "", task => {
        task.setIncome(800)
        task.setDifficultyMultiplier(400 * 16)
        task.addRequirement(new TaskRequirement("Project Manager", 10))
        task.addRequirement(new TaskRequirement("Quantum Science", 300))
    })
    category.addTask("Operation Nova Manager", "", task => {
        task.setIncome(1500)
        task.setDifficultyMultiplier(400 * 32)
        task.addRequirement(new TaskRequirement("Operation Nova Scientist", 10))
        task.addRequirement(new TaskRequirement("Quantum Science", 400))
    })
    category.addTask("Operation Nova Investor", "", task => {
        task.setIncome(3500)
        task.setDifficultyMultiplier(400 * 64)
        task.addRequirement(new TaskRequirement("Operation Nova Manager", 10))
        task.addRequirement(new TaskRequirement("Quantum Science", 500))
    })
})
