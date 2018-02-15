
var oSpan = Array.prototype.slice.call(document.getElementsByTagName('span'));
var oInput = document.getElementsByTagName('input')[0];

//遍历显示
function showArr(arr){
    var str = '';
    var oUl = document.getElementsByTagName('ul')[0];
    arr.forEach(function(ele,index){
        str += '<li><img src="./img/'+ ele.src +'.png" alt=""><p>'+ ele.name +'</p><p class="enter">'+ ele.data +'</p></li>';
    })
    oUl.innerHTML = str;
}

//点击事件
oSpan.forEach(function(ele,index){
    ele.addEventListener("mouseenter",  function(e){
        document.getElementsByClassName('start')[0].className = '';
        e.target.className='start';
        e.target.addEventListener("mousedown",  function(e){
            store.dispatch({type:'sex',value:this.getAttribute('sex')});         
        });
    }); 
})

//读取输入框
oInput.oninput = function(){
    store.dispatch({type:'name',value:this.value});   
}

var store = creatStore({name:'',sex:'all'});
store.subscribe(function(){
    showArr(comFilter());
});
