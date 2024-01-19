export class Hero {
    // Информация о герое
    private name: string; // Имя героя
    private description: string; // Описание героя

    // Параметры героя
    private lvl: number; // Уровень героя
    private str: number; // Сила героя
    private agi: number; // Ловкость героя
    private int: number; // Интеллект героя
    private hp: number; // Здоровье героя
    private mana: number; // Мана героя

    private haveAbility: boolean; // Имеет ли герой способность

    // Конструктор
    constructor(
        name: string = "Hero",
        description: string = "I'm a hero",
        lvl: number = 0,
        str: number = 0,
        agi: number = 0,
        int: number = 0,
        hp: number = 100,
        mana: number = 0,
        haveAbility: boolean = true
    ) {
        this.name = name === "" ? "'Без имени'" : name.length > 24 ? name.slice(0, 24) : name;
        this.description = description === null ? "" : description.length > 100 ? description.slice(0, 100) : description;
        this.lvl =
            lvl ||
            this.#contraintHeroParameter(
                Math.floor(Math.random() * 100) + 1,
                heroContraints.MIN_LEVEL,
                heroContraints.MAX_LEVEL
            );
        this.str = this.#contraintHeroParameter(str);
        this.agi = this.#contraintHeroParameter(agi);
        this.int = this.#contraintHeroParameter(int);
        this.hp = this.#contraintHeroParameter(hp, heroContraints.MIN_HEALTH, heroContraints.MAX_HEALTH);
        this.mana = mana === null ? 0 : this.#contraintHeroParameter(mana);
        this.haveAbility = haveAbility;
    }

    // Геттеры
    getName(): string {
        return this.name;
    }
    getDescription(): string {
        return this.description;
    }
    getLvl(): number {
        return this.lvl;
    }
    getStr(): number {
        return this.str;
    }
    getAgi(): number {
        return this.agi;
    }
    getInt(): number {
        return this.int;
    }
    getHp(): number {
        return this.hp;
    }
    getMana(): number {
        return this.mana;
    }
    getHaveAbility(): boolean {
        return this.haveAbility;
    }

    // Сеттеры
    setName(name: string): void {
        this.name = name.length > 24 ? name.slice(0, 24) : name;
    }
    setDescription(description: string): void {
        this.description = description.length > 100 ? description.slice(0, 100) : description;
    }
    setLvl(): void {
        this.lvl = this.#contraintHeroParameter(
            Math.floor(Math.random() * 100) + 1,
            heroContraints.MIN_LEVEL,
            heroContraints.MAX_LEVEL
        );
    }
    setStr(str: number): void {
        this.str = str
    }
    setAgi(agi: number): void {
        this.agi = agi
    }
    setInt(int: number): void {
        this.int = int
    }
    setHp(hp: number): void {
        this.hp = hp
    }
    setMana(mana: number): void {
        this.mana = mana
    }
    setHaveAbility(haveAbility: boolean): void {
        this.haveAbility = haveAbility;
    }

    // Методы
    #contraintHeroParameter(
        value: number,
        min: number = heroContraints.MIN_STAT,
        max: number = heroContraints.MAX_STAT
    ): number {
        // Ограничение параметров героя
        if (value < min) return min;
        if (value > max) return max;
        return value;
    }
}

const heroContraints: Record<string, number> = {
    MAX_LEVEL: 99, // Максимальный уровень героя
    MIN_LEVEL: 1, // Минимальный уровень героя
    MAX_HEALTH: 100, // Максимальное здоровье героя
    MIN_HEALTH: 1, // Минимальное здоровье героя
    MAX_STAT: 99, // Максимальное значение характеристики
    MIN_STAT: 0, // Минимальное значение характеристики
};
