//耦合条件
function filterAll(obj,arr){
    return function(){ 
        var lastArr = arr;
        
        for(prop in obj){
            lastArr = obj[prop](lastArr,store.getState()[prop]); 
        } 
        return lastArr; 
    }
}
var comFilter = filterAll({name:filterName,sex:filterSex},dataArr);