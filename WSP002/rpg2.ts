import { Monster } from './rpg';
// import {Player} from './rpg';

interface Attack {
    damage: number
}

class BowAndArrow implements Attack {
    //Bow and Arrow Attack here
    damage: number;
    constructor(player: String) {
        if (player == "Amazon") {
            this.damage = 30;
        }
    }
}

class ThrowingSpear implements Attack {
    // Throwing Spear Attack here
    damage: number;
    constructor(player: String) {
        if (player == "Amazon") {
            this.damage = 40;
        } else if (player == "Barbarian") {
            this.damage = 30
        }

    }
}

//@ts-ignore
class Swords implements Attack {
    // Swords Attack here
    damage: number;
    constructor(player: String) {
        if (player == "Paladin") {
            this.damage = 50;
        } else if (player == "Barbarian") {
            this.damage = 55
        }

    }
}
//@ts-ignore
class MagicSpells implements Attack {
    // Magic Spells Attack here
    damage: number;
    constructor(player: String) {
        if (player == "Paladin") {
            this.damage = 25;
        }

    }
}


interface newPlayer {
    attack(monster: Monster): void;
    switchAttack(): void;
    gainExperience(exp: number): void;
}

class Character implements newPlayer {
    private strength: number;
    private name: string;
    private primary: Attack;
    private secondary: Attack;
    private usePrimaryAttack: boolean;
    constructor(character: string, name: string) {
        this.primary = new BowAndArrow(character);
        this.secondary = new ThrowingSpear(character);
        // TODO: set the default value of usePrimaryAttack
        this.usePrimaryAttack = true;
        this.name = name;
    }

    attack(monster: Monster): void {
        let monsterPreviousHP = monster.getHP();
        if (this.usePrimaryAttack) {
            // TODO: use primary attack
            monster.injured(this.primary.damage)
        } else {
            // TODO: use secondary attack
            monster.injured(this.secondary.damage)
        }
        let difference = monsterPreviousHP - monster.getHP();
        console.log(difference);

        if (difference == 30) {
            console.log(`Player ${this.name} attacks a monster (HP: ${monster.getHP()})`);
        } else if (difference == 60) {
            console.log(`Player ${this.name} attacks a monster (HP: ${monster.getHP()}) [CRITICAL]`);
        }
        this.gainExperience(difference)
    }

    switchAttack() {
        // TODO: Change the attack mode for this player
        if (this.usePrimaryAttack === true) {
            this.usePrimaryAttack = false
        } else {
            this.usePrimaryAttack = true
        }
    }

    gainExperience(exp: number): void {
        this.strength = this.strength + exp;
    }

    //.. The remaining methods.
}

const character = new Character("Amazon", "Jeffrey")
const monster = new Monster();
character.attack(monster);
character.attack(monster);
character.attack(monster);
character.attack(monster);
character.attack(monster);

//  class Monster{
//  // You can use the `Monster` before
//  }