const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext("2d");
console.log(ctx);

ctx.fillStyle = "white";
ctx.fillRect(10, 10, 150, 100);

canvas.addEventListener("click", (e) => {
    console.log("x :", e.offsetX);
    console.log("y :", e.offsetY);
});
