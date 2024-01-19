import { Knight } from "./classes/Knight.js";
import { Mage } from "./classes/Mage.js";
import { Validator } from "./classes/Validator.js";
import { EnumHeroClass } from "./Enums.js";
// Получение HTML элементов формы
const heroForm = document.getElementById("heroForm");
const classInput = document.getElementsByName("class");
const nameInput = document.getElementById("name");
const levelInput = document.getElementById("level");
const strengthInput = document.getElementById("strength");
const intelligenceInput = document.getElementById("intelligence");
const agilityInput = document.getElementById("agility");
const additionalStatInput = document.getElementById("additionalStat");
const additionalAbilityInput = document.getElementsByName("additionalAbility");
// Получение HTML элементов карточки игрока
const playerHeroClass = document.getElementById("playerHeroClass");
const playerHeroName = document.getElementById("playerHeroName");
const playerHeroLevel = document.getElementById("playerHeroLevel");
const playerHeroStrength = document.getElementById("playerHeroStrength");
const playerHeroAgility = document.getElementById("playerHeroAgility");
const playerHeroHealth = document.getElementById("playerHeroHp");
const playerHeroIntelligence = document.getElementById("playerHeroIntelligence");
const doSkillButton = document.getElementById("doSkillButton");
// Получение HTML элементов карточки соперника
const enemyHeroClass = document.getElementById("enemyHeroClass");
const enemyHeroName = document.getElementById("enemyHeroName");
const enemyHeroLevel = document.getElementById("enemyHeroLevel");
const enemyHeroStrength = document.getElementById("enemyHeroStrength");
const enemyHeroAgility = document.getElementById("enemyHeroAgility");
const enemyHeroHealth = document.getElementById("enemyHeroHp");
const enemyHeroIntelligence = document.getElementById("enemyHeroIntelligence");
const getEnemyButton = document.getElementById("getEnemyButton");
// Получение кнопки "Начать батл"
const startBattleButton = document.getElementById("startBattleButton");
// Кнопка закрытия модального окна
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const modalText = document.getElementById("modalText");
const closeModalButton = document.getElementById("modalCloseButton");
// Герой игрока
let playerHero;
let enemyHero;
// Обработчики событий
heroForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Получение значений
    const heroClass = classInput[0].checked ? EnumHeroClass.Mage : EnumHeroClass.Knight;
    const name = nameInput.value;
    const level = +levelInput.value;
    const strength = +strengthInput.value;
    const intelligence = +intelligenceInput.value;
    const agility = +agilityInput.value;
    const additionalStat = +additionalStatInput.value;
    const haveAdditionalAbility = additionalAbilityInput[0].checked;
    const heroParameters = [
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
    const fieldsForFill = {
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
        const randomEnemy = data[Math.floor(Math.random() * data.length)];
        // Получение параметров соперника
        const enemyHeroParameters = [
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
        }
        else {
            // Создание соперника
            enemyHero = new Mage(...enemyHeroParameters);
        }
        // Заполнение карточки соперника
        const fieldsForFill = {
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
        let resultText;
        if (playerHero.getStr() > enemyHero.getStr()) {
            playerScore++;
            resultText = `Сила ${playerHero.getName()}: ${playerHero.getStr()} > силы ${enemyHero.getName()}: ${enemyHero.getStr()}`;
        }
        if (playerHero.getStr() < enemyHero.getStr()) {
            enemyScore++;
            resultText = `Сила ${playerHero.getName()}: ${playerHero.getStr()} < силы ${enemyHero.getName()}: ${enemyHero.getStr()}`;
        }
        if (playerHero.getStr() === enemyHero.getStr()) {
            resultText = `Сила ${playerHero.getName()}: ${playerHero.getStr()} = силе ${enemyHero.getName()}: ${enemyHero.getStr()}`;
        }
        modalText.insertAdjacentHTML("beforeend", `<p>${resultText}</p>`);
        setTimeout(() => {
            let resultText;
            if (playerHero.getAgi() > enemyHero.getAgi()) {
                playerScore++;
                resultText = `Ловкость ${playerHero.getName()}: ${playerHero.getAgi()} > ловкости ${enemyHero.getName()}: ${enemyHero.getAgi()}`;
            }
            if (playerHero.getAgi() < enemyHero.getAgi()) {
                enemyScore++;
                resultText = `Ловкость ${playerHero.getName()}: ${playerHero.getAgi()} < ловкости ${enemyHero.getName()}: ${enemyHero.getAgi()}`;
            }
            if (playerHero.getAgi() === enemyHero.getAgi()) {
                resultText = `Ловкость ${playerHero.getName()}: ${playerHero.getAgi()} = ловкости ${enemyHero.getName()}: ${enemyHero.getAgi()}`;
            }
            modalText.insertAdjacentHTML("beforeend", `<p>${resultText}</p>`);
            setTimeout(() => {
                let resultText;
                if (playerHero.getInt() > enemyHero.getInt()) {
                    playerScore++;
                    resultText = `Интеллект ${playerHero.getName()}: ${playerHero.getInt()} > интеллекта ${enemyHero.getName()}: ${enemyHero.getInt()}`;
                }
                if (playerHero.getInt() < enemyHero.getInt()) {
                    enemyScore++;
                    resultText = `Интеллект ${playerHero.getName()}: ${playerHero.getInt()} < интеллекта ${enemyHero.getName()}: ${enemyHero.getInt()}`;
                }
                if (playerHero.getInt() === enemyHero.getInt()) {
                    resultText = `Интеллект ${playerHero.getName()}: ${playerHero.getInt()} = интеллекта ${enemyHero.getName()}: ${enemyHero.getInt()}`;
                }
                modalText.insertAdjacentHTML("beforeend", `<p>${resultText}</p>`);
                setTimeout(() => {
                    if (playerScore > enemyScore) {
                        modalText.insertAdjacentHTML("beforeend", `<p>${playerHero.getName()} победил ${enemyHero.getName()}</p>`);
                    }
                    if (playerScore < enemyScore) {
                        modalText.insertAdjacentHTML("beforeend", `<p>${enemyHero.getName()} победил ${playerHero.getName()}</p>`);
                    }
                    if (playerScore === enemyScore) {
                        modalText.insertAdjacentHTML("beforeend", `<p>Ничья!</p>`);
                    }
                    // Разблокировка кнопки закрытия модального окна
                    closeModalButton.disabled = false;
                    // playerHero.restoreParameters();
                    // enemyHero.restoreParameters();
                }, 1500);
            }, 1500);
        }, 1500);
    }, 1500);
});
// Закрытие модального окна
closeModalButton.addEventListener("click", () => {
    document.getElementById("modal").style.visibility = "hidden";
});
// Функции
function fillCard(hero, fields, isEnemy = false) {
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
                            `<span style="font-size: 10px; color: green;"> +${hero.getBoost() + hero.getAbilityBoost()}%</span>`;
                    heroAgility.innerHTML =
                        hero.getStr().toString() +
                            `<span style="font-size: 10px; color: green;"> +${hero.getAbilityBoost()}%</span>`;
                    heroHealth.innerHTML =
                        hero.getHp().toString() +
                            `<span style="font-size: 10px; color: green;"> +${hero.getBoost() + hero.getAbilityBoost()}%</span>`;
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
        }
        else
            doSkillButton.disabled = true;
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
}
;
function closeModal(e) {
    if (e.target === modal) {
        document.getElementById("modal").style.visibility = "hidden";
    }
}
