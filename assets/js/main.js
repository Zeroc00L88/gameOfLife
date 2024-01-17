const canvas = document.querySelector("#canvas1");
const canvasTop = document.querySelector("#canvas2");
const ctxTop = canvasTop.getContext("2d");
const ctx = canvas.getContext("2d");
const launchBtn = document.querySelector("#launchBtn");

let canvasWidth = 600;
let canvasHeight = 600;
let tileSize = 10;
let grid = createGrid();

canvasTop.addEventListener("click", (e) => {
    let currentTile = getClickedTile(e.offsetX, e.offsetY);
    updateGrid(currentTile.x, currentTile.y, 1);
    drawRect();
});

launchBtn.addEventListener("click", (e) => { });

function createGrid() {
    console.log("create grid");
    let gridX = canvasWidth / tileSize;
    let gridY = canvasHeight / tileSize;
    let grid = new Array(gridY).fill().map(() => new Array(gridX).fill(0));
    return grid;
}

function updateGrid(x, y, nb) {
    console.log("x:", x, ", y:", y);
    grid[y][x] = nb;
    console.log(grid);
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
            }
        });
    });
}

function clearTile(xTile, yTile) {
    ctxTop.clearRect(xTile * tileSize, yTile * tileSize, tileSize, tileSize);
}

drawGrid(tileSize);
