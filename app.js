const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");//canvas의 context를 2D로 설정
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const rangeValue = document.querySelector(".controls__range :nth-child(2)");
const clearAllBtn = document.getElementById("jsClearAll");

//픽셀을 다루는 윈도우가 얼마나 큰지 크기를 지정해주어야한다.
canvas.width = 700;
canvas.height = 700;
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

ctx.strokeStyle = "#2c2c2c";
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.lineCap = "round";
ctx.fillStyle = "white";
//초기색을 지정하지않으면 배경색을 건드리지않고 저장했을 때 투명으로 저장됨
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;//단위 : px 

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
    if(filling){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}

function onMouseMove(e){
    const x = e.offsetX;
    const y = e.offsetY;
    if(!painting){//마우스를 클릭하지 않고 움직일 때 path를 시작한다.
        ctx.beginPath();//path는 선을 말하는 것이다.
        ctx.moveTo(x,y);//path를 move 이동시킨다.
        //그러나 여기서 그려진 path들은 사용된적은 없다.
    }else{
        ctx.lineTo(x,y);//beginPath의 좌표에서 linTo의 좌표까지 선을 만든다.
        //lineTo : 현재의 sub-path에서 마지막 지점을 특정 좌표로 연결한다.
        ctx.stroke();//stroke을 해주어야 선이 보이게된다.
        //마우스를 움직이는 내내 작은 선들이 계속 만들어진다.
    }
}

function handleColorClick(e){
    const color = e.target.style.backgroundColor;
    ctx.strokeStyle = color;//클릭하면 펜의 색을 클릭한 색으로 바꾼다.
    ctx.fillStyle = color;//클릭하면 채우기 색을 클릭한 색으로 바꾼다.
}

function handleRangeChange(e){
    const size = e.target.value;
    ctx.lineWidth = size;
    rangeValue.value = size;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    }else{
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(){
    
}

function handleCM(e){//contextmenu(캔버스위에 마우스 우클릭하면 생기는 메뉴)
    //contextmenu가 생기는 것을 없에는 함수
    e.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

function handleClearAllClick(){
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

//colors를 console을 했는데 배열의 형태가 아니여서 배열로 바꿔주었다. 
//array.from(object)메소드는 object로 부터 array를 만든다.
Array.from(colors).forEach(color => 
    color.addEventListener("click",handleColorClick)
    );

if(range){
    range.addEventListener("input",handleRangeChange);
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick);
}

if(clearAllBtn){
    clearAllBtn.addEventListener("click",handleClearAllClick);
}