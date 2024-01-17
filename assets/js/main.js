const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext("2d");
console.log(ctx);

let canvasWidth = 600;
let canvasHeight = 600;
let tileSize = 20;

function drawGrid(tileSize) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.lineStyle = "black";
    for (let x = 0; x < canvasWidth; x += tileSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
    }
    for (let y = 0; y < canvasHeight; y += tileSize) {
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

function drawRect(xTile, yTile) {
    ctx.beginPath();
    ctx.fillRect(xTile * tileSize, yTile * tileSize, tileSize, tileSize);
}

drawGrid(tileSize);

canvas.addEventListener("click", (e) => {
    let currentTile = getClickedTile(e.offsetX, e.offsetY);
    drawRect(currentTile.x, currentTile.y);
});
