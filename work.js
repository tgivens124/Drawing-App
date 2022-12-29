const canvas = document.getElementById("myCanvas");
var width = 1300;
var height = 600;

canvas.height = height;
canvas.width = width;
let prevX = null;
let prevY = null;
let draw = false;
const ctx = canvas.getContext("2d");

canvas.style.position = "fixed";
canvas.style.top = "80px";
canvas.style.left = "100px";
window.addEventListener("mousedown", (getPosition) => (draw = true));
window.addEventListener("mouseup", (getPosition) => (draw = false));
window.addEventListener("mousemove", getPosition);
function getPosition(e) {
  if (prevX == null || prevY == null || draw == false) {
    prevX = e.clientX - 100;
    prevY = e.clientY - 80;

    return;
  }

  let currentX = e.clientX - 100;
  let currentY = e.clientY - 80;

  // draw line from previous spot to current spot
  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(currentX, currentY);
  ctx.stroke();

  prevX = currentX;
  prevY = currentY;
}

let colors = document.querySelectorAll(".color");
colors = Array.from(colors);
colors.forEach((element) => {
  element.addEventListener("click", () => {
    // use arrow function on each element - cant use separate function
    ctx.strokeStyle = element.dataset.color;
  });
});
let clear = document.querySelector(".clear");
clear.addEventListener("click", clearCanvas);
//save the image
let saveBtn = document.querySelector(".save");
saveBtn.addEventListener("click", () => {
  // use arrow function to save image
  let data = canvas.toDataURL("imag/png");
  let a = document.createElement("a");
  a.href = data;
  a.download = "sketch.png";
  a.click();
});
// function to clear canvas
function clearCanvas() {
  ctx.clearRect(0, 0, width, height);
}
