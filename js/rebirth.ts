class RebirthOption {

    private name: string
    private effect: () => void

    constructor(name: string, effect: () => void) {
        this.name = name
        this.effect = effect
        _game.addRebirthOption(this)
    }

    public getName(): string {
        return this.name
    }

    public rebirth(): void {
        this.effect()
    }

}