const canvas = document.querySelector("#canvas1");
const canvasTop = document.querySelector("#canvas2");
const ctxTop = canvasTop.getContext("2d");
const ctx = canvas.getContext("2d");
const launchBtn = document.querySelector("#launchBtn");
const stepBtn = document.querySelector("#stepBtn");
const clearBtn = document.querySelector("#clearBtn");

let canvasWidth = 600;
let canvasHeight = 600;
let tileSize = 10;
let grid = createGrid();
let gameInterval;

canvasTop.addEventListener("click", (e) => {
    let currentTile = getClickedTile(e.offsetX, e.offsetY);
    updateGrid(currentTile.x, currentTile.y, 1);
    drawRect();
});

launchBtn.addEventListener("click", (e) => {
    gameInterval = setInterval(() => {
        checkAround();
        drawRect();
    }, 100);
});

stepBtn.addEventListener("click", (e) => {
    checkAround();
    drawRect();
});

clearBtn.addEventListener("click", (e) => {
    clearInterval(gameInterval);
    clear();
    drawRect();
});

function checkAround() {
    let add = [];
    let remove = [];
    grid.forEach((el, y) => {
        el.forEach((e, x) => {
            let ngbCount = 0;
            if (y > 0) {
                ngbCount += grid[y - 1][x];
            }
            if (y > 0 && x < el.length - 1) {
                ngbCount += grid[y - 1][x + 1];
            }
            if (x < el.length - 1) {
                ngbCount += grid[y][x + 1];
            }
            if (y < grid.length - 1 && x < el.length - 1) {
                ngbCount += grid[y + 1][x + 1];
            }
            if (y < grid.length - 1) {
                ngbCount += grid[y + 1][x];
            }
            if (y < grid.length - 1 && x > 0) {
                ngbCount += grid[y + 1][x - 1];
            }
            if (x > 0) {
                ngbCount += grid[y][x - 1];
            }
            if (y > 0 && x > 0) {
                ngbCount += grid[y - 1][x - 1];
            }
            if (e == 1) {
                if (ngbCount <= 1 || ngbCount >= 4) {
                    let arrRemove = [];
                    arrRemove.push(x);
                    arrRemove.push(y);
                    remove.push(arrRemove);
                }
            } else {
                if (ngbCount == 3) {
                    let arrAdd = [];
                    arrAdd.push(x);
                    arrAdd.push(y);
                    add.push(arrAdd);
                }
            }
        });
    });
    remove.map((e) => {
        updateGrid(e[0], e[1], 0);
    });
    add.map((e) => {
        updateGrid(e[0], e[1], 1);
    });
}

function createGrid() {
    let gridX = canvasWidth / tileSize;
    let gridY = canvasHeight / tileSize;
    let grid = new Array(gridY).fill().map(() => new Array(gridX).fill(0));
    return grid;
}

function updateGrid(x, y, nb) {
    grid[y][x] = nb;
}

function drawGrid(tileSize) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.lineStyle = "black";
    for (let x = 0; x <= canvasWidth; x += tileSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
    }
    for (let y = 0; y <= canvasHeight; y += tileSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvasWidth, y);
    }
    ctx.stroke();
}

function getClickedTile(x, y) {
    let tileX = Math.floor(x / tileSize);
    let tileY = Math.floor(y / tileSize);
    return { x: tileX, y: tileY };
}

function drawRect() {
    grid.forEach((el, y) => {
        el.forEach((e, x) => {
            if (e == 1) {
                ctxTop.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
            } else {
                clearTile(x, y);
            }
        });
    });
}

function clearTile(xTile, yTile) {
    ctxTop.clearRect(xTile * tileSize, yTile * tileSize, tileSize, tileSize);
}

function clear() {
    grid = createGrid();
}

drawGrid(tileSize);
