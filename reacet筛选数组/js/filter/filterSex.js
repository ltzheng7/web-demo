//通过sex筛选
function filterSex(arr,sex){
    if(sex === 'all'){
        return arr;
    }else {
    return arr.filter(function(ele,index){
            if(ele['sex'] === sex){
               return true;
            }
        })  
    } 
}