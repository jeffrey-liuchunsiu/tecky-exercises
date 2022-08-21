// import { myAsciiArt } from './asciiExample.js'
// let { ascii_arr } = require('./asciiExample.js')

const unitLength = 20;
const boxColor = 50;
const secondColor = "yellow"
const thirdColor = "orange"
let forthColor = "blue"
let strokeColor = 50;
let backgroundColor = 50
let columns; /* To be determined by window width */
let rows;    /* To be determined by window height */
let currentBoard;
let nextBoard;
let fps = 30; //starting FPS
let lonelinessValue = 2;
let overpopulationValue = 3;
let start = true;

let canvasTimeInterval
let snakeTimeInterval

let snakeX = 0;
let snakeY = 0;
let marks = 0;
let count = 1;
let generateOK = true;
let totalNumberOfCell;
let countOfCell = 0;
let startGame = false;

let bullets = {}
// let bulletNames = []
let currentNumOfBulletsOnBoard = 0;
let numberOfBulletsName = 0;

let roundFinished = false;

let myAsciiArt;
let myAsciiArt2;
let asciiart_width = 120; var asciiart_height = 60;
let images = [];
let gfx;
let gfx2;
let ascii_arr;
let ascii_arr2;
// let cyclic_t;

let pattern = `
_0_
000
_0_
`

function generatePattern(pattern) {
    let resultArray = []
    let indices = []
    for (var i = 0; i < pattern.length; i++) {
        if (pattern[i] === "\n") {
            indices.push(i);
        } else {
            resultArray.push(pattern[i])
        }
    }
    let patternWidth = indices[1] - indices[0] - 1;
    let patternColumn = indices.length - 1;
}

function setup() {
    /* Set the canvas to be under the element #canvas*/
    const canvas = createCanvas(windowWidth - 20, windowHeight - 110);
    // let randomX = Math.floor((windowWidth) / unitLength) - 3;
    // let randomY = Math.floor((windowHeight - 110) / unitLength) - 3;
    // console.log(randomX);
    // console.log(randomY);
    canvas.parent(document.querySelector('#canvas'));

    /*Calculate the number of columns and rows */
    columns = floor(width / unitLength);
    rows = floor(height / unitLength);

    totalNumberOfCell = columns * rows;
    // console.log("totalNumberOfCell = ", totalNumberOfCell);

    /*Making both currentBoard and nextBoard 2-dimensional matrix that has (columns * rows) boxes. */
    currentBoard = [];
    nextBoard = [];
    for (let i = 0; i < columns; i++) {
        currentBoard[i] = [];
        nextBoard[i] = []
    }


    // Now both currentBoard and nextBoard are array of array of undefined values.
    init();  // Set the initial values of the currentBoard and nextBoard
}

/**
 * Initialize/reset the board state
 */
function init() {
    startGame = false;
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            currentBoard[i][j] = { value: 0, bullet: false, snake: false, times: 0, static: false };
            nextBoard[i][j] = { value: 0, bullet: false, snake: false, times: 0, static: false };
        }
    }
    // start = true;
    marks = 0;
    count = 1;
    countOfCell = 0;
    // if (bulletNames.length > 0) {
    //     let bulletName = bulletNames[0]
    //     bullets[bulletName].destroyBullet();
    // }
    bullets = {}
    // bulletNames = []
    currentNumOfBulletsOnBoard = 0;
    numberOfBulletsName = 0;

    generateOK = true;
    document.querySelector('#generate-pattern').textContent = "Stop Generate Pattern";

    document.querySelector('.marks').textContent = marks;
    let randomX = Math.abs(Math.floor(Math.random() * Math.floor((windowWidth) / unitLength)) - 3);
    let randomY = Math.abs(Math.floor(Math.random() * Math.floor((windowHeight - 110) / unitLength)) - 3);
    // console.log(randomX);
    // console.log(randomY);
    patternGen(pattern, randomX, randomY)
}



function draw() {
    // canvasInterval = setInterval(() => {
    // clearInterval(snakeTimeInterval)
    if (roundFinished === false) {
        background(50);
        // console.log(bullets);
        count++;
        if (start) {
            if (count % fps === 0) {
                generate();

                // for (let bulletName of bulletNames) {
                //     console.log(bulletName);
                // }
                for (let key in bullets) {
                    // console.log(bullets[key]);
                    // let bulletName = bulletNames[0]
                    // console.log(bullets[key].getBulletState());
                    if (bullets[key].getBulletState() == true) {
                        let bulletX = bullets[key].getXPosition();
                        let bulletY = bullets[key].getYPosition();
                        // console.log("bulletX: ", bulletX);
                        // console.log("columns: ", columns);
                        if (bulletX < columns - 1) {
                            bullets[key].addPosition();
                            let bulletX = bullets[key].getXPosition();
                            // console.log("bulletX: ", bulletX);
                            currentBoard[bulletX][bulletY] = { value: 1, bullet: true, snake: false, times: 0, static: true };
                            if (bulletX > 0 && bulletX - 1 !== snakeX) {
                                currentBoard[bulletX - 1][bulletY] = { value: 0, bullet: false, snake: false, times: 0, static: false };
                            }
                        } else if (bulletX === columns - 1) {
                            // console.log("edge bulletX: ", bulletX);
                            currentBoard[bulletX][bulletY] = { value: 0, bullet: false, snake: false, times: 0, static: false };
                            bullets[key].destroyBullet();
                        }
                    }
                }

            }
        }

        // console.log(count);


        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {

                if (currentBoard[i][j].snake == true) {
                    // console.log("position value: ", i, j);
                    fill("green");
                    stroke("white");
                    // rect(i * unitLength, j * unitLength, unitLength, unitLength);
                    let xFactor = i * unitLength
                    let yFactor = j * unitLength
                    quad(xFactor, yFactor, xFactor + unitLength, yFactor + unitLength / 5, xFactor + unitLength, yFactor + unitLength * 4 / 5, xFactor, yFactor + unitLength);
                } else if (currentBoard[i][j].bullet == true) {
                    fill("red")
                    currentNumOfBulletsOnBoard++
                    stroke("white");
                    // noStroke();
                    let xFactor = i * unitLength
                    let yFactor = j * unitLength
                    rect(xFactor, yFactor + unitLength * 4 / 10, unitLength, unitLength * 2 / 10);
                } else {
                    if (currentBoard[i][j].value == 1) {
                        if (currentBoard[i][j].static === false) {
                            if (currentBoard[i][j].times === 1) {
                                fill(secondColor);
                            } else if (currentBoard[i][j].times >= 2 && currentBoard[i][j].times < 3) {
                                fill(thirdColor);
                            } else if (currentBoard[i][j].times >= 3) {
                                fill(forthColor);
                            }
                            // stroke(50);
                            noStroke();
                            let factor = unitLength / 100
                            let xFactor = i * unitLength
                            let yFactor = j * unitLength
                            quad(xFactor + 38 * factor, yFactor + 31 * factor, xFactor + 86 * factor, yFactor + 20 * factor, xFactor + 69 * factor, yFactor + 63 * factor, xFactor + 30 * factor, yFactor + 76 * factor);

                            // circle(i * unitLength + unitLength / 2, j * unitLength + unitLength / 2, unitLength, unitLength);
                        } else {
                            fill("white");
                            // stroke("white");
                            noStroke();
                            rect(i * unitLength, j * unitLength, unitLength, unitLength);
                        }
                    } else {
                        fill(50);
                        // stroke(strokeColor);
                        noStroke();
                        rect(i * unitLength, j * unitLength, unitLength, unitLength);
                        if (startGame === true) {

                            if (countOfCell < totalNumberOfCell) {
                                countOfCell++
                                // console.log("countOfCell: ", countOfCell);
                            }
                        }
                    }
                }

                // stroke(strokeColor);
                // rect(i * unitLength, j * unitLength, unitLength, unitLength);
            }
        }
        if (countOfCell === totalNumberOfCell - 1 - currentNumOfBulletsOnBoard) {

            for (let i = 0; i < columns; i++) {
                for (let j = 0; j < rows; j++) {
                    fill(50);
                    // stroke(50);
                    noStroke();
                    rect(i * unitLength, j * unitLength, unitLength, unitLength);
                }
            }
            setTimeout(() => {
                if (startGame === true) {
                    // alert('Win');
                    modal.style.display = "block";
                }
                startGame = false;
                generateOK = false;
                // init()
            }, 400);
        }
        currentNumOfBulletsOnBoard = 0;
        countOfCell = 0;
        // console.log(count);
        if (start) {
            if (count % 500 === 0) {
                if (generateOK) {
                    let randomX = Math.abs(Math.floor(Math.random() * Math.floor((windowWidth) / unitLength)) - 3);
                    let randomY = Math.abs(Math.floor(Math.random() * Math.floor((windowHeight - 110) / unitLength)) - 3);
                    patternGen(pattern, randomX, randomY)
                }
            }
        }
        setSpeed()
        if (count > 2100) {
            count = 0
        }
    } else {
        background(20);
        // cyclic_t = millis() * 0.0002 % images.length;
        // console.log(cyclic_t);
        // tint(255, pow(1.0 - (cyclic_t % 1.0), 4) * 255);
        // gfx.image(images[floor(cyclic_t)], 0, 0, gfx.width, gfx.height);
        gfx.image(images[1], 0, 0, gfx.width, gfx.height);
        gfx.filter(POSTERIZE, 3);
        ascii_arr = myAsciiArt.convert(gfx);
        myAsciiArt.typeArray2d(ascii_arr, this, 0, 0, (width - 701.8) / 2, windowHeight - 110);

        gfx2.image(images[0], 0, 0, gfx2.width, gfx2.height);
        gfx2.filter(POSTERIZE, 3);
        ascii_arr2 = myAsciiArt2.convert(gfx2);
        myAsciiArt2.typeArray2d(ascii_arr2, this, (width - 701.8) / 2, 0, 701.8, 466.4);

        myAsciiArt.typeArray2d(ascii_arr, this, (width - 701.8) / 2 + 701.8, 0, (width - 701.8) / 2, windowHeight - 110);
        // setTimeout(() => {
        tint(255, 80);
        image(images[0], (width - 701.8) / 2, 0, 701.8, 466.4);
        noTint();
        // }, 200);
        noLoop()
    }
    // setLoneliness()
    // setOverpopulation()

}
// }, 10);





function setSpeed() {
    slider = document.querySelector("#speedSlider");
    // fps = parseInt(slider.value);
    slider.oninput = function () {
        document.querySelector('.speedValue').textContent = this.value;
        fps = 61 - parseInt(this.value);
        // console.log(fps);
    }

    // console.log(fps);
    // frameRate(fps);
}

function setLoneliness() {
    lonelinessValue = document.querySelector('#loneliness').value
    document.querySelector('.loneliness-textValue').textContent = lonelinessValue;
}
function setOverpopulation() {
    overpopulationValue = document.querySelector('#overpopulation').value
    document.querySelector('.overpopulation-textValue').textContent = overpopulationValue;
}

function startStop() {
    // noLoop()
    // loadImage('https://upload.wikimedia.org/wikipedia/en/f/ff/SuccessKid.jpg', img => {
    //     image(img, 200, 200);
    // });
    // createCanvas(636, 424);
    // draw()
    // myAsciiArt.typeArray2d(ascii_arr, this);
    // console.log(myAsciiArt);
    // console.log(testVariable);
    // canvas.parent(document.querySelector('#canvas'));
    if (start) {
        start = false;
        // console.log(start);
        document.querySelector('.start-stop-text').textContent = "Start";
    } else {
        // console.log(start);
        start = true;
        document.querySelector('.start-stop-text').textContent = "Stop";
    }
}

document.querySelector("#start-stop").addEventListener('click', function () {
    startStop()
});
document.querySelector("#generate-pattern").addEventListener('click', function () {
    if (generateOK) {
        generateOK = false;
        document.querySelector('#generate-pattern').textContent = "Generate Pattern";
        // console.log(generateOK);
    } else {
        let randomX = Math.abs(Math.floor(Math.random() * Math.floor((windowWidth) / unitLength)) - 3);
        let randomY = Math.abs(Math.floor(Math.random() * Math.floor((windowHeight - 110) / unitLength)) - 3);
        patternGen(pattern, randomX, randomY)
        generateOK = true;
        document.querySelector('#generate-pattern').textContent = "Stop Generate Pattern";
        // console.log(generateOK);
    }
});



function generate() {
    // console.log('2 - 8 :', currentBoard[2][8].value)
    //Loop over every single box on the board
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            // Count all living members in the Moore neighborhood(8 boxes surrounding)
            let neighbors = 0;
            for (let i of [-1, 0, 1]) {
                for (let j of [-1, 0, 1]) {
                    if (i == 0 && j == 0) {
                        // the cell itself is not its own neighbor
                        continue;
                    }
                    // The modulo operator is crucial for wrapping on the edge


                    // if ((x) == 3 && (y) == 0) {
                    //     console.log(`${(x + i + columns) % columns} , ${(y + j + rows) % rows} = ${cellValue}`)
                    // }
                    let item = currentBoard[(x + i + columns) % columns][(y + j + rows) % rows]
                    if (item.bullet == false && item.snake == false) {
                        neighbors += item.value
                        // neighbors += (currentBoard[(x + i + columns) % columns][(y + j + rows) % rows]).value
                    }


                }
            }
            // if ((x) == 3 && (y) == 0) {
            //     console.log(neighbors)
            // }
            // Rules of Life
            // console.log(currentBoard[x][y]);
            if (currentBoard[x][y].value == 1 && neighbors < lonelinessValue && currentBoard[x][y].static == false && currentBoard[x][y].snake == false && currentBoard[x][y].bullet == false) {
                // Die of Loneliness
                (nextBoard[x][y]).value = 0;
                (nextBoard[x][y]).times = 0;
                (nextBoard[x][y]).snake = false;
                (nextBoard[x][y]).bullet = false;
                // (nextBoard[x][y]).static = false;

            } else if (currentBoard[x][y].value == 1 && neighbors > overpopulationValue && currentBoard[x][y].static == false && currentBoard[x][y].snake == false && currentBoard[x][y].bullet == false) {
                // Die of Overpopulation
                (nextBoard[x][y]).value = 0;
                (nextBoard[x][y]).times = 0;
                (nextBoard[x][y]).snake = false;
                (nextBoard[x][y]).bullet = false;
                // (nextBoard[x][y]).static = false;

            } else if (currentBoard[x][y].value == 0 && neighbors == 3 && currentBoard[x][y].static == false && currentBoard[x][y].snake == false && currentBoard[x][y].bullet == false) {
                // New life due to Reproduction
                let time = (nextBoard[x][y]).times + 1;

                (nextBoard[x][y]).value = 1;
                (nextBoard[x][y]).times = time;
                (nextBoard[x][y]).snake = false;
                (nextBoard[x][y]).bullet = false;
                (nextBoard[x][y]).static = false;

            } else {
                // Stasis
                // if (currentBoard[x][y].snake == false) {
                nextBoard[x][y] = currentBoard[x][y];
                // }
            }
        }
    }

    // Swap the nextBoard to be the current Board


    [currentBoard, nextBoard] = [JSON.parse(JSON.stringify(nextBoard)), JSON.parse(JSON.stringify(currentBoard))];
}

// let tempArr = [b,a]
// [a,b] = tempArr

// a = tempArr[0]
// b = tempArr[1]


/**
 * When mouse is dragged
 */
function mouseDragged() {
    /**
     * If the mouse coordinate is outside the board
     */

    if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
        return;
    }
    const x = Math.floor(mouseX / unitLength);
    const y = Math.floor(mouseY / unitLength);
    currentBoard[x][y] = { value: 1, bullet: false, snake: false, times: 0, static: false };
    fill(boxColor);
    stroke("white");
    rect(x * unitLength, y * unitLength, unitLength, unitLength);
}

/**
 * When mouse is pressed
 */
function mousePressed() {
    noLoop();
    mouseDragged();
}

/**
 * When mouse is released
 */
function mouseReleased() {
    loop();
}


document.querySelector('#reset-game')
    .addEventListener('click', function () {
        setup()
        roundFinished = false;
        loop()
        init();
    });

window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }

    switch (event.key) {
        case "ArrowDown":
            startGame = true;
            snakeY += 1;
            if (snakeY >= 0 && snakeY < rows) {
                if (currentBoard[snakeX][snakeY].value === 1) {
                    marks++;
                    document.querySelector('.marks').textContent = marks;
                }
            }
            currentBoard[snakeX][snakeY] = { value: 0, bullet: false, snake: true, times: 0, static: true };
            currentBoard[snakeX][snakeY - 1] = { value: 0, bullet: false, snake: false, times: 0, static: false };
            break;
        case "ArrowUp":
            startGame = true;
            snakeY -= 1;
            if (snakeY >= 0 && snakeY < rows) {
                if (currentBoard[snakeX][snakeY].value === 1) {
                    marks++;
                    document.querySelector('.marks').textContent = marks;
                }
            }
            currentBoard[snakeX][snakeY] = { value: 0, bullet: false, snake: true, times: 0, static: true };
            currentBoard[snakeX][snakeY + 1] = { value: 0, bullet: false, snake: false, times: 0, static: false };
            break;
        case "ArrowLeft":
            startGame = true;
            snakeX -= 1;
            // console.log("snakeX: ", snakeX);
            // console.log("column:", columns);
            if (snakeX < columns && snakeX >= 0) {
                if (currentBoard[snakeX][snakeY].value === 1) {
                    marks++;
                    document.querySelector('.marks').textContent = marks;
                }
            }
            if (snakeX >= 0 && snakeX < columns - 1) {
                currentBoard[snakeX][snakeY] = { value: 0, snake: true, times: 0, static: true };
                currentBoard[snakeX + 1][snakeY] = { value: 0, snake: false, times: 0, static: false };
            } else if (snakeX == -1) {
                currentBoard[snakeX + 1][snakeY] = { value: 0, snake: false, times: 0, static: false };
            } else if (snakeX == columns - 1) {
                currentBoard[snakeX][snakeY] = { value: 0, snake: true, times: 0, static: true };
            }
            break;
        case "ArrowRight":
            startGame = true;
            snakeX += 1;
            if (snakeX < columns && snakeX >= 0) {
                if (currentBoard[snakeX][snakeY].value === 1) {
                    marks++;
                    document.querySelector('.marks').textContent = marks;
                }
            }
            if (snakeX < columns && snakeX > 0) {
                currentBoard[snakeX][snakeY] = { value: 0, bullet: false, snake: true, times: 0, static: true };
                currentBoard[snakeX - 1][snakeY] = { value: 0, bullet: false, snake: false, times: 0, static: false };
            } else if (snakeX == columns) {
                currentBoard[snakeX - 1][snakeY] = { value: 0, bullet: false, snake: false, times: 0, static: false };
            } else if (snakeX == 0) {
                currentBoard[snakeX][snakeY] = { value: 0, bullet: false, snake: true, times: 0, static: true };
            }
            break;
        case " ":
            numberOfBulletsName++
            let bulletName = `bullet${numberOfBulletsName}`
            // bulletNames.push(bulletName)
            bullets[bulletName] = bulletRight()


            break;
        case "Tab":
            // let position = bullet1.addXPosition();
            // console.log(position)
            break;
        default:
            return; // Quit when this doesn't handle the key event.
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}, true);
// the last option dispatches the event to the listener first,
// then dispatches event to window


function patternGen(pattern, randomX, randomY) {
    let patternArr = pattern.split('\n')
    patternArr.pop()
    patternArr.shift()
    // console.log(patternArr)
    // let patternArr = []
    for (let i = 0; i < patternArr[0].length; i++) {
        for (let j = 0; j < patternArr.length; j++) {
            // console.log("i :", i);
            // console.log("j :", j);
            if (patternArr[j][i] === '0') {
                xPosition = randomX + i
                yPosition = randomY + j
                currentBoard[xPosition][yPosition] = { value: 1, bullet: false, snake: false, times: 0, static: true };
                // console.log(currentBoard[j][i]);
                // fill("black");
                // stroke(strokeColor);
                // rect(i * unitLength, j * unitLength, unitLength, unitLength);

            } else {
                currentBoard[j][i] = { value: 0, bullet: false, snake: false, times: 0, static: false };

            }
        }
    }
}

function bulletRight() {
    let test = 0
    let bulletExist = true
    let length = 2
    let xPosition = snakeX;
    let yPosition = snakeY;

    return {
        destroyBullet: () => {
            bulletExist = false;
            return bulletExist;
        },
        addPosition: () => {
            xPosition += 1;
            return xPosition;
        },
        setYPosition: () => {
            yPosition = snakeY;
            return yPosition;
        },
        minusLength: () => {
            if (length >= 1) {
                length -= 1;
                return length;
            }
        },
        length: () => {
            return length;
        },
        getXPosition: () => {
            return xPosition;
        },
        getYPosition: () => {
            return yPosition;
        },
        getBulletState: () => {
            return bulletExist;
        }
    }
}


// Get the modal
let modal = document.getElementById("winModal");

// Get the button that opens the modal
// let btn = document.getElementById("winBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
// btn.onclick = function () {
//     modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
    if (Object.keys(bullets).length === 0) {
        setupAscii()
        roundFinished = true;
    } else {
        init()
    }
}

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//     // console.log(event.target);
//     if (event.target == modal) {
//         modal.style.display = "none";
//         if (Object.keys(bullets).length === 0) {
//             setupAscii()
//             roundFinished = true;
//         } else {
//             init()
//         }
//     }
// }



function preload() {
    images[0] =
        loadImage('https://upload.wikimedia.org/wikipedia/en/f/ff/SuccessKid.jpg');
    images[1] =
        loadImage('https://images.unsplash.com/photo-1584531979583-18c5c4b25efc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80');
}

function setupAscii() {
    let canvas2 = createCanvas(windowWidth - 20, windowHeight - 110); // we need some space...
    canvas2.parent(document.querySelector('#canvas'));

    gfx = createGraphics(20, 20);
    gfx.pixelDensity(1);
    myAsciiArt = new AsciiArt(this);
    myAsciiArt.printWeightTable();
    gfx2 = createGraphics(asciiart_width, asciiart_height);
    gfx2.pixelDensity(1);
    myAsciiArt2 = new AsciiArt(this);
    myAsciiArt2.printWeightTable();
    textAlign(CENTER, CENTER); textFont('monospace', 8); textStyle(NORMAL);
    noStroke(); fill(255);
    frameRate(30);
}

// function draw() {
//     background(0);
//     cyclic_t = millis() * 0.0002 % images.length;
//     gfx.image(images[floor(cyclic_t)], 0, 0, gfx.width, gfx.height);
//     gfx.filter(POSTERIZE, 3);
//     ascii_arr = myAsciiArt.convert(gfx);

//     myAsciiArt.typeArray2d(ascii_arr, this);
//     // tint(255, pow(1.0 - (cyclic_t % 1.0), 4) * 255);
//     // image(images[floor(cyclic_t)], 0, 0, width, height);
//     // noTint();
// }

// function mouseReleased() {
//   console.log(myAsciiArt.convert2dArrayToString(ascii_arr));
// }

typeArray2d = function (_arr2d, _dst, _x, _y, _w, _h) {
    if (_arr2d === null) {
        // console.log('[typeArray2d] _arr2d === null');
        return;
    }
    if (_arr2d === undefined) {
        // console.log('[typeArray2d] _arr2d === undefined');
        return;
    }
    switch (arguments.length) {
        case 2: _x = 0; _y = 0; _w = width; _h = height; break;
        case 4: _w = width; _h = height; break;
        case 6: /* nothing to do */ break;
        default:
            console.log(
                // '[typeArray2d] bad number of arguments: ' + arguments.length
            );
            return;
    }
    if (_dst.canvas === null) {
        // console.log('[typeArray2d] _dst.canvas === null');
        return;
    }
    if (_dst.canvas === undefined) {
        // console.log('[typeArray2d] _dst.canvas === undefined');
        return;
    }
    var temp_ctx2d = _dst.canvas.getContext('2d');
    if (temp_ctx2d === null) {
        // console.log('[typeArray2d] _dst canvas 2d context is null');
        return;
    }
    if (temp_ctx2d === undefined) {
        // console.log('[typeArray2d] _dst canvas 2d context is undefined');
        return;
    }
    var dist_hor = _w / _arr2d.length;
    var dist_ver = _h / _arr2d[0].length;
    var offset_x = _x + dist_hor * 0.5;
    var offset_y = _y + dist_ver * 0.5;
    for (var temp_y = 0; temp_y < _arr2d[0].length; temp_y++)
        for (var temp_x = 0; temp_x < _arr2d.length; temp_x++)
      /*text*/temp_ctx2d.fillText(
            _arr2d[temp_x][temp_y],
            offset_x + temp_x * dist_hor,
            offset_y + temp_y * dist_ver
        );
}