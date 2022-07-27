enum EffectType {
    EXPERIENCE,
    HAPPINESS,
    HEALTH,
    ENERGY,
    INCOME,
    EXPENSES,
    LIFESPAN,
    GAMESPEED,
    EVIL
}

class Effect {

    private static effects: Effect[] = []

    public static getTotalEffect(type: EffectType, task?: Task): number {
        let multiplier = 1
        
        for (const effect of Effect.effects) {
            if (effect.getType() != type) continue
            if (task && !effect.getFilter()(task)) continue
            if (!effect.getGlobalFilter()()) continue

            multiplier *= effect.getEffect()
        }

        return multiplier
    }

    private type: EffectType
    private effect: () => number
    private filter: (task: Task) => boolean = () => true
    private globalFilter: () => boolean = () => true

    constructor(type: EffectType, effect: () => number) {
        this.type = type
        this.effect = effect

        Effect.effects.push(this)
    }

    public setFilter(filter: (task: Task) => boolean) {
        this.filter = filter
    }

    public setGlobalFilter(filter: () => boolean) {
        this.globalFilter = filter
    }

    public getFilter(): (task: Task) => boolean {
        return this.filter
    }

    public getGlobalFilter(): () => boolean {
        return this.globalFilter
    }

    public getType(): EffectType {
        return this.type
    }
    
    public getEffect(): number {
        return this.effect()
    }

}