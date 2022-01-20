const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const D_COLOR = "#2c2c2c";
const saveBtn = document.getElementById("jsSave");


canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;


ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = D_COLOR;
ctx.fillStyle = D_COLOR;
ctx.lineWidth = 2.5;


let painting = false;
let filling = false;

function startPainting() {
    painting = true;
}

function stopPainting() {
    painting = false;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}


function changeColor(event) {
    const clickedColor = event.target.style.backgroundColor;
    ctx.strokeStyle = clickedColor;
    ctx.fillStyle = ctx.strokeStyle;
}

Array.from(colors).forEach(color => color.addEventListener("click", changeColor));

function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting)
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", fillColor);
    canvas.addEventListener("contextmenu", handleCM);
}

function fillColor() {
    if(filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function changRange(event) {
    const rangeValue = event.target.value;
    ctx.lineWidth = rangeValue;
}

function modeChange() {
    if(filling === true) {
        filling = false;
        mode.innerText = "PAINT";

    } else {
        filling = true;
        mode.innerText = "FILL";
        fillColor();
    }
}


range.addEventListener("input", changRange);

if(mode) {
    mode.addEventListener("click", modeChange);
}
if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}