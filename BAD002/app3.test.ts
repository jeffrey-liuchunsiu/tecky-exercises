import { Person, goToBarAsync } from "./app3"

// it("Testing goToBar with a teenager", () => {
//     const john = new Person(15);
//     const peter = new Person(20);
//     const johnSpy = jest.spyOn(john, 'drink');
//     const peterSpy = jest.spyOn(peter, 'drink');

//     const adults = goToBar([john, peter]);
//     expect(johnSpy).not.toBeCalled();
//     expect(peterSpy).not.toBeCalled();
//     expect(adults).rejects.toEqual([peter]);
// })


it("Testing goToBar with a teenager in async function", async () => {
    const john = new Person(15);
    const peter = new Person(20);
    const johnSpy = jest.spyOn(john, 'drink');
    const peterSpy = jest.spyOn(peter, 'drink');
    try {
        await goToBarAsync([john, peter]);
    } catch (err) {
        expect(err).toEqual([peter]);
    }
    expect(johnSpy).not.toBeCalled();
    expect(peterSpy).not.toBeCalled();
})