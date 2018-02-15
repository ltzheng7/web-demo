//点击确定，开始
document.getElementsByClassName('enter')[0].onclick = function(){
    var imgSrc = document.getElementsByClassName('imgSrc')[0].value;
    var imgNumber = parseInt(document.getElementsByClassName('imgNumber')[0].value );  
    var imgWidth = parseInt(document.getElementsByClassName('imgWidth')[0].value );
    var imgSpeed = parseInt(document.getElementById('imgSpeed')[0].value) ;
    carousel(imgSrc,imgNumber,imgWidth,imgSpeed);
}

//生成轮播图
function carousel(imgSrc,imgNumber,imgWidth,imgSpeed){        
    //创建结构，添加图片
    function addImg(imgSrc,imgNumber,imgWidth){
        if(typeof(document.getElementsByClassName('wrapper')[0])=='object'){
            var parent = document.getElementsByClassName('wrapper')[0].parentNode;
            parent.removeChild(document.getElementsByClassName('wrapper')[0]);
        }
        var timer;
        var oWrapper = document.createElement('div');
        oWrapper.className = 'wrapper';
        document.getElementById('main').insertBefore(oWrapper,document.getElementsByTagName('script')[0]);
        oWrapper.innerHTML = '<ul class="content">\
                            </ul>\
                            <div class="option">\
                                <div class="leftButton"><</div>\
                                <div class="rightButton">></div>\
                            </div>\
                            <ul class="seat">\
                            </ul>' 
        var oContent = document.getElementsByClassName('content')[0];
        var oSeat = document.getElementsByClassName('seat')[0];
        var contentString ='';
        var seatString ='';
        for(i=0 ; i<(imgNumber+1) ; i++){ 
            if(i<imgNumber){
                seatString += '<li class="num'+ (i+1) +' " id="' + i + '" ></li>';
                contentString += '<li class="demo'+ (i+1) +'"><img src="'+ imgSrc +'/'+ (i+1) +'.png" alt=""></li>';
            }else{
                contentString += '<li class="demo'+ (i+1) +'"><img src="'+ imgSrc +'/'+ 1 +'.png" alt=""></li>';
            }          
        }
        oSeat.innerHTML = seatString;
        oContent.innerHTML = contentString;
        var oLi = oContent.getElementsByTagName('li');
        var oImg = oContent.getElementsByTagName('img');
        oWrapper.style.width = imgWidth+'px';
        oContent.style.width = imgWidth*(imgNumber+1)+'px';
        for(j=0; j<imgNumber+1 ; j++){
            oLi[j].style.width = imgWidth+'px';
            oImg[j].style.width = imgWidth+'px';
        }
    }
    addImg(imgSrc,imgNumber,imgWidth);
    var maxLeft = -parseInt((imgNumber) * imgWidth);
    var oContent = document.getElementsByClassName('content')[0];
    var oSeat = document.getElementsByClassName('seat')[0];
    var oNum = oSeat.getElementsByTagName('li');
    var oOption = document.getElementsByClassName('option')[0];

    //根据图片位置或序号改变显示序号
    function changeIndex(imgLeft,nowIndex){
        if(nowIndex===undefined){
            nowIndex = Math.ceil(-(imgLeft / imgWidth));
        }
        if(nowIndex > imgNumber-1){
            nowIndex=0;
        }
        if(typeof(oSeat.getElementsByClassName('selected')[0])=='object'){
            oSeat.getElementsByClassName('selected')[0].className = '';
        }
        oNum[nowIndex].className ='selected';
        return nowIndex;
    }

    //点击取消定时器
    function clickConcel(){
        document.getElementsByClassName('cancel')[0].onclick = function(){
            if(typeof(timer)=='number'){
                clearInterval(timer);
            }
        }
    }

    //根据点击序号按钮进行跳转
    function clickSelect(){        
        for(i=0 ; i<imgNumber ; i++){
            oNum[i].onclick = function(){
                var num = this.id;
                var _left = - num*imgWidth;
                oContent.style.left =  _left + 'px';
                changeIndex(_left,num); 
                clearInterval(timer);
                timer=undefined;
            }
        }             
    }

    //根据点击左、右按钮进行播放
    function clickLeftRight(_left){               
        for(i=0 ; i<2 ; i++){            
            oOption.getElementsByTagName('div')[i].onclick = function(){
                var index = changeIndex(_left);
                 _left = -(index*imgWidth);
                if(this.className == 'leftButton'){                
                    _left += imgWidth;
                    if(_left >0 ){
                        _left = -(imgNumber-1)* imgWidth;
                    }                                                                                                                                                                                                                                                                                              
                }else{
                    _left -= imgWidth;
                    if(_left <= maxLeft){
                        _left = 0;
                    }
                }
                oContent.style.left= _left + 'px' ;
                changeIndex(_left);
                clearInterval(timer);
                timer=undefined;     
            }       
        }
    }

    //定时器动画
    var pictureMove =function(){
        timer = setInterval(function(){
        var nowLeft = oContent.offsetLeft ;        
        if(nowLeft<=maxLeft){
            oContent.style.left='0px';
            nowLeft = 0;
        }
        clickConcel();
        clickSelect(); 
        changeIndex(nowLeft - imgWidth);
        clickLeftRight(nowLeft - imgWidth);
        oContent.style.left = nowLeft - imgWidth +'px';        
        clearInterval(timer);
        timer=undefined;                
        },(imgSpeed*200));
    }
    changeIndex(0,0);

    var time = setInterval(pictureMove,3000);         

}