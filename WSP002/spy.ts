class GovAgent {

    constructor(public country: string, public name: string) {
        this.country = country
        this.name = name
    }
    // 宣誓
    vow() {
        console.log(`I, ${this.name}, serve for ${this.country}`)
    }
    realVow() {
        console.log(`I am really ${this.name}, truely serve for ${this.country}`)
    }
}

type spy = {
    fake: {
        country: string,
        name: string
    }, real: {
        country: string,
        name: string
    }
}
// modify this function to make realVow() work as expected
function createSpy(this: any) {
    let fakeAgent = new GovAgent(this.fake.country, this.fake.name)
    let realAgent = new GovAgent(this.real.country, this.real.name)

    return {
        fakeAgent: () => {
            return fakeAgent
        },
        realAgent: () => {
            return realAgent
        },
        vow: () => {
            // console.log(`I, ${this.real.name}, serve for ${this.real.country}`)
            return fakeAgent.vow()
        },
        realVow: () => {
            return realAgent.realVow()
        }

    }
}
function createSpyOption(option: any) {
    let fakeAgent = new GovAgent(option.fake.country, option.fake.name)
    let realAgent = new GovAgent(option.real.country, option.real.name)

    return {
        fakeAgent: () => {
            return fakeAgent
        },
        realAgent: () => {
            return realAgent
        },
        vow: () => {
            // console.log(`I, ${this.real.name}, serve for ${this.real.country}`)
            return fakeAgent.vow()
        },
        realVow: () => {
            return realAgent.realVow()
        }

    }
}
// function createSpyOption(option: spy) {
//     // let fakeAgent = new GovAgent(option.fake.country, option.fake.name)
//     let realAgent = new GovAgent(option.real.country, option.real.name)

//     return realAgent

// }


let 約兒 = new GovAgent('東國', 'Alice')

// let 洛伊德 = createSpy.bind({
//     fake: { country: '東國', name: 'Frank' },
//     real: { country: '西國', name: 'Eve' },
// })
let 洛伊德 = createSpyOption({
    fake: { country: '東國', name: 'Frank' },
    real: { country: '西國', name: 'Eve' },
})



console.log('==============================')

約兒.vow() // print: I, Alice, serve for 東國
約兒.realVow() // print: I am really Alice, truely serve for 東國

console.log('==============================')

洛伊德.vow() // I, Frank, serve for 東國
洛伊德.realVow() // I am really Eve, truely serve for 西國

console.log('==============================')