var inEnter = document.getElementsByClassName('enter')[0];
var main = document.getElementById('main');
var arr = [];
var lenY;
var lenX;
var timer;
var flagNumber;
var second=0;

//获取输入框，并开始
var getInputValue = function(){
    if(typeof(timer) ==='number'){
        clearInterval(timer);
        timer = undefined;
        second = 0;
        document.getElementsByClassName('time')[0].value = 0;
        
    }    
    document.getElementById('main').oncontextmenu = function () { //取消默认右键事件
        return false;
    }
    var inNumX = parseInt(document.getElementsByClassName("numX")[0].value);
    var inNumY = parseInt(document.getElementsByClassName('numY')[0].value);
    var inMinesNum = parseInt(document.getElementsByClassName('minesNum')[0].value);
    flagNumber = inMinesNum;
    showflagNumber();
    create(inNumX,inNumY,inMinesNum);
    lenY = document.getElementsByTagName('ul').length;
    lenX = document.getElementsByTagName('ul')[0].getElementsByTagName('li').length;
    getEvery(lenX,lenY);
    setMines(lenX,lenY,inMinesNum);
    minesNumber(lenX,lenY);
}

//创造结构
var create = function(numX,numY){
    var _arr = [];
    var str = ''; 
    for(var j=0;j<numY;j++){
        _arr[j] = '<ul id="order'+ j +'">';
        for(var i=0;i<numX;i++){
        _arr[j] += '<li class="blank" id="order'+ i +'">\
                    <p></p>\
                    <div>\
                        <img src="./img/start.png" alt="" class="start">\
                        <img src="./img/showed.png" alt="" class="showed">\
                        <img src="./img/flag.png" alt="" class="flag">\
                        <img src="./img/mine.png" alt="" class="mine">\
                        <img src="./img/mouseover.png" alt="" class="mouseover">\
                    </div>\
                </li>';
        }
        _arr[j] += '</ul>';
        str += _arr[j];        
    }
    main.innerHTML = str ;
    document.getElementById('main').style.width = 52*numX + 'px';
    document.getElementById('main').style.height = 52*numY+ 'px';
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

//兼容性遍历下一个节点
var nextnode = function(node) {
    if (node.nodeType === 1) { //判断是否是元素节点,排除空的文本节点
        return node;
    }
    if (node.nextSibling) {
        return nextnode(node.nextSibling);
    }
}
//随机设置minesNum枚雷的位置，将存雷小方块class设为“mine”
var setMines = function (lenX,lenY,minesNum) {
    for (var i = 0; i < minesNum; i++) {
        var ulnum = Math.floor(Math.random() * lenY);
        var linum = Math.floor(Math.random() * lenX);
        if(arr[ulnum][linum].className === "mines"){
            i--;
        }
        arr[ulnum][linum].className = "mines";
    }
}

//通过位置获取周围小方块，存储到around数组中
var siteAround = function(site) {
    var i = parseInt(site / lenX);
    var j = site % lenX;
    var around = [];
    if (i - 1 >= 0 && j - 1 >= 0) {     //左上
        around.push(arr[i - 1][j - 1]);
    }
    if (i - 1 >= 0) {                   //正上
        around.push(arr[i - 1][j]);
    }
    if (i - 1 >= 0 && j + 1 <= lenX-1) {     //右上
        around.push(arr[i - 1][j + 1]);
    }
    if (j - 1 >= 0) {                   //左边
        around.push(arr[i][j - 1]);
    }
    if (j + 1 <= lenX-1) {                   //右边
        around.push(arr[i][j + 1]);
    }
    if (i + 1 <= lenY-1 && j - 1 >= 0) {     //左下
        around.push(arr[i + 1][j - 1]);
    }
    if (i + 1 <= lenY-1) {                   //正下
        around.push(arr[i + 1][j]);
    }
    if (i + 1 <= lenY-1 && j + 1 <= lenX-1) {     //右下
        around.push(arr[i + 1][j + 1]);
    }
    return around;
}

//计算周围雷的数量，并以文本数字存储
var minesNumber = function(lenX,lenY) {
    for(var i=0;i<lenY;i++){
        for(var j=0;j<lenX;j++){  
            site = i*lenX + j;
            var around = siteAround(site,lenX,lenY);            
            if (arr[i][j].className != "mines"){
                var num = 0;
                for (var k = 0; k < around.length; k++) {
                    if (around[k].className === 'mines'){
                        num++;
                    }  
                }
                if(num>0){
                    arr[i][j].className = "minesNumber";
                    arr[i][j].firstElementChild.innerHTML = num;
                }                
            }
            arr[i][j].addEventListener('mouseup',setLiClick);
            //双击事件
            arr[i][j].ondblclick = function(){                
                if(event.currentTarget.className=='showedNumber'){
                    var around = siteAround(event.currentTarget.index);
                    var j=0;
                    for(var i=0;i<around.length;i++){
                        if(around[i].className=='mines'&&around[i].id=='flag'){
                            j++;                            
                        }                        
                    }
                    if(event.currentTarget.firstElementChild.innerHTML==j){
                        for(var i=0;i<around.length;i++){
                            if(around[i].className=='blank'){
                                around[i].className='showed';
                            }else if(around[i].className=='minesNumber'){
                                around[i].className ='showedNumber';
                            }
                        }
                    }                    
                }                
            }            
        }
    }
}

//点的如果是空白位置，点开一空白区域
var showAroundBlank = function (site) {
    var around = siteAround(site);
    for (var i = 0; i < around.length; i++) {
        if (around[i].className != 'mines' && around[i].id != 'flag' && around[i].className != 'showed' && around[i].className != 'showedNumber') {
            if (around[i].className === 'minesNumber') {
                around[i].className = 'showedNumber';
            } else {
                around[i].className = 'showed';
                showAroundBlank(around[i].index);
            }
        }
    }
}

//鼠标事件
var setLiClick = function(){ 
    showTime();     
    var btnNum = event.button;
    if (btnNum == 2) {//右键 
        if(event.currentTarget.className != 'showedNumber'&&event.currentTarget.className !=  'showed'){
            if (event.currentTarget.id != "flag") {
                flagNumber--;
                showflagNumber();
                event.currentTarget.id = "flag"; 
            } else if (event.currentTarget.id === "flag"){
                flagNumber++;
                showflagNumber();
                event.currentTarget.id = "noFlag";
            }
        }                        
    } else if (btnNum == 0) {                    //左键
        if (event.currentTarget.id == "flag") {
                //e.target.parentNode.parentNode.id = "noFlag";
        } else if (event.currentTarget.className === 'mines') {
            over();            
        } else if (event.currentTarget.className === 'blank') {
            event.currentTarget.className = 'showed';
            showAroundBlank(event.currentTarget.index);
        } else if (event.currentTarget.className === 'minesNumber') {
            event.currentTarget.className = 'showedNumber';
        }
    } else if (btnNum == 1) {            //中键

    }  
    ifWin();
}
//显示雷数-棋子数 
var showflagNumber = function(){    
    document.getElementsByClassName('number')[0].value = flagNumber;
}
//计时函数
var showTime = function(){
    if(timer===undefined){
        console.log('!!!!')
        timer = setInterval(function(){
            second++;
            document.getElementsByClassName('time')[0].value = second;
        },1000);
    }
}
//游戏结束
var over = function(){
    var mines = document.getElementsByClassName('mines');
    for(var i =0; i<mines.length;){
        mines[i].className = 'over';
    } 
    for (var i = 0; i < lenY; i++) {
        for (var j = 0; j < lenX ; j++) {
            arr[i][j].removeEventListener('click',setLiClick);
        }
    }
    clearInterval(timer);
    alert("game over!");    
}            
//判断是否胜利
var ifWin = function(){
    var over = document.getElementsByClassName('over');
    var blank = document.getElementsByClassName('blank');
    var minesNumber = document.getElementsByClassName('minesNumber');
    var mines = document.getElementsByClassName('mines');
    if((over.length==0&&blank.length==0&&minesNumber.length==0)){        
        return win();
    }
    var num = 0;
    var flagNum = 0;
    for (var i = 0; i < lenY; i++) {
        for (var j = 0; j < lenX ; j++) {
            if(arr[i][j].id === 'flag'){
                flagNum ++ ;          
            }
        }
    }
    for(var i =0; i<mines.length;i++){
        if(mines[i].id == 'flag'){
            num++;
        }
    } 
    if(over.length==0&&num==mines.length&&mines.length==flagNum){ 
        win();
    }
}
//胜利函数
var win = function(){
    for (var i = 0; i < lenY; i++) {
        for (var j = 0; j < lenX ; j++) {
            arr[i][j].removeEventListener('click',setLiClick);
            if (arr[i][j].className === 'mines') {
                arr[i][j].id='flag'; 
            } else if (arr[i][j].className === 'blank') {
                arr[i][j].className = 'showed';
            } else if (arr[i][j].className === 'minesNumber') {
                arr[i][j].className = 'showedNumber';
            }
        }
    }
    for(var i=0;i<lenY;i++){
        for(var j=0;j<lenX;j++){ 
            arr[i][j].removeEventListener('mouseup',setLiClick);
        }
    }
    clearInterval(timer);
    alert("win!");  
}


//开始
inEnter.addEventListener('click',getInputValue);

