const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");//canvas의 context를 2D로 설정

//픽셀을 다루는 윈도우가 얼마나 큰지 크기를 지정해주어야한다.
canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;//단위 : px 

let painting = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
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

function onMouseDown(e){
    painting = true;
}


if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
}