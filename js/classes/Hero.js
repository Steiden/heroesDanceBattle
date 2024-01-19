export class Hero {
    // Информация о герое
    name; // Имя героя
    description; // Описание героя
    // Параметры героя
    lvl; // Уровень героя
    str; // Сила героя
    agi; // Ловкость героя
    int; // Интеллект героя
    hp; // Здоровье героя
    mana; // Мана героя
    haveAbility; // Имеет ли герой способность
    // Конструктор
    constructor(name = "Hero", description = "I'm a hero", lvl = 0, str = 0, agi = 0, int = 0, hp = 100, mana = 0, haveAbility = true) {
        this.name = name === "" ? "'Без имени'" : name.length > 24 ? name.slice(0, 24) : name;
        this.description = description === null ? "" : description.length > 100 ? description.slice(0, 100) : description;
        this.lvl =
            lvl ||
                this.#contraintHeroParameter(Math.floor(Math.random() * 100) + 1, heroContraints.MIN_LEVEL, heroContraints.MAX_LEVEL);
        this.str = this.#contraintHeroParameter(str);
        this.agi = this.#contraintHeroParameter(agi);
        this.int = this.#contraintHeroParameter(int);
        this.hp = this.#contraintHeroParameter(hp, heroContraints.MIN_HEALTH, heroContraints.MAX_HEALTH);
        this.mana = mana === null ? 0 : this.#contraintHeroParameter(mana);
        this.haveAbility = haveAbility;
    }
    // Геттеры
    getName() {
        return this.name;
    }
    getDescription() {
        return this.description;
    }
    getLvl() {
        return this.lvl;
    }
    getStr() {
        return this.str;
    }
    getAgi() {
        return this.agi;
    }
    getInt() {
        return this.int;
    }
    getHp() {
        return this.hp;
    }
    getMana() {
        return this.mana;
    }
    getHaveAbility() {
        return this.haveAbility;
    }
    // Сеттеры
    setName(name) {
        this.name = name.length > 24 ? name.slice(0, 24) : name;
    }
    setDescription(description) {
        this.description = description.length > 100 ? description.slice(0, 100) : description;
    }
    setLvl() {
        this.lvl = this.#contraintHeroParameter(Math.floor(Math.random() * 100) + 1, heroContraints.MIN_LEVEL, heroContraints.MAX_LEVEL);
    }
    setStr(str) {
        this.str = str;
    }
    setAgi(agi) {
        this.agi = agi;
    }
    setInt(int) {
        this.int = int;
    }
    setHp(hp) {
        this.hp = hp;
    }
    setMana(mana) {
        this.mana = mana;
    }
    setHaveAbility(haveAbility) {
        this.haveAbility = haveAbility;
    }
    // Методы
    #contraintHeroParameter(value, min = heroContraints.MIN_STAT, max = heroContraints.MAX_STAT) {
        // Ограничение параметров героя
        if (value < min)
            return min;
        if (value > max)
            return max;
        return value;
    }
}
const heroContraints = {
    MAX_LEVEL: 99, // Максимальный уровень героя
    MIN_LEVEL: 1, // Минимальный уровень героя
    MAX_HEALTH: 100, // Максимальное здоровье героя
    MIN_HEALTH: 1, // Минимальное здоровье героя
    MAX_STAT: 99, // Максимальное значение характеристики
    MIN_STAT: 0, // Минимальное значение характеристики
};
