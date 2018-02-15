//通过name筛选
function filterName(arr,name){   
    if(name === ''){
        return arr;           
    }else{ 
    return arr.filter(function(ele,index){
            var reg = new RegExp(name + '+' ,'g');             
            if(reg.test(ele['name'])){
                return true;
            }
        })
    }   
}