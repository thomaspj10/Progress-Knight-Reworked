enum GameDifficulty {
    EASY = 1.0098,
    DEFAULT = 1.01,
    HARD = 1.0102
}

enum CurrencyType {
    COINS = "coins",
    EVIL = "evil"
}

type TaskType<T extends CategoryType> =
    T extends CategoryType.JOB ? Job :
    T extends CategoryType.SKILL ? Skill :
    T extends CategoryType.ITEM ? Item :
    never

interface GameData {
    currency: {
        coins: number,
        evil: number
    },
    ui: {
        currentTab: "jobs" | "skills" | "shop" | "rebirth" | "settings",
        selectedJob: string,
        selectedSkill: string
    },
    days: number,
    paused: boolean,
    isTimeWarping: boolean,
    tasks: {},
    requirements: {}
}

interface IGame {
    getSave(): GameData
    getDifficulty(): GameDifficulty
    setDifficulty(difficulty: GameDifficulty): void
    getTaskByName(name: string): Task
    getCurrentSkill(): Skill
    getCurrentJob(): Job
    getTasks(): Task[]
    getTasksByType<T extends CategoryType>(type: T): TaskType<T>[]
    getIncome(): number
    getExpense(): number
}

interface ITickable {
    tick(): void
}

interface IRenderable {
    render(isInitialRender: boolean): void
}

interface ISaveable {
    save(): void
    load(): void
}

class GameManager { 

    private tickables: ITickable[] = []
    private renderables: IRenderable[] = []
    private saveables: ISaveable[] = []

    private isInitialRender: boolean = true

    public registerTickable(tickable: ITickable): void {
        this.tickables.push(tickable)
    }

    public registerRenderable(renderable: IRenderable): void {
        this.renderables.push(renderable)
    }

    public registerISaveable(saveable: ISaveable): void {
        this.saveables.push(saveable)
    }

    public load(): void {
        if (localStorage.getItem("saveData") != null)
            _game.saveData = JSON.parse(localStorage.getItem("saveData"))

        for (const saveable of this.saveables)
            saveable.load()
    }

    public save(): void {
        localStorage.setItem("saveData", JSON.stringify(game.getSave()))
    }

    public loop(): void {
        for (const renderable of this.renderables)
            renderable.render(this.isInitialRender)
        if (this.isInitialRender)
            this.isInitialRender = false

        for (const tickable of this.tickables)
            tickable.tick()

        for (const saveable of this.saveables)
            saveable.save()

        updateSidebarText()
        game.getSave().days += applySpeed(1)

        if (game.getSave().currency.coins <= 0) {
            game.getSave().currency.coins = 0

            for (const item of game.getTasksByType(CategoryType.ITEM))
                item.setSelected(false)
        }

        this.save()   
    }

}

class Game implements IGame {

    private difficulty: GameDifficulty = GameDifficulty.DEFAULT

    private categories: Category<unknown>[] = []

    public saveData: GameData = {
        currency: {
            coins: 0,
            evil: 0
        },
        ui: {
            currentTab: "jobs",
            selectedJob: "Burger Flipper",
            selectedSkill: "Study Skills"
        },
        days: 18 * 365,
        paused: false,
        isTimeWarping: false,
        tasks: {},
        requirements: {}
    }

    public getSave(): GameData {
        return this.saveData
    }

    public getDifficulty(): GameDifficulty {
        return this.difficulty
    }

    public getTaskByName(name: string): Task {
        for (const task of this.getTasks()) {
            if (task.getName() == name)
                return task
        }
        return null
    }

    public getCurrentSkill(): Skill {
        for (const task of this.getTasks()) {
            if (task.getName() == this.getSave().ui.selectedSkill && task.getCategory().getType() == CategoryType.SKILL)
                return <Skill> task
        }
        return null
    }

    public getCurrentJob(): Job {
        for (const task of this.getTasks()) {
            if (task.getName() == this.getSave().ui.selectedJob && task.getCategory().getType() == CategoryType.JOB)
                return <Job> task
        }
        return null
    }

    public getTasks(): Task[] {
        const tasks = []

        for (const category of this.categories) {
            for (const task of category.getTasks()) {
                tasks.push(task)
            }
        }

        return tasks
    }

    public getTasksByType<T extends CategoryType>(type: T): TaskType<T>[] {
        const tasks: any = []
        for (const task of this.getTasks()) {
            if (task.getCategory().getType() == type)
                tasks.push(task)
        }
        return tasks
    }

    public getIncome(): number {
        return this.getCurrentJob().getIncome()
    }

    public getExpense(): number {
        let expense = 0
        for (const item of game.getTasksByType(CategoryType.ITEM))
            if (item.isSelected())
                expense += item.getCost()
        return expense
    }

    public setDifficulty(difficulty: GameDifficulty) {
        this.difficulty = difficulty
    }

    public addCategory(category: Category<unknown>) {
        this.categories.push(category)
    }

    public hard_reset() {
        if (confirm("Are you sure you want to HARD RESET all your progress? (Everything will be gone)")) {
            this.saveData = null
            gameManager.save()
            localStorage.removeItem("saveData")
            location.reload()
        }
    }

}

const gameManager = new GameManager()

const _game = new Game()
const game = _game as IGame

function applySpeed(value: number) {
    if (game.getSave().paused) return 0
    if (game.getSave().days >= baseLifeSpan * Effect.getTotalEffect(EffectType.LIFESPAN) * 365) return 0

    return value / updateSpeed * daysPerSecond
        * Effect.getTotalEffect(EffectType.GAMESPEED)
}