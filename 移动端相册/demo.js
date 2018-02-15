var data =[
    {url:'./img/1.png'},
    {url:'./img/2.png'},
    {url:'./img/3.png'},
    {url:'./img/4.png'},
    {url:'./img/5.png'},
    {url:'./img/6.png'},
    {url:'./img/7.png'},
    {url:'./img/8.png'},
    {url:'./img/9.png'},
    {url:'./img/10.png'},
    {url:'./img/11.png'},
    {url:'./img/12.png'},
    {url:'./img/13.png'},
    {url:'./img/14.png'}
];
var screenW_H;
var len =data.length;

var init =function(){
    addImg();
    changeHW();
    $('.wrapper').on('tap','.img',show);
    $('.show').on('tap',hide);
    $('.show').on('swipeLeft',go_left);
    $('.show').on('swipeRight',go_right);
}

var addImg = function(){
    var img;
    var str = '';
    data.forEach(function(ele,index){
        str += '<div><img class="img" index="'+ index +'" src="'+ ele.url+ '"></div>';
    })
    $('.wrapper').html(str);
}

var changeHW = function(){
    var img_all = $('.wrapper div img');
    for(var i=0;i<img_all.length;i++){
        var img_w = $(img_all[i]).css('width');
        $(img_all[i]).css('height',img_w) ;
    }
    
}
var getScreenW_H = function(){
    var screenW= document.body.clientWidth;
    var screenH= document.body.clientHeight;
    screenW_H = screenW/ screenH; 
}

var show = function(direction,now_i){
    if(direction=='left'){console.log( now_index,now_i)
        if(now_i==len-1){ 
            return ;           
        }else{
            now_i++;
        } 
    }else if(direction=='right'){console.log( now_index,now_i)
        if(now_i==0){ 
            return ;           
        }else{
            now_i--;
        } 
    }
    var now_index = now_i>=0?now_i:$(this).parent().index();    console.log(now_index,now_i)
    var img = new Image();
    img.src = $('.img').eq(now_index).attr('src');
    img.onload = function(){      
        $('.show').empty().css('display','block').append(img); 
        $('.show img').prop('index',now_index);
        var imgW_H = getImgW_H($('.img').eq(now_index));
        getScreenW_H();    
        if(imgW_H>screenW_H){
            $('.show img').css({'width':'100%','height':'auto'});  
        }else{
            $('.show img').css({'height':'100%','width':'auto'});   
        }
    }
    
}

var getImgW_H = function(ele){
	var imgSrc = ele.attr("src");
	return getImageWidth(imgSrc,function(w,h){
		return w/h;
	});
}

var getImageWidth = function (url,callback){
	var img = new Image();
	img.src = url;
	if(img.complete){// 如果图片被缓存，则直接返回缓存数据
	    return callback(img.width, img.height);
	}else{// 完全加载完毕的事件            
	    img.onload = function(){
		    return callback(img.width, img.height);
	    }
    }	
}

var hide = function(){
    $(this).css('display','none');

}

var go_left = function(){
    var index = $(this).find('img').prop('index');console.log( index)
    show('left',index);
}

var go_right = function(){
    var index = $(this).find('img').prop('index');console.log( index)
    show('right',index);
}
init();