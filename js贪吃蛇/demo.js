var arr=[];
var arrow;
var timer;
var time;
var second;
var speed=3;
var snake = [];
var x=30;
var y=30;
var keyTime;
var keyNum;
var startButtom = document.getElementsByClassName('start')[0];
//创造结构
var create = function(x,y){
    var _arr = [];
    var str = '';
    for(var i=0;i<y;i++){
        _arr[i]='<ul class="oUl">';
        for(var j=0;j<x;j++){
            _arr[i] += '<li class="oLi"></li>';
        }
        _arr[i]+='</ul>';
        str += _arr[i];
    }
    document.getElementsByClassName('main')[0].innerHTML = str;
}

//兼容性遍历下一个节点
var nextnode = function(node) {
    if (node.nodeType === 1) { //判断是否是元素节点,排除空的文本节点
        return node;
    }
    if (node.nextSibling) {
        return nextnode(node.nextSibling);
    }
}

//把每个格子装入数组arr
var getEvery = function(lenX,lenY){
    for (var i = 0; i < lenY; i++) {
        arr[i] = [];
        var parent = document.getElementsByTagName('ul');
        for (var j = 1; j < lenX ; j++) {
            arr[i][0] = parent[i].firstElementChild;
            arr[i][j] = nextnode(arr[i][j - 1].nextSibling);
            arr[i][j].index = i*lenX + j;
            arr[i][0].index = i*lenX;           
        }        
    }
}
//产生小蛇
var createSnake = function(x,y){
    var ulnum = Math.floor(Math.random() * y);
    var linum = Math.floor(Math.random() * x);
    arr[ulnum][linum].className = "snake"; 
    snake.push(arr[ulnum][linum].index);
}

//产生食物
var createFood = function(foodNum,x,y){
    for(var i=0;i<foodNum;i++){
        var ulnum = Math.floor(Math.random() * y);
        var linum = Math.floor(Math.random() * x);
        if(arr[ulnum][linum].className === "snake"){
            i--;
        }else{
            arr[ulnum][linum].className = "food";
        }
    } 
}
//键盘事件，判断哪个方位键被按下
var witchPress = function(){
    var len = snake.length;
    var key = event.which || event.keyCode;
    if(keyNum>0){
        for(;1;){
            if(key==97){
                if(arrow =='right'&&len>=2){
                }else{
                    arrow = 'left';break;  
                }        
            }else if(key==119){
                if(arrow =='down'&&len>=2){
                }else{
                    arrow = 'up';  break; 
                }        
            }else if(key==100){
                if(arrow =='left'&&len>=2){
                }else{
                    arrow = 'right';  break; 
                }        
            }else if(key==115){
                if(arrow =='up'&&len>=2){
                }else{
                    arrow = 'down';  break; 
                } 
            }else{
                break; 
            }
        }
        keyNum =0 ;
    } 
    
    if(typeof(arrow)=='string'&&arrow.length>1){
        if(timer===undefined){
            timer = setInterval(snakeMove(snake,x,y),speed*90);
        }
        if(time===undefined){
            second = 0;
            time = setInterval(function(){
                second++;
                document.getElementsByClassName('time')[0].value = second + '';
            },1000); 
        }           
    }       
}
//根据按键值，开始运动
var startMove = function(snake,x,y,speed){
    document.addEventListener('keypress',witchPress); 
    if(keyTime===undefined){        
        keyTime = setInterval(function(){keyNum++;},speed*95); 
    }       
}
//运动规则
var snakeMove = function(){    
    return function(){
        var len = snake.length;
        var _del ;
        if(len>=1){
            if(arrow==='left'){
                if(((snake[0])%x) > 0){
                    _del = snake[len-1];
                    snake.splice(0,0,snake[0]-1);
                    snake.splice(-1,1);                                           
                }else if(parseInt(snake[0]% x) == 0 ){
                    _del = snake[len-1];
                    snake.splice(0,0,snake[0]+x-1); 
                    snake.splice(-1,1);                     
                }
            }else if(arrow==='up'){
                if(parseInt((snake[0])/x) > 0){
                    _del = snake[len-1];
                    snake.splice(0,0,snake[0]-y);
                    snake.splice(-1,1);                    
                }else if(parseInt((snake[0])/x) == 0 ){
                    _del = snake[len-1];
                    snake.splice(0,0,snake[0]+(y-1)*x);
                    snake.splice(-1,1);                    
                }
            }else if(arrow==='right'){
                if(((snake[0])%x) < x-1){
                    _del = snake[len-1];
                    snake.splice(0,0,snake[0]+1);
                    snake.splice(-1,1);                    
                }else if(parseInt(snake[0]% x) == x-1 ){
                    _del = snake[len-1];
                    snake.splice(0,0,snake[0]-(x-1));
                    snake.splice(-1,1);                    
                }
            }else if(arrow==='down'){
                if(parseInt((snake[0])/x) < y-1){
                    _del = snake[len-1];
                    snake.splice(0,0,snake[0]+y);
                    snake.splice(-1,1);                    
                }else if(parseInt((snake[0])/x) >= y-1 ){
                    _del = snake[len-1];
                    snake.splice(0,0,snake[0]-(y-1)*x);
                    snake.splice(-1,1);                    
                }
            }           
        } 
        eatFood(x,y);
        showSnake(snake,x,y,_del);
        document.getElementsByClassName('snakeLen')[0].value =snake.length + '';
       
    }
        
}
        
//吃食物长大
var eatFood = function(x,y){
    var i = parseInt(snake[0] / x);
    var j = snake[0] % x;
    if(0<=i&&i<x&&0<=j&&j<y){
        if(arr[i][j].className === 'food'){
            snake.splice(0,0,arr[i][j].index);                
            arr[i][j].className = 'eatFood';
            createFood(1,x,y);
        }  
    }
}

//运动显示
var showSnake = function(site,x,y,del){
    var len = site.length;
    if(len>=1){ 
        var oi = parseInt(site[0] / x);
        var oj = site[0] % x;
        if(0<=oi&&oi<x&&0<=oj&&oj<y){ 
            if(arr[oi][oj].className === 'snake'){                    
                return over();
            }else{
                for(var k = 0;k<len;k++){
                    var i = parseInt(site[k] / x);
                    var j = site[k] % x;           
                    if(0<=i&&i<x&&0<=j&&j<y){             
                        arr[i][j].className = 'snake';
                    }                   
                }       
                var _i = parseInt(del / x);
                var _j = del % x;
                if(0<=_i&&_i<x&&0<=_j&&_j<y){
                    if(arr[_i][_j].className === 'snake'){
                        arr[_i][_j].className = 'blank';
                    }
                }
            }
        }
    }    
}

//游戏结束
var over = function(){
    document.removeEventListener('keypress',witchPress);
    clearInterval(timer);
    timer = undefined;
    clearInterval(time);
    time = undefined;
    alert('game over!');
}

//初始化启动
var start = function(){
    snake =[];
    second = 0 ;
    keyNum=0;
    document.getElementsByClassName('snakeLen')[0].value =snake.length + '';
    document.getElementsByClassName('time')[0].value = second + '';
    var x = parseInt(document.getElementsByClassName("numX")[0].value);
    var y = parseInt(document.getElementsByClassName('numY')[0].value);
    var speed = parseInt(document.getElementsByClassName('speed')[0].value);    
    create(x,y);
    getEvery(x,y);
    createFood(1,x,y);
    createSnake(x,y);
    startMove(snake,x,y,speed);
}

startButtom.addEventListener('click',start);