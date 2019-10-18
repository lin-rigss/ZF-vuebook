export let pullRefresh = (ele,cb) =>{
    // 先获取当前元素的offsetTop  如果正在下拉则触发无效。
    let offsetTop = ele.offsetTop;
    // 设置默认距离 0 
    let distance = 0;
    ele.addEventListener('touchstart',(ev)=>{
        let startY = ev.touches[0].pageY;
        // touchmove 手指移动事件 
        let touchmove = function(ev){
            let moveY = ev.touches[0].pageY;
            if(moveY-startY > 0){ // 正在下拉刷新
                if(moveY-startY > 50){
                    distance = 50;
                    return  ele.style.top = offsetTop + 50 + 'px'
                }
                distance = moveY-startY;
                ele.style.top = offsetTop + moveY-startY + 'px'
              
            }else{
                ele.removeEventListener('touchmove',touchmove);
                ele.removeEventListener('touchend',touchend);
            }
        }

        // 手指离开事件
        let touchend = function(){
            let timer = null;
            // 当没有拉取到我们想要刷新的地点时，直接 return 回去，不做任何处理
            if(distance !== 50) return ele.style.top = offsetTop +'px'
            timer = setInterval(()=>{  // 开一个定时器，让其回到顶部
                distance--;
                if(distance<=0){
                   clearInterval(timer);
                   cb()       
                }
                ele.style.top = offsetTop + distance + 'px'
            },6)
            ele.removeEventListener('touchmove',touchmove);
            ele.removeEventListener('touchend',touchend);
        }
           //offsetTop  当前元素距body的上边之间的距离   上偏移 
        if(ele.offsetTop === offsetTop && ele.scrollTop === 0 ) {
            ele.addEventListener('touchmove',touchmove);
            ele.addEventListener('touchend',touchend);
        }else{
            ele.removeEventListener('touchmove',touchmove);
            ele.removeEventListener('touchend',touchend);
        }         
    },false)
}