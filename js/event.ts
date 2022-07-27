class GameEvent {

    private listItem: HTMLElement

    constructor(init: (event: GameEvent) => void) {
        this.listItem = document.createElement("li")
        this.listItem.style.margin = "8px"
        init(this)
        document.getElementById("eventsList").appendChild(this.listItem)
    }

    public addText(text: string, requirement?: () => boolean): void {
        const p = document.createElement("p")
        p.innerHTML = text
        this.listItem.appendChild(p)

        if (requirement) {
            const htmlElementRequirement = new HtmlElementRequirement(p)
            htmlElementRequirement.addRequirement(requirement)
        }
    }

    public addButton(text: string, callback: () => void, requirement?: () => boolean): void {
        const button = document.createElement("button")
        button.textContent = text
        button.className = "w3-button button"
        button.style.marginTop = "8px"
        button.style.marginBottom = "8px"
        button.style.marginLeft = "8px"
        button.onclick = callback
        this.listItem.appendChild(button)

        if (requirement) {
            const htmlElementRequirement = new HtmlElementRequirement(button)
            htmlElementRequirement.addRequirement(requirement)
        }
    }

    public addRequirement(requirement: () => boolean): void {
        const htmlElementRequirement = new HtmlElementRequirement(this.listItem)
        htmlElementRequirement.addRequirement(requirement)
    }

}