var oEnter = document.getElementsByClassName('enter')[0];
var oStart = document.getElementsByClassName('start')[0];
var oGa = document.getElementsByTagName('input')[0];
var oUF = document.getElementsByTagName('input')[1];
var oDiv = document.getElementsByClassName('drag')[0];
var offsetX ;
var offsetY ;
var timerDrag;
var timerMove;
var position = {
    x:[0,0,0,0],
    y:[0,0,0,0]
}
var speedX;
var speedY;
//重力加速度
var ga={
    x:0,
    y:10
}
//摩擦力系数
var uFriction = 0.95;
//重新开始
var start = function(){
    clearInterval(timerDrag);
    clearInterval(timerMove);
    oDiv.style.top = '0px';
    oDiv.style.left = '0px';
    oDiv.removeEventListener("mousemove",mousemove);
    document.removeEventListener("mousemove",mousemove);
    oDiv.removeEventListener("mouseleave",mouseleave);
    oDiv.removeEventListener("mouseup",mouseup);
}
//获得输入值
var getValue = function(){
    ga.y = parseFloat(oGa.value) || ga.y ;
    if (parseFloat(oUF.value)){
        uFriction = parseFloat(oUF.value);
    }
}
//获得松开鼠标时初始速度
var getSpeed = function(){
    position.x.push(parseInt(oDiv.style.left));
    position.y.push(parseInt(oDiv.style.top));
    position.x.splice(0,1);
    position.y.splice(0,1);
    speedX = position.x[3] - position.x[0];
    speedY = position.y[3] - position.y[0];
}
//松开鼠标后自动运动
var autoMove = function(){
    var _left = parseInt(oDiv.style.left);
    var _top = parseInt(oDiv.style.top);
    if(_left + speedX + oDiv.clientWidth >= innerWidth){
        oDiv.style.left = innerWidth - oDiv.clientWidth + 'px';
        speedX = -speedX;
    }else if(_left + speedX < 0){
        oDiv.style.left = '0px';
        speedX = -speedX;
    }else{
        oDiv.style.left = _left + speedX + 'px';
    }
    if(_top + speedY + oDiv.clientHeight >= innerHeight){
        oDiv.style.top = innerHeight - oDiv.clientHeight + 'px';
        speedY = -speedY;
    }else if(_top + speedY < 0){
        oDiv.style.top = '0px';
        speedY = -speedY;
    }else{
        oDiv.style.top = _top + speedY + 'px';
    }
    if(speedY!=0){
        speedY += ga.y;
        // console.log(speedY)
    }
    speedY *= uFriction;
    speedX *= uFriction;
}
//鼠标按下执行函数
var mousedown = function() {
    clearInterval(timerDrag);
    clearInterval(timerMove);
    offsetX = event.offsetX;
    offsetY = event.offsetY;
    oDiv.addEventListener("mousemove",mousemove);
    oDiv.addEventListener("mouseleave",mouseleave);
    oDiv.addEventListener("mouseup",mouseup);
    timerDrag = setInterval(getSpeed,50);
}
//鼠标移动执行函数
var mousemove = function(){
    var clickX = event.clientX;
    var clickY = event.clientY;
    oDiv.style.left = clickX - offsetX +'px';
    oDiv.style.top = clickY - offsetY +'px';
}
//鼠标离开div执行函数
var mouseleave = function(){
    document.addEventListener("mousemove",mousemove);
}
//鼠标抬起执行函数
var mouseup = function(){
    oDiv.removeEventListener("mousemove",mousemove);
    document.removeEventListener("mousemove",mousemove);
    oDiv.removeEventListener("mouseleave",mouseleave);
    oDiv.removeEventListener("mouseup",mouseup);
    clearInterval(timerDrag);
    timerMove = setInterval(autoMove,50);
}
oEnter.addEventListener("click",getValue); 
oStart.addEventListener("click",start); 
oDiv.addEventListener("mousedown",mousedown);        