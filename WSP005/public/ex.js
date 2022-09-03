// document.querySelector(".nineBoxes").addEventListener('click', function (event) {
//     // document.querySelector(".nineBoxes").innerHTML
//     // let result = document.querySelector(".nineBoxes").querySelectorAll('div');
//     // console.log(result[0].innerHTML)
//     // if ()
//     // if (res)
//     console.log(event.target);
//     if (event.target.matches('li')) {
//         console.log("yes");
//     }
// })

let turn = 1;

let players = { "X": 0, "O": 0 }

// document.querySelector("#box-1").addEventListener('click', function (event) {

//     // let result = document.querySelector(".nineBoxes").querySelectorAll('div');
//     // console.log(document.querySelector("#box-1").innerHTML);
//     if (document.querySelector("#box-1 .box-text").innerHTML !== "X") {
//         document.querySelector("#box-1 .box-text").innerHTML = "X"
//     }
//     // console.log(event.innerHTML)

// })


const boxes = document.querySelectorAll('.box')
let winningArray = [
    "123", "456", "789", "147", "258", "369", "159", "357"
]
//console.log(winningArray.includes("123"));
let circleArray = [];
let crossArray = [];
let overallArray = [];

for (let box of boxes) {
    box.addEventListener('click', function (event) {
        const boxText = event.target.querySelector('.box-text');
        // console.log(boxText)
        // console.log(boxText.innerHTML);
        if (boxText.innerHTML === "") {
            if (turn % 2 === 1) {
                boxText.innerHTML = "X"
                boxText.classList.add('box-cross');
                document.querySelector(".whose_turn").innerHTML = "O"
            } else {
                boxText.innerHTML = "O"
                boxText.classList.add('box-circle');
                document.querySelector(".whose_turn").innerHTML = "X"
            }

            turn++
        }
        //console.log(boxes);
        // console.log(boxText.classList);
        //for (let box of boxes)
        const boxTexts = document.querySelectorAll('.box-text')
        // console.log(boxTexts);
        for (let boxText of boxTexts) {
            if (boxText.matches('.box-circle')) {
                // console.log(boxText.id);
                if (!circleArray.includes(boxText.id)) {
                    //let circleString = circleArray.push(boxText.id).join("")
                    circleArray.push(boxText.id)
                    overallArray.push(boxText.id)
                    let circleString = circleArray.join("")
                    if (winningArray.includes(circleString)) {
                        setTimeout(() => {
                            //console.log("Circle win");
                            players.O += 1
                            //console.log(players);
                            document.querySelector(".O_marks").innerHTML = players.O
                            if (window.confirm("Circle Win. Do you want to restart?")) {
                                restart()
                            }
                        }, 100);
                    } else if (overallArray.length === 9) {
                        setTimeout(() => {
                            if (window.confirm("Draw. Do you want to restart?")) {
                                restart()
                            }
                        }, 100);
                    }
                }
                //console.log(circleArray);
            } else if (boxText.matches('.box-cross')) {
                // console.log(boxText.id);
                if (!crossArray.includes(boxText.id)) {
                    //let circleString = circleArray.push(boxText.id).join("")
                    crossArray.push(boxText.id)
                    overallArray.push(boxText.id)
                    let crossString = crossArray.join("")
                    if (winningArray.includes(crossString)) {
                        //console.log("Cross win");
                        players.X += 1
                        //console.log(players);
                        document.querySelector(".X_marks").innerHTML = players.X
                        setTimeout(() => {
                            if (window.confirm("Cross Win. Do you want to restart?")) {
                                restart()
                            }
                        }, 100);
                    } else if (overallArray.length === 9) {
                        setTimeout(() => {
                            if (window.confirm("Draw. Do you want to restart?")) {
                                restart()
                            }
                        }, 100);
                    }
                }
                //console.log(circleArray);
            };
        }
    });
}

function restart() {
    let texts = document.querySelectorAll(".box-text")
    for (let text of texts) {
        console.log(text.classList);
        if (text.classList.contains('box-cross')) {
            text.classList.remove('box-cross');
        } else if (text.classList.contains('box-circle')) {
            text.classList.remove('box-circle');
        }
        console.log(text.classList);
        text.innerHTML = ""
        circleArray = [];
        crossArray = [];
        overallArray = [];
    }
}


document.querySelector(".restart_game").addEventListener('click', function (event) {

    restart()
    players.X = 0;
    players.O = 0;
    document.querySelector(".X_marks").innerHTML = 0;
    document.querySelector(".O_marks").innerHTML = 0;
    turn = 1;
    document.querySelector(".whose_turn").innerHTML = "X"
})