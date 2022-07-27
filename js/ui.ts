function setTab(tabName: "jobs" | "skills" | "shop" | "rebirth" | "settings") {
    for (const tab of <HTMLElement[]> Array.from(document.getElementsByClassName("tab"))) {
        tab.style.display = "none";
    }
    document.getElementById(tabName).style.display = "block"
    
    for (const tabButton of Array.from(document.getElementsByClassName("tabButton"))) {
        tabButton.classList.remove("w3-blue-gray")
    }
    
    document.getElementById(tabName + "TabButton").classList.add("w3-blue-gray")

    game.getSave().ui.currentTab = tabName
}

function createHeaderRow(category: Category<unknown>): HTMLElement {
    const template = <HTMLTemplateElement> document.getElementsByClassName(category.getType() == CategoryType.ITEM ? "headerRowItemTemplate" : "headerRowTaskTemplate")[0]
    const headerRow = <HTMLElement> template.content.firstElementChild.cloneNode(true)

    headerRow.getElementsByClassName("category")[0].textContent = category.getName()
    if (category.getType() != CategoryType.ITEM) {
        headerRow.getElementsByClassName("valueType")[0].textContent = category.getType() == CategoryType.JOB ? "Income/day" : "Effect"
    }

    headerRow.style.backgroundColor = category.getColor()
    headerRow.style.color = "#ffffff"
    headerRow.classList.add(category.getName().replace(" ", ""))
    headerRow.classList.add("headerRow")
    
    return headerRow
}

function createRow(category: ICategory<unknown>, task: Task): HTMLElement {
    const template = <HTMLTemplateElement> document.getElementsByClassName(category.getType() == CategoryType.ITEM ? "rowItemTemplate" : "rowTaskTemplate")[0]
    const row = <HTMLElement> template.content.firstElementChild.cloneNode(true)

    row.getElementsByClassName("name")[0].textContent = task.getName()
    row.getElementsByClassName("tooltipText")[0].textContent = task.getTooltip()
    row.id = "row " + task.getName()
    if (category.getType() == CategoryType.ITEM) {
        row.getElementsByClassName("button")[0].addEventListener("click", () => {
            task.select()
        })
    } else {
        row.getElementsByClassName("progressBar")[0].addEventListener("click", () => {
            task.select()
        })
    }

    return row
}

function createRequirementRow() {
    const template = <HTMLTemplateElement> document.getElementsByClassName("requiredRowTemplate")[0]
    const row = <HTMLElement> template.content.firstElementChild.cloneNode(true)
    
    return row
}

function format(number: number): string {
    const units = ["", "k", "M", "B", "T", "q", "Q", "Sx", "Sp", "Oc", "Nv", "Vg", "Uv", "Dv", "Tv", "Qt", "Qv", "Sv", "Oc", "Nd", "Tg", "OMG"];

    // what tier? (determines SI symbol)
    const tier = Math.log10(number) / 3 | 0;

    // if zero, we don't need a suffix
    if(tier == 0) return number.toFixed(0).toString();

    // get suffix and determine scale
    const suffix = units[tier];
    const scale = Math.pow(10, tier * 3);

    // scale the number
    const scaled = number / scale;

    // format number and add suffix
    return scaled.toFixed(1) + suffix;
}

function formatCoins(coins: number, element) {
    const tiers = ["p", "g", "s"]
    const colors = {
        "p": "#79b9c7",
        "g": "#E5C100",
        "s": "#a8a8a8",
        "c": "#a15c2f"
    }
    let leftOver = coins
    let i = 0
    for (const tier of tiers) {
        const x = Math.floor(leftOver / Math.pow(10, (tiers.length - i) * 2))
        leftOver = Math.floor(leftOver - x * Math.pow(10, (tiers.length - i) * 2))
        const text = format(x) + tier + " "
        element.children[i].textContent = x > 0 ? text : ""
        element.children[i].style.color = colors[tier]
        i += 1
    }

    if (leftOver == 0 && coins > 0) {element.children[3].textContent = ""; return}
    element.children[3].textContent = Math.floor(leftOver) + "c"
    element.children[3].style.color = colors["c"]
}

function updateSidebarText() {
    document.getElementById("ageDisplay").textContent = "" + Math.floor(game.getSave().days / 365)
    document.getElementById("dayDisplay").textContent = "" + Math.floor(game.getSave().days - Math.floor(game.getSave().days / 365) * 365)
    document.getElementById("lifespanDisplay").textContent = (BASE_LIFE_SPAN * Effect.getTotalEffect(EffectType.LIFESPAN)).toFixed(0)
    document.getElementById("pauseButton").textContent = game.getSave().paused ? "Play" : "Pause"

    const expense = _game.getExpense()
    const income = _game.getIncome()

    formatCoins(game.getSave().currency.coins, document.getElementById("coinDisplay"))
    setSignDisplay()
    formatCoins(Math.abs(income - expense), document.getElementById("netDisplay"))
    formatCoins(income, document.getElementById("incomeDisplay"))
    formatCoins(expense, document.getElementById("expenseDisplay"))

    document.getElementById("happinessDisplay").textContent = Effect.getTotalEffect(EffectType.HAPPINESS).toFixed(1)
    document.getElementById("healthDisplay").textContent = Effect.getTotalEffect(EffectType.HEALTH).toFixed(1)
    document.getElementById("energyDisplay").textContent = Effect.getTotalEffect(EffectType.ENERGY).toFixed(1)

    document.getElementById("evilDisplay").textContent = game.getSave().currency.evil.toFixed(1)
    // document.getElementById("evilGainDisplay").textContent = getEvilGain().toFixed(1)
    
    // document.getElementById("essenceDisplay").textContent = gameData.essence.toFixed(1)
    // document.getElementById("essenceGainDisplay").textContent = getEssenceGain().toFixed(1)

    document.getElementById("timeWarpingDisplay").textContent = "x" + Effect.getTotalEffect(EffectType.GAMESPEED).toFixed(2)
    document.getElementById("timeWarpingButton").textContent = game.getSave().isTimeWarping ? "Disable warp" : "Enable warp"

    const quickTaskDisplayElement = document.getElementById("quickTaskDisplay")
    const jobProgressBar = quickTaskDisplayElement.getElementsByClassName("job")[0]
    jobProgressBar.getElementsByClassName("name")[0].textContent = game.getCurrentJob().getName() + " lvl " + game.getCurrentJob().getLevel();
    (<HTMLElement> jobProgressBar.getElementsByClassName("progressFill")[0]).style.width = game.getCurrentJob().getCurrentExperience() / game.getCurrentJob().getMaxExperience() * 100 + "%"

    const skillProgressBar = quickTaskDisplayElement.getElementsByClassName("skill")[0]
    skillProgressBar.getElementsByClassName("name")[0].textContent = game.getCurrentSkill().getName() + " lvl " + game.getCurrentSkill().getLevel();
    (<HTMLElement> skillProgressBar.getElementsByClassName("progressFill")[0]).style.width = game.getCurrentSkill().getCurrentExperience() / game.getCurrentSkill().getMaxExperience() * 100 + "%"
}

function setSignDisplay() {
    const expense = _game.getExpense()
    const income = _game.getIncome()

    const profit = income - expense
    const signDisplay = document.getElementById("signDisplay")

    if (profit >= 0 && profit < 1) {
        signDisplay.textContent = ""
        signDisplay.style.color = "gray"
    } else if (income > expense) {
        signDisplay.textContent = "+"
        signDisplay.style.color = "green"
    } else if (expense > income) {
        signDisplay.textContent = "-"
        signDisplay.style.color = "red"
    } else {
        signDisplay.textContent = ""
        signDisplay.style.color = "gray"
    }
}

// Html component requirements.
const ageRequirementText = new HtmlElementRequirement(document.getElementById("deathText"))
ageRequirementText.addRequirement(() => game.getSave().days / 365 >= BASE_LIFE_SPAN * Effect.getTotalEffect(EffectType.LIFESPAN))

const evilDisplay = new HtmlElementRequirement(document.getElementById("evilInfo"))
evilDisplay.addRequirement(() => game.getSave().currency.evil > 0)

const essenceDisplay = new HtmlElementRequirement(document.getElementById("essenceInfo"))
essenceDisplay.addRequirement(() => false) // DISABLED CURRENTLY

const timewarpingSidebar = new HtmlElementRequirement(document.getElementById("timeWarping"))
timewarpingSidebar.addRequirement(() => Effect.getTotalEffect(EffectType.GAMESPEED) > 1)