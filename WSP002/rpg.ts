
// Declaration of Class and its methods
class Player {
    private strength: number;
    private name: string;
    private attackDamage: number = 20;
    constructor(strength: number, name: string) {
        this.strength = strength;
        this.name = name;
    }


    attack(monster: Monster) {
        let monsterPreviousHP = monster.getHP();
        monster.injured(this.attackDamage)
        let difference = monsterPreviousHP - monster.getHP();
        if (difference == 20) {
            console.log(`Player ${this.name} attacks a monster (HP: ${monster.getHP()})`);
        } else if (difference == 40) {
            console.log(`Player ${this.name} attacks a monster (HP: ${monster.getHP()}) [CRITICAL]`);
        }
        this.gainExperience(difference)
    }


    gainExperience(exp: number): void {
        this.strength = this.strength + exp;
    }

    getName() {
        return this.name;
    }

}


export class Monster {
    // Think of how to write injure
    private hp: number = 100;
    // private name: string;


    injured(attackDamage: number) {
        let value = Math.floor(Math.random() * 2)
        // console.log(value);
        // console.log(this.hp);

        if (value == 0) {

            if (this.hp >= attackDamage) {
                this.hp -= attackDamage
                // console.log(this.hp);
            } else {
                this.hp = 0;
            }
        } else if (value == 1) {
            if (this.hp >= attackDamage * 2) {
                this.hp -= attackDamage * 2
                // console.log(this.hp);
            } else {
                this.hp = 0;
            }
        }
    }

    getHP() {
        return this.hp;
    }
}


// Invocations of the class and its methods
//@ts-ignore
const player = new Player(20, 'Peter');
//@ts-ignore
const monster = new Monster();
// player.attack(monster);
// player.attack(monster);
// player.attack(monster);
// player.attack(monster);
// player.attack(monster);
// English counterpart: Player attacks monster