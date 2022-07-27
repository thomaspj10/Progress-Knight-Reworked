interface ITask {
    getName(): string
    getTooltip(): string
    getCategory(): ICategory<unknown>
    addRequirement(requirement: Requirement)
    hasCompletedRequirements(): boolean
}

abstract class Task implements ITask, ITickable, IRenderable, ISaveable {
    
    private name: string
    private tooltip: string
    protected category: Category<unknown>
    private requirements: Requirement[] = []

    constructor(name: string, tooltip: string, category: Category<unknown>) {
        this.name = name
        this.tooltip = tooltip
        this.category = category

        gameManager.registerISaveable(this)
        gameManager.registerITickable(this)
    }

    public getName(): string {
        return this.name
    }

    public getTooltip(): string {
        return this.tooltip
    }

    public getCategory(): ICategory<unknown> {
        return this.category
    }

    public addRequirement(requirement: Requirement) {
        this.requirements.push(requirement)
    }

    public getRequirements(): Requirement[] {
        return this.requirements
    }

    public hasCompletedRequirements(): boolean {
        for (const requirement of this.requirements) {
            if (!requirement.isCompleted())
                return false
        }
        return true
    }

    public abstract tick(): void;
    public abstract render(isInitialRender: boolean): void;
    public abstract load(): void;
    public abstract save(): void;
    public abstract select(): void;

}

abstract class ExperienceTask extends Task {

    public level: number = 0
    public maxLevel: number = 0
    public experience: number = 0
    private difficultyMultiplier: number = 100

    public setDifficultyMultiplier(difficultyMultiplier: number): void {
        this.difficultyMultiplier = difficultyMultiplier
    }

    public getLevel(): number {
        return this.level
    }

    public getMaxLevel(): number {
        return this.maxLevel
    }

    public getMaxExperience(): number {
        return Math.round(this.difficultyMultiplier * (this.level + 1) * Math.pow(game.getDifficulty(), this.level))
    }

    public getRemainingExperience(): number {
        return Math.round(this.getMaxExperience() - this.experience)
    }

    public getCurrentExperience(): number {
        return this.experience
    }

    public getMaxLevelMultiplier() {
        return 1 + this.maxLevel / 10
    }

    public getExperienceGain() {
        return 10 
            * Effect.getTotalEffect(EffectType.EXPERIENCE, this)
            * this.getMaxLevelMultiplier()
    }

    public increaseExperience() {
        this.experience += applySpeed(this.getExperienceGain())
        if (this.experience >= this.getMaxExperience()) {
            let excess = this.experience - this.getMaxExperience()
            while (excess >= 0) {
                this.level += 1
                excess -= this.getMaxExperience()
            }
            this.experience = this.getMaxExperience() + excess
        }
    }

}

interface IJob {
    setIncome(income: number)
    getIncome(): number
    setDifficultyMultiplier(difficultyMultiplier: number): void
}

class Job extends ExperienceTask implements IJob {

    private income: number = 10

    private row: HTMLElement

    public setIncome(income: number) {
        this.income = income
    }

    public getIncome(): number {
        return this.income 
            * (1 + Math.log10(this.level + 1))
            * Effect.getTotalEffect(EffectType.INCOME, this)
    }

    public select(): void {
        game.getSave().ui.selectedJob = this.getName()
    }

    public tick(): void {
        if (game.getSave().ui.selectedJob != this.getName()) return
        this.increaseExperience()

        game.getSave().currency.coins += applySpeed(this.getIncome())
    }

    public render(isInitialRender: boolean): void {
        if (isInitialRender) {
            this.row = createRow(this.getCategory(), this)
            this.category.getTable().appendChild(this.row)
            return
        }

        this.row.getElementsByClassName("level")[0].textContent = "" + this.getLevel()
        this.row.getElementsByClassName("xpGain")[0].textContent = format(this.getExperienceGain())
        this.row.getElementsByClassName("xpLeft")[0].textContent = format(this.getRemainingExperience())
        formatCoins(this.getIncome(), this.row.getElementsByClassName("income")[0])
        this.row.getElementsByClassName("maxLevel")[0].textContent = "" + this.getMaxLevel()

        const progressFill: HTMLElement = <HTMLElement> this.row.getElementsByClassName("progressFill")[0]
        progressFill.style.width = this.getCurrentExperience() / this.getMaxExperience() * 100 + "%"
        this.getName() == game.getSave().ui.selectedJob ? progressFill.classList.add("current") : progressFill.classList.remove("current")

        if (this.hasCompletedRequirements())
            this.row.classList.remove("hiddenTask")
        else
            this.row.classList.add("hiddenTask")
    }

    public save(): void {
        game.getSave().tasks[this.getName()] = {
            "level": this.getLevel(),
            "experience": this.getCurrentExperience(),
            "maxLevel": this.getMaxLevel()
        }
    }

    public load(): void {
        if (!(this.getName() in game.getSave().tasks)) return
        const data = game.getSave().tasks[this.getName()]

        this.level = data["level"]
        this.experience = data["experience"]
        this.maxLevel = data["maxLevel"]
    }

}

interface ISkill {
    setEffect(type: EffectType, effect: () => number, filter?: (task: Task) => boolean): void
    getEffect(): Effect
    getEffectText(): string
    setEffectText(effectText: string): void
    setDifficultyMultiplier(difficultyMultiplier: number): void
    getLevel(): number
}

class Skill extends ExperienceTask implements ISkill {

    private effect: Effect
    private effectText: string

    private row: HTMLElement

    public setEffect(type: EffectType, effect: () => number, filter?: (task: Task) => boolean) {
        this.effect = new Effect(type, effect)
        if (filter)
            this.effect.setFilter(filter)
    }

    public getEffect(): Effect {
        return this.effect
    }

    public getEffectText(): string {
        return this.effectText
    }

    public setEffectText(effectText: string) {
        this.effectText = effectText
    }

    public select(): void {
        game.getSave().ui.selectedSkill = this.getName()
    }
    
    public tick(): void {
        if (game.getSave().ui.selectedSkill != this.getName()) return
        this.increaseExperience()
    }

    public render(isInitialRender: boolean): void {
        if (isInitialRender) {
            this.row = createRow(this.getCategory(), this)
            this.category.getTable().appendChild(this.row)
            return
        }

        this.row.getElementsByClassName("level")[0].textContent = "" + this.getLevel()
        this.row.getElementsByClassName("xpGain")[0].textContent = format(this.getExperienceGain())
        this.row.getElementsByClassName("xpLeft")[0].textContent = format(this.getRemainingExperience())
        this.row.getElementsByClassName("maxLevel")[0].textContent = "" + this.getMaxLevel()
        this.row.getElementsByClassName("effect")[0].textContent = "x" + this.getEffect().getEffect().toFixed(2) + " " + this.getEffectText()

        const progressFill: HTMLElement = <HTMLElement> this.row.getElementsByClassName("progressFill")[0]
        progressFill.style.width = this.getCurrentExperience() / this.getMaxExperience() * 100 + "%"
        this.getName() == game.getSave().ui.selectedSkill ? progressFill.classList.add("current") : progressFill.classList.remove("current")

        if (this.hasCompletedRequirements())
            this.row.classList.remove("hiddenTask")
        else
            this.row.classList.add("hiddenTask")
    }

    public save(): void {
        game.getSave().tasks[this.getName()] = {
            "level": this.getLevel(),
            "experience": this.getCurrentExperience(),
            "maxLevel": this.getMaxLevel()
        }
    }

    public load(): void {
        if (!(this.getName() in game.getSave().tasks)) return
        const data = game.getSave().tasks[this.getName()]

        this.level = data["level"]
        this.experience = data["experience"]
        this.maxLevel = data["maxLevel"]
    }

}

interface IItem {
    setEffect(type: EffectType, effect: () => number, filter?: (task: Task) => boolean): void
    getEffect(): Effect
    getEffectText(): string
    setEffectText(effectText: string)
    setCost(cost: number)
    getCost(): number
    isSelected(): boolean
    setSelected(selected: boolean): void
}

class Item extends Task implements IItem {

    private effect: Effect
    private effectText: string
    
    protected cost: number
    public selected: boolean = false

    private row: HTMLElement
    private categoryType: ItemCategoryType

    constructor(name: string, tooltip: string, category: Category<IItem>, categoryType: ItemCategoryType) {
        super(name, tooltip, category)
        this.categoryType = categoryType
    }

    public setEffect(type: EffectType, effect: () => number, filter?: (task: Task) => boolean) {
        this.effect = new Effect(type, effect)
        this.effect.setGlobalFilter(() => {
            return this.selected
        })

        if (filter)
            this.effect.setFilter(filter)
    }

    public getEffect(): Effect {
        return this.effect
    }

    public getEffectText(): string {
        return this.effectText
    }

    public setEffectText(effectText: string) {
        this.effectText = effectText
    }

    public setCost(cost: number) {
        this.cost = cost;
    }

    public getCost(): number {
        return this.cost
    }

    public isSelected(): boolean {
        return this.selected
    }

    public setSelected(selected: boolean) {
        this.selected = selected
    }

    public select(): void {
        if (this.categoryType == ItemCategoryType.SINGLE) {
            for (const item of game.getTasksByType(CategoryType.ITEM)) {
                if (item == this) continue
                if (item.getCategory() != this.getCategory()) continue

                item.setSelected(false)
            }
        }
        this.selected = !this.selected
    }
    
    public tick(): void {
        if (!this.isSelected()) return
        
        game.getSave().currency.coins -= applySpeed(this.getCost())
    }

    public render(isInitialRender: boolean): void {
        if (isInitialRender) {
            this.row = createRow(this.getCategory(), this)
            this.category.getTable().appendChild(this.row)
            return
        }

        (<HTMLButtonElement> this.row.getElementsByClassName("button")[0]).disabled = game.getSave().currency.coins < this.getCost();
        (<HTMLElement> this.row.getElementsByClassName("active")[0]).style.backgroundColor = this.selected ? this.getCategory().getColor() : "white"

        this.row.getElementsByClassName("effect")[0].textContent = "x" + this.getEffect().getEffect() + " " + this.getEffectText()
        formatCoins(this.cost, this.row.getElementsByClassName("expense")[0])

        if (this.hasCompletedRequirements())
            this.row.classList.remove("hiddenTask")
        else
            this.row.classList.add("hiddenTask")
    }

    public save(): void {
        game.getSave().tasks[this.getName()] = {
            selected: this.isSelected()
        }
    }

    public load(): void {
        if (!(this.getName() in game.getSave().tasks)) return
        const data = game.getSave().tasks[this.getName()]
    
        this.selected = data.selected 
    }

}