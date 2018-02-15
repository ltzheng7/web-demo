function creatStore(intiStore){
    var state = intiStore || {};
    var list = [];
    var getState = function(){
        return state;
    }
    var subscribe = function(func){
        list.push(func);
    }
    var dispatch = function(action){
        state[action.type] = action.value;
        list.forEach(function(ele,index){
            ele();
        })
    }
    return {
        getState:getState,
        subscribe:subscribe,
        dispatch:dispatch
    }
}