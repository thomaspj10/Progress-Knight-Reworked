class HtmlElementRequirement implements IRenderable {

    private element: HTMLElement
    private requirements: Array<() => boolean> = []

    constructor(element: HTMLElement) {
        this.element = element
        gameManager.registerIRenderable(this)
    }

    public addRequirement(requirement: () => boolean) {
        this.requirements.push(requirement)
    }

    private hasCompletedRequirements(): boolean {
        for (const requirement of this.requirements)
            if (!requirement())
                return false
        return true
    }

    public render() {
        if (this.hasCompletedRequirements()) {
            this.element.style.display = "block"
        } else {
            this.element.style.display = "none"
        }
    }

}

abstract class Requirement implements ISaveable {

    private static currentRequirementId = 1

    private completed: boolean
    private requirement: () => boolean = () => true
    
    private id: number = Requirement.currentRequirementId++

    constructor() {
        gameManager.registerISaveable(this)
    }

    protected setRequirement(requirement: () => boolean) {
        this.requirement = requirement
    }

    public isCompleted(): boolean {
        this.testRequirement()
        return this.completed
    }

    private testRequirement() {
        // if (this.completed) return
        this.completed = this.requirement()
    }

    public save() {
        game.getSave().requirements[this.id.toString()] = {
            completed: this.isCompleted()
        }
    }

    public load() {
        this.init()

        if (!(this.id.toString() in game.getSave().requirements)) return
        const data = game.getSave().requirements[this.id.toString()]
    
        this.completed = data.completed
    }

    public abstract getText(): string
    protected abstract init(): void

}

class CurrencyRequirement extends Requirement {

    private currency: CurrencyType
    private amount: number

    constructor(currency: CurrencyType, amount: number) {
        super()
        this.currency = currency
        this.amount = amount
    }

    public getText() {
        if (this.currency == CurrencyType.EVIL)
            return `<span style="color: rgb(200, 0, 0)">${this.amount} ${this.currency}</span>`
        if (this.currency == CurrencyType.COINS) {
            const span = document.createElement("span")
            for (let i=0; i < 4; i++)
                span.appendChild(document.createElement("span"))

            formatCoins(this.amount, span)
            return span.innerHTML
        }
    }

    protected init(): void {
        this.setRequirement(() => {
            const currencyAmount = game.getSave().currency[this.currency]

            return currencyAmount >= this.amount
        })
    }

}

class TaskRequirement extends Requirement {

    private taskName: string
    private task: Task
    private taskType: "experience" | "item"
    private level: number

    constructor(taskName: string, level: number) {
        super()
        this.taskName = taskName
        this.level = level
    }   

    public getText(): string {
        if (this.taskType == "experience")
            return `${this.task.getName()} level ${(this.task as ExperienceTask).getLevel()}/${this.level}`
        if (this.taskType == "item")
            return ""
    }

    protected init(): void {
        this.task = game.getTaskByName(this.taskName)

        console.assert(this.task != null, `The task '${this.taskName}' does not exist.`)

        if (this.task instanceof ExperienceTask) {
            this.setRequirement(() => {
                return (this.task as ExperienceTask).getLevel() >= this.level
            })
            this.taskType = "experience"
        } else {
            this.setRequirement(() => {
                return true
            })
            this.taskType = "item"
        }
    }

}