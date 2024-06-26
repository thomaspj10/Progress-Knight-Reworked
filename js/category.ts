enum CategoryType {
    JOB,
    SKILL,
    ITEM
}

interface ICategory<T> {
    getName(): string
    getColor(): string
    addTask(name: string, tooltip: string, init: (task: T & ITask) => void): void
    getType(): CategoryType
}

abstract class Category<T> implements ICategory<T>, IRenderable {

    private name: string
    private color: string

    private tableId: string
    private table: HTMLElement
    private headerRow: HTMLElement
    private requirementRow: HTMLElement
    private addedRequirementRow: boolean = false
    protected tasks: ITask[] = []

    constructor(name: string, color: string, init: (category: ICategory<T>) => void, tableId: string) {
        this.name = name
        this.color = color
        this.tableId = tableId
        _game.addCategory(this)
        gameManager.registerIRenderable(this)
        init(this)
    }

    public getName(): string {
        return this.name
    }

    public getColor(): string {
        return this.color
    }

    public getTasks(): ITask[] {
        return this.tasks
    }

    public render(isInitialRender: boolean): void {
        if (isInitialRender) {
            this.table = document.getElementById(this.tableId)
            this.headerRow = createHeaderRow(this)
            this.table.appendChild(this.headerRow)

            this.requirementRow = createRequirementRow()
        }

        let hitHittenTask = false;
        for (const task of this.tasks as Task[]) {
            if (!task.hasCompletedRequirements()) {  
                let text = ""
                for (const requirement of task.getRequirements()) {
                    text += requirement.getText() + ", "
                }
                text = text.slice(0, text.length - 2)

                if (!hitHittenTask) {
                    this.requirementRow.getElementsByClassName("value")[0].innerHTML = text
                }

                hitHittenTask = true
            }

            task.render(isInitialRender)
        }

        if (!hitHittenTask)
            this.requirementRow.classList.add("hiddenTask")
        else
            this.requirementRow.classList.remove("hiddenTask")

        const firstTask = this.tasks[0]

        if (firstTask !== undefined) {
            if (!firstTask.hasCompletedRequirements()) {
                this.requirementRow.classList.add("hiddenTask")
                this.headerRow.classList.add("hiddenTask")
            } else {
                this.headerRow.classList.remove("hiddenTask")
            }
        }

        if (isInitialRender) {
            this.table.appendChild(this.requirementRow)
            const br = document.createElement("br")
            this.table.appendChild(br)
        }
    } 
    
    public getTable(): HTMLElement {
        return this.table
    }

    public abstract addTask(name: string, tooltip: string, init: (task: T & ITask) => void): void
    public abstract getType(): CategoryType

}

class JobCategory extends Category<IJob> {

    constructor(name: string, color: string, init: (category: ICategory<IJob>) => void) {
        super(name, color, init, "jobTable")
    }

    public addTask(name: string, tooltip: string, init: (task: IJob & ITask) => void) {
        const job = new Job(name, tooltip, this)
        init(job)
        this.tasks.push(job)
    }

    public getType(): CategoryType {
        return CategoryType.JOB
    }

}

class SkillCategory extends Category<ISkill> {

    constructor(name: string, color: string, init: (category: ICategory<ISkill>) => void) {
        super(name, color, init, "skillTable")
    }

    public addTask(name: string, tooltip: string, init: (task: ISkill & ITask) => void) {
        const skill = new Skill(name, tooltip, this)
        init(skill)
        this.tasks.push(skill)
    }

    public getType(): CategoryType {
        return CategoryType.SKILL
    }

}

enum ItemCategoryType {
    SINGLE,
    MULTI
}

class ItemCategory extends Category<IItem> {

    private type: ItemCategoryType

    constructor(name: string, color: string, type: ItemCategoryType, init: (category: ICategory<IItem>) => void) {
        super(name, color, () => {}, "itemTable")
        this.type = type
        init(this)
    }

    public addTask(name: string, tooltip: string, init: (task: IItem & ITask) => void) {
        const item = new Item(name, tooltip, this, this.type)
        init(item)
        this.tasks.push(item)
    }

    public getType(): CategoryType {
        return CategoryType.ITEM
    }

}