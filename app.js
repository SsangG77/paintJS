const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");


ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = "#2c2c2c";
ctx.fillStyle = "#2c2c2c";
ctx.lineWidth = 2.5;


canvas.width = 1000;
canvas.height = 600;

let painting = false;
let filling = true;

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

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function changeColor(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function changeRange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function changeMode() {
    if(filling === true) {
        filling = false;
        mode.innerText = "PAINT";
    } else {
        filling = true;
        mode.innerText = "FILL";
    }
}

function fillColor() {
    if(filling === true) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM(event) {
    event.preventDefault();
}

function save() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}



if(canvas) {
     canvas.addEventListener("mousemove", onMouseMove);
     canvas.addEventListener("mousedown", startPainting);
     canvas.addEventListener("mouseup", stopPainting);
     canvas.addEventListener("mouseleave", stopPainting);
     canvas.addEventListener("click", fillColor);
     canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", changeColor));

range.addEventListener("input", changeRange);

mode.addEventListener("click", changeMode);

saveBtn.addEventListener("click", save);