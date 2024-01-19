import { Hero } from "./classes/Hero.js";
import { Knight } from "./classes/Knight.js";
import { Mage } from "./classes/Mage.js";
import { Validator } from "./classes/Validator.js";
import { EnumHeroClass } from "./Enums.js";
import { TypeHeroEnemy, TypeFieldsForFill } from "./Types.js";

// Получение HTML элементов формы
const heroForm: HTMLFormElement = document.getElementById("heroForm") as HTMLFormElement;
const classInput: NodeListOf<HTMLInputElement> = document.getElementsByName("class") as NodeListOf<HTMLInputElement>;
const nameInput: HTMLInputElement = document.getElementById("name") as HTMLInputElement;
const levelInput: HTMLInputElement = document.getElementById("level") as HTMLInputElement;
const strengthInput: HTMLInputElement = document.getElementById("strength") as HTMLInputElement;
const intelligenceInput: HTMLInputElement = document.getElementById("intelligence") as HTMLInputElement;
const agilityInput: HTMLInputElement = document.getElementById("agility") as HTMLInputElement;
const additionalStatInput: HTMLInputElement = document.getElementById("additionalStat") as HTMLInputElement;
const additionalAbilityInput: NodeListOf<HTMLInputElement> = document.getElementsByName(
    "additionalAbility"
) as NodeListOf<HTMLInputElement>;

// Получение HTML элементов карточки игрока
const playerHeroClass: HTMLHeadElement = document.getElementById("playerHeroClass") as HTMLHeadElement;
const playerHeroName: HTMLHeadElement = document.getElementById("playerHeroName") as HTMLHeadElement;
const playerHeroLevel: HTMLSpanElement = document.getElementById("playerHeroLevel") as HTMLSpanElement;
const playerHeroStrength: HTMLSpanElement = document.getElementById("playerHeroStrength") as HTMLSpanElement;
const playerHeroAgility: HTMLSpanElement = document.getElementById("playerHeroAgility") as HTMLSpanElement;
const playerHeroHealth: HTMLSpanElement = document.getElementById("playerHeroHp") as HTMLSpanElement;
const playerHeroIntelligence: HTMLSpanElement = document.getElementById("playerHeroIntelligence") as HTMLSpanElement;
const doSkillButton: HTMLButtonElement = document.getElementById("doSkillButton") as HTMLButtonElement;

// Получение HTML элементов карточки соперника
const enemyHeroClass: HTMLHeadElement = document.getElementById("enemyHeroClass") as HTMLHeadElement;
const enemyHeroName: HTMLHeadElement = document.getElementById("enemyHeroName") as HTMLHeadElement;
const enemyHeroLevel: HTMLSpanElement = document.getElementById("enemyHeroLevel") as HTMLSpanElement;
const enemyHeroStrength: HTMLSpanElement = document.getElementById("enemyHeroStrength") as HTMLSpanElement;
const enemyHeroAgility: HTMLSpanElement = document.getElementById("enemyHeroAgility") as HTMLSpanElement;
const enemyHeroHealth: HTMLSpanElement = document.getElementById("enemyHeroHp") as HTMLSpanElement;
const enemyHeroIntelligence: HTMLSpanElement = document.getElementById("enemyHeroIntelligence") as HTMLSpanElement;
const getEnemyButton: HTMLButtonElement = document.getElementById("getEnemyButton") as HTMLButtonElement;

// Получение кнопки "Начать батл"
const startBattleButton: HTMLButtonElement = document.getElementById("startBattleButton") as HTMLButtonElement;

// Кнопка закрытия модального окна
const modal: HTMLDivElement = document.getElementById("modal") as HTMLDivElement;
const modalContent: HTMLDivElement = document.getElementById("modalContent") as HTMLDivElement;
const modalText: HTMLDivElement = document.getElementById("modalText") as HTMLDivElement;
const closeModalButton: HTMLButtonElement = document.getElementById("modalCloseButton") as HTMLButtonElement;

// Герой игрока
let playerHero: Knight | Mage;
let enemyHero: Knight | Mage;

// Обработчики событий
heroForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Получение значений
    const heroClass: EnumHeroClass = classInput[0].checked ? EnumHeroClass.Mage : EnumHeroClass.Knight;
    const name: string = nameInput.value;
    const level: number = +levelInput.value;
    const strength: number = +strengthInput.value;
    const intelligence: number = +intelligenceInput.value;
    const agility: number = +agilityInput.value;
    const additionalStat: number = +additionalStatInput.value;
    const haveAdditionalAbility: boolean = additionalAbilityInput[0].checked;

    const heroParameters: [string, string, number, number, number, number, number, number, boolean] = [
        name,
        "",
        level,
        strength,
        agility,
        intelligence,
        100,
        additionalStat,
        haveAdditionalAbility,
    ];

    // Создание персонажа
    playerHero =
        heroClass === EnumHeroClass.Knight ? new Knight(...heroParameters) : new Mage(...heroParameters);

    // Заполнение карточки героя игрока
    const fieldsForFill: TypeFieldsForFill = {
        heroClass: playerHeroClass,
        heroName: playerHeroName,
        heroLevel: playerHeroLevel,
        heroStrength: playerHeroStrength,
        heroAgility: playerHeroAgility,
        heroHealth: playerHeroHealth,
        heroIntelligence: playerHeroIntelligence,
    };
    fillCard(playerHero, fieldsForFill);

    // Разблокировка кнопки поиска соперника
    getEnemyButton.disabled = false;
});

[levelInput, strengthInput, intelligenceInput, agilityInput, additionalStatInput].forEach((input) => {
    // Ограничения на ввод в поля ввода формы
    input.addEventListener("input", (e) => {
        Validator.withoutSymbols(e);
        Validator.constraintLength(e, 2);
        Validator.withoutDoubleZeroes(e);
    });
});

// Кнопка поиска соперника
getEnemyButton.addEventListener("click", () => {
    fetch(`https://api-code.practicum-team.ru/heroes`)
        .then((response) => response.json())
        .then((data) => {
            // Получение случайного соперника
            const randomEnemy: TypeHeroEnemy = data[Math.floor(Math.random() * data.length)];

            // Получение параметров соперника
            const enemyHeroParameters: [string, string, number, number, number, number, number, number, boolean] = [
                randomEnemy["title"],
                randomEnemy["description"],
                0,
                randomEnemy["str"],
                randomEnemy["agi"],
                randomEnemy["int"],
                randomEnemy["hp"],
                randomEnemy["additionalStat"],
                false,
            ];

            if (Math.round(Math.random())) {
                // Создание соперника
                enemyHero = new Knight(...enemyHeroParameters);
            } else {
                // Создание соперника
                enemyHero = new Mage(...enemyHeroParameters);
            }
            // Заполнение карточки соперника
            const fieldsForFill: TypeFieldsForFill = {
                heroClass: enemyHeroClass,
                heroName: enemyHeroName,
                heroLevel: enemyHeroLevel,
                heroStrength: enemyHeroStrength,
                heroAgility: enemyHeroAgility,
                heroHealth: enemyHeroHealth,
                heroIntelligence: enemyHeroIntelligence,
            };
            fillCard(enemyHero, fieldsForFill, true);

            // Разблокировка кнопки битвы
            startBattleButton.disabled = false;
        })
        .catch((error) => {
            console.log(error);
        });
});

// Кнопка битвы
startBattleButton.addEventListener('click', () => {

    // Счет игрока и противника
    let [playerScore, enemyScore] = [0, 0];

    // Буст параметров персонажей
    playerHero.boostParameters();
    enemyHero.boostParameters();

    // Открыть модальное окно
    modal.style.visibility = 'visible';

    // Очистка текста модального окна
    modalText.innerHTML = "";

    // Блокировка кнопки закрытия модального окна
    closeModalButton.disabled = true;

    modalText.insertAdjacentHTML("beforeend", `<p>${playerHero.getName()} начинает бой с ${enemyHero.getName()}</p>`);

    setTimeout(() => {
        let resultText: string;
        if(playerHero.getStr() > enemyHero.getStr()) {
            playerScore++;
            resultText = `Сила ${playerHero.getName()}: ${playerHero.getStr()} > силы ${enemyHero.getName()}: ${enemyHero.getStr()}`;
        }
        if(playerHero.getStr() < enemyHero.getStr()) {
            enemyScore++;
            resultText = `Сила ${playerHero.getName()}: ${playerHero.getStr()} < силы ${enemyHero.getName()}: ${enemyHero.getStr()}`;
        }
        if(playerHero.getStr() === enemyHero.getStr()) {
            resultText = `Сила ${playerHero.getName()}: ${playerHero.getStr()} = силе ${enemyHero.getName()}: ${enemyHero.getStr()}`;
        }
        modalText.insertAdjacentHTML("beforeend", `<p>${resultText!}</p>`);

        setTimeout(() => {
            let resultText: string;

            if(playerHero.getAgi() > enemyHero.getAgi()) {
                playerScore++;
                resultText = `Ловкость ${playerHero.getName()}: ${playerHero.getAgi()} > ловкости ${enemyHero.getName()}: ${enemyHero.getAgi()}`;
            }
            if(playerHero.getAgi() < enemyHero.getAgi()) {
                enemyScore++;
                resultText = `Ловкость ${playerHero.getName()}: ${playerHero.getAgi()} < ловкости ${enemyHero.getName()}: ${enemyHero.getAgi()}`;
            }
            if(playerHero.getAgi() === enemyHero.getAgi()) {
                resultText = `Ловкость ${playerHero.getName()}: ${playerHero.getAgi()} = ловкости ${enemyHero.getName()}: ${enemyHero.getAgi()}`;
            }
            modalText.insertAdjacentHTML("beforeend", `<p>${resultText!}</p>`);

            setTimeout(() => {
                let resultText: string;

                if(playerHero.getInt() > enemyHero.getInt()) {
                    playerScore++;
                    resultText = `Интеллект ${playerHero.getName()}: ${playerHero.getInt()} > интеллекта ${enemyHero.getName()}: ${enemyHero.getInt()}`;
                }
                if(playerHero.getInt() < enemyHero.getInt()) {
                    enemyScore++;
                    resultText = `Интеллект ${playerHero.getName()}: ${playerHero.getInt()} < интеллекта ${enemyHero.getName()}: ${enemyHero.getInt()}`;
                }
                if(playerHero.getInt() === enemyHero.getInt()) {
                    resultText = `Интеллект ${playerHero.getName()}: ${playerHero.getInt()} = интеллекта ${enemyHero.getName()}: ${enemyHero.getInt()}`;
                }
                modalText.insertAdjacentHTML("beforeend", `<p>${resultText!}</p>`);

                setTimeout(() => {
                    if(playerScore > enemyScore) {
                        modalText.insertAdjacentHTML("beforeend", `<p>${playerHero.getName()} победил ${enemyHero.getName()}</p>`);
                    }
                    if(playerScore < enemyScore) {
                        modalText.insertAdjacentHTML("beforeend", `<p>${enemyHero.getName()} победил ${playerHero.getName()}</p>`);
                    }
                    if(playerScore === enemyScore) {
                        modalText.insertAdjacentHTML("beforeend", `<p>Ничья!</p>`);
                    }

                    // Разблокировка кнопки закрытия модального окна
                    closeModalButton.disabled = false;

                    // playerHero.restoreParameters();
                    // enemyHero.restoreParameters();
                }, 1500)
            }, 1500)
        }, 1500)
    }, 1500)
});

// Закрытие модального окна
closeModalButton.addEventListener("click", () => {
    document.getElementById("modal")!.style.visibility = "hidden";
})

// Функции
function fillCard(hero: Knight | Mage, fields: TypeFieldsForFill, isEnemy: boolean = false): void {
    // Получение полей для заполнения
    const { heroClass, heroName, heroLevel, heroStrength, heroAgility, heroHealth, heroIntelligence } = fields;

    // Заполнение карточки героя игрока
    heroClass.innerText = hero.getClass();
    heroName.innerText = hero.getName();
    heroLevel.innerText = hero.getLvl().toString();
    heroStrength.innerText = hero.getStr().toString();
    heroAgility.innerText = hero.getAgi().toString();
    heroHealth.innerText = hero.getHp().toString();
    heroIntelligence.innerText = hero.getInt().toString();

    // Разблокировка кнопки способности, если есть зелье
    if (!isEnemy) {
        if (hero.getHaveAbility()) {
            doSkillButton.disabled = false;

            doSkillButton.addEventListener("click", () => {
                hero.useAbility();

                // Заполнение карточки героя игрока
                if (hero.getClass() === EnumHeroClass.Knight) {
                    heroStrength.innerHTML =
                        hero.getStr().toString() +
                        `<span style="font-size: 10px; color: green;"> +${
                            hero.getBoost() + hero.getAbilityBoost()
                        }%</span>`;
                    heroAgility.innerHTML =
                        hero.getStr().toString() +
                        `<span style="font-size: 10px; color: green;"> +${hero.getAbilityBoost()}%</span>`;
                    heroHealth.innerHTML =
                        hero.getHp().toString() +
                        `<span style="font-size: 10px; color: green;"> +${
                            hero.getBoost() + hero.getAbilityBoost()
                        }%</span>`;
                    heroIntelligence.innerHTML =
                        hero.getInt().toString() +
                        `<span style="font-size: 10px; color: green;"> +${hero.getAbilityBoost()}%</span>`;
                }
                if (hero.getClass() === EnumHeroClass.Mage) {
                    heroIntelligence.innerHTML =
                        hero.getInt().toString() +
                        `<span style="font-size: 10px; color: green;"> +${hero.getAbilityBoost()}%</span>`;
                    heroHealth.innerHTML =
                        hero.getHp().toString() +
                        `<span style="font-size: 10px; color: green;"> +${hero.getAbilityBoost()}%</span>`;
                }
            });
        } else doSkillButton.disabled = true;
    }

    // Добавление надписи, показывающей буст к статам
    if (hero.getClass() === EnumHeroClass.Mage) {
        heroStrength.innerHTML =
            hero.getStr() +
            `<span style="font-size: 10px; color: green;"> +${hero.getBoost() + hero.getAbilityBoost()}%</span>`;
        heroAgility.innerHTML =
            hero.getAgi() +
            `<span style="font-size: 10px; color: green;"> +${hero.getBoost() + hero.getAbilityBoost()}%</span>`;
    }
    if (hero.getClass() === EnumHeroClass.Knight) {
        heroHealth.innerHTML =
            hero.getHp() + `<span style="font-size: 10px; color: green;"> +${hero.getBoost()}%</span>`;
        heroIntelligence.innerHTML =
            hero.getInt() + `<span style="font-size: 10px; color: green;"> +${hero.getBoost()}%</span>`;
    }
};

function closeModal(e: Event): void {
    if(e.target === modal ) {
        document.getElementById("modal")!.style.visibility = "hidden";
    }
}