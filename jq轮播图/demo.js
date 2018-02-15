//点击确定，开始
$('.enter').on('click',function(){
    var imgSrc = $('.imgSrc').val();
    var imgNumber = parseInt($('.imgNumber').val());
    var imgWidth = parseInt($('.imgWidth').val());
    var imgSpeed = parseInt($('#imgSpeed').val());
    carousel(imgSrc,imgNumber,imgWidth,imgSpeed);
})
//生成轮播图
function carousel(imgSrc,imgNumber,imgWidth,imgSpeed){        
    //创建结构，添加图片
    function addImg(imgSrc,imgNumber,imgWidth){
        $('div.wrapper').remove();
        $('.input').before($('<div class="wrapper">\
                                    <ul class="content">\
                                    </ul>\
                                    <div class="option">\
                                        <div class="left"><</div>\
                                        <div class="right">></div>\
                                    </div>\
                                    <ul class="seat">\
                                    </ul>\
                                </div>'))
        var oContent = $('.wrapper .content');
        var oSeat = $('.wrapper .seat');
        var flag = true;
        oContent.css('width',imgWidth*(imgNumber+1)+ 'px')
        for(i=0 ; i<imgNumber ; i++){
            if(flag){
            flag = false;
            oContent.empty();
            oSeat.empty();
            }
            oSeat.append('<li class="num'+ (i+1) +' selected"></li>');
            oContent.append('<li class="demo'+ (i+1) +'"><img src="'+ imgSrc +'/'+ (i+1) +'.png" alt=""></li>');
        }
        oContent.append('<li class="demo'+ (imgNumber+1) +'"><img src="'+ imgSrc +'/'+ 1 +'.png" alt=""></li>');
        oContent.css('width',(imgWidth*(imgNumber+1))+'px');
        $('.wrapper').css('width',imgWidth+'px');
        $('.content li').css('width',imgWidth+'px');
        $('.content li img').css('width',imgWidth+'px');  
    }

    addImg(imgSrc,imgNumber,imgWidth);

    var oImg = $('.wrapper .content img');
    var maxLeft = -parseInt((imgNumber) * imgWidth);
    var timer = setInterval(move(imgWidth,maxLeft),((imgSpeed +1)*1000));    
    var oNum = $('.seat li');
    var oContent = $('.wrapper .content');
    //根据点击按钮跳转
    function clickSelect(){
        oNum.on('click',function(event){
            if(typeof(timer)=='number'){
                window.clearInterval(timer);        
            }
            var num = $(this).index();
            var _left = - num*imgWidth;
            oContent.stop();
            oContent.css('left', _left + 'px');
            changeIndex(_left,num);
            timer = setInterval(move(imgWidth,maxLeft),((imgSpeed +1)*1000)); 
        })
    }
    //根据图片位置或序号改变显示序号
    function changeIndex(imgLeft,nowIndex){
        if(nowIndex===undefined){
            nowIndex= - imgLeft / imgWidth;
        }
        if(nowIndex > imgNumber-1){
            nowIndex=0;
        }
        oNum.removeClass('selected');
        oNum.eq(nowIndex).addClass('selected');
    }
    //点击取消定时器
    function clickConcel(){
        $('.cancel').on('click',function(){
            if(typeof(timer)=='number'){
                window.clearInterval(timer);        
            }
        })
    }
    
    //根据点击左、右按钮进行播放
    function clickLeftRight(_left){
        $(".option div").on('click',function(event){            
            if(typeof(timer)=='number'){
                window.clearInterval(timer);        
            }
            var num = $(this).index();
            oContent.stop();
            if(num===0){                
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
            oContent .css('left',_left + 'px');
            changeIndex(_left); 
            timer = setInterval(move(imgWidth,maxLeft),((imgSpeed +1)*1000));     
        }) 
    }
    //定时器动画
    function move(imgWidth,maxLeft){
        return function() {
            var nowLeft = parseInt(oContent.css('left'));
            var _left; 
            clickSelect();
            if(nowLeft<=maxLeft){
                oContent.css('left','0px');
                nowLeft = 0;
            }
            _left = nowLeft - imgWidth ; 
            clickLeftRight(_left); 
            clickConcel();
            changeIndex(_left); 
            oContent.animate({left: _left + 'px'},(imgSpeed*200)); 
        }      
    }
}

