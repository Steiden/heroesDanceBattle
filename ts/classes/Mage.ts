import { Hero } from "./Hero.js";
import { EnumHeroClass } from "../Enums.js";

export class Mage extends Hero {

    private class = EnumHeroClass.Mage;
    private BOOST: number = Math.round(this.getInt() * 0.15 + this.getLvl() * 0.1); // Повышение характеристик, выраженное в %
    private abilityBoost: number = 0;   // Повышение характеристик от способности

    // Конструктор
    constructor(
        name: string = "Mage",
        description: string = "I'm a mage",
        lvl: number = 0,
        str: number = 0,
        agi: number = 0,
        int: number = 0,
        hp: number = 100,
        mana: number = 0,
        haveAbility: boolean = true
    ) {
        super(name, description, lvl, str, agi, int, hp, mana, haveAbility);
        // this.#boostParameters();
    }

    // Геттеры
    getClass(): EnumHeroClass {
        return this.class;
    }
    getBoost(): number {
        return this.BOOST;
    }
    getAbilityBoost(): number {
        return this.abilityBoost;
    }

    // Методы
    boostParameters(): void {  // Увеличение силы и ловкости Мага на n-ое количество %
        const totalBoost = this.BOOST + this.abilityBoost;

        // Увеличение характеристик героя
        this.setStr(Math.round(this.getStr() + (this.getStr() * this.BOOST / 100)));
        this.setAgi(Math.round(this.getAgi() + (this.getAgi() * this.BOOST / 100)));
        this.setInt(Math.round(this.getInt() + (this.getInt() * totalBoost / 100)));
        this.setHp(Math.round(this.getHp() + (this.getHp() * totalBoost / 100)));
    }
    // restoreParameters(): void { // Воостановление характеристик персонажа
    //     this.setStr(this.getStr() - (this.getStr() * this.BOOST / 100));
    //     this.setAgi(this.getAgi() - (this.getAgi() * this.BOOST / 100));
    //     this.setInt(this.getInt() - (this.getInt() * this.abilityBoost + this.BOOST / 100));
    //     this.setHp(this.getHp() - (this.getHp() * this.abilityBoost + this.BOOST / 100));
    // }
    useAbility():  void {   // Ипользование способности увеличивает интеллект и здоровье на 10%
        this.abilityBoost = 10;
    }
}
