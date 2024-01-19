export type TypeHeroEnemy = {
    id: number,
    name: string,
    published_at: Date,
    created_at: Date,
    updated_at: Date,
    title: string,
    description: string,
    str: number,
    agi: number,
    hp: number,
    int: number,
    additionalStat: number
}

export type TypeFieldsForFill = {
    heroClass: HTMLHeadElement,
    heroName: HTMLHeadElement,
    heroLevel: HTMLSpanElement,
    heroStrength: HTMLSpanElement,
    heroAgility: HTMLSpanElement,
    heroHealth: HTMLSpanElement,
    heroIntelligence: HTMLSpanElement
}