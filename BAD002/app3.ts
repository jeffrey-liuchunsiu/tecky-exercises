export class Person {
    constructor(public age: number) { }

    drink() {
        console.log("I am drunk")
    }
}

// export function goToBar(people:Person[]){
//     const adults = people.filter(person=>person.age > 18);
//     adults.map(adult=>adult.drink());
// }

// export async function goToBar(people: Person[]): Promise<Person[]> {
//     const adults = people.filter(person => person.age > 18);
//     if (adults.length == people.length) {
//         adults.map((person) => person.drink());
//         return adults;
//     } else {
//         throw adults;
//     }
// }

export async function goToBarAsync(people: Person[]): Promise<Person[]> {
    const adults = people.filter(person => person.age > 18);
    if (adults.length == people.length) {
        adults.map((person) => person.drink());
        return adults
    } else {
        throw adults;
    }
}