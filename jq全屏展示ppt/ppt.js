var ppt = {
    $btn_index:$('.btn-index'),
    $ppt:$('.wrapper .ppt'),
    $btn_leftRight:$('.btn-leftRight'),
    len:$('.wrapper .ppt').length,
    lastIndex:undefined,
    timer:undefined,
    nowIndex:0,
    flag:true,
    init:function(){
        if(this.len>1){
            var str = '';
            for(var i =0;i<this.len;i++){
                if(i==0){
                    str +='<li class=active></li>';
                }else{
                    str +='<li></li>';
                }                
            }
            str = '<ul>' + str + '</ul>';
            this.$btn_index.append(str);
            var _str = '<div class="btn-left">\
                            <img src="./img/left-btn.png" alt="">\
                        </div>\
                        <div class="btn-right">\
                            <img src="./img/right-btn.png" alt="">\
                        </div>';
            this.$btn_leftRight.append(_str);
        } 
        _this=this;
        this.timer = setTimeout(this.time,3000,_this);
        $('.btn-index li').add($('.btn-left')).add($('.btn-right')).on('click','',_this,this.click);   
    },
    click:function(){
        if(_this.flag){
            _this.flag=false;
            clearTimeout(_this.timer);
            _this.timer=undefined;
            self = this;
            _this.changePPT(_this,self);
            _this.timer = setTimeout(_this.time,3000,_this);
        }        
    },
    changePPT:function(_this,self){
        this.lastIndex = this.nowIndex;
        if(self.className=='btn-left'){
            this.nowIndex = this.nowIndex==0? this.len-1 : this.nowIndex-1;            
        }else if(self.className=='btn-right'){
            this.nowIndex = this.nowIndex==this.len-1? 0 : this.nowIndex+1;    
        }else{
            this.nowIndex = $(this).index();
        }
        if(this.lastIndex!=this.nowIndex){
            this.$ppt.eq(this.lastIndex).find('p').animate({fontSize:'16px'});
            this.$ppt.eq(this.lastIndex).find('img').animate({width:'0%'});
            this.$ppt.eq(this.lastIndex).fadeOut(300,function(){ });
            this.$ppt.eq(this.nowIndex).delay(300).fadeIn(300,function(){ 
                $(this).find('img').animate({width:'40%'});  
                $(this).find('p').animate({fontSize:'20px'});                             
                _this.flag=true;
            });             
            $('li').eq(this.lastIndex).removeClass('active');
            $('li').eq(this.nowIndex).addClass('active');
        }else{ 
            this.flag=true;
        }
    },
    time:function(){  
        window.clearTimeout(_this.timer);
        _this.timer=undefined;      
        var i={
            className:'btn-right',
        }
        _this.changePPT(_this,i);
        _this.timer = setTimeout(_this.time,3000,_this);console.log(_this.timer)
    }
}
ppt.init();