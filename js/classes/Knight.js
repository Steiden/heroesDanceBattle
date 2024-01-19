import { Hero } from "./Hero.js";
import { EnumHeroClass } from "../Enums.js";
export class Knight extends Hero {
    class = EnumHeroClass.Knight;
    BOOST = Math.round(this.getLvl() * 0.25); // Повышение характеристик, выраженное в %
    abilityBoost = 0; // Повышение характеристик от способности
    // Конструктор
    constructor(name = "Knight", description = "I'm a knight", lvl = 0, str = 0, agi = 0, int = 0, hp = 100, mana = 0, haveAbility = true) {
        super(name, description, lvl, str, agi, int, hp, mana, haveAbility);
        // this.#boostParameters();
    }
    // Геттеры
    getClass() {
        return this.class;
    }
    getBoost() {
        return this.BOOST;
    }
    getAbilityBoost() {
        return this.abilityBoost;
    }
    // Методы
    boostParameters() {
        const totalBoost = this.BOOST + this.abilityBoost;
        // Увеличение характеристик героя
        this.setStr(Math.round(this.getStr() + (this.getStr() * this.abilityBoost / 100)));
        this.setAgi(Math.round(this.getAgi() + (this.getAgi() * this.abilityBoost / 100)));
        this.setInt(Math.round(this.getInt() + (this.getInt() * totalBoost / 100)));
        this.setHp(Math.round(this.getHp() + (this.getHp() * totalBoost / 100)));
    }
    // restoreParameters(): void { // Воостановление характеристик персонажа
    //     this.setStr(this.getStr() - (this.getStr() * this.abilityBoost / 100));
    //     this.setAgi(this.getAgi() - (this.getAgi() * this.abilityBoost / 100));
    //     this.setInt(this.getInt() - (this.getInt() * this.abilityBoost + this.BOOST / 100));
    //     this.setHp(this.getHp() - (this.getHp() * this.abilityBoost + this.BOOST / 100));
    // }
    useAbility() {
        this.abilityBoost = 5;
    }
}
