/**
 * Created by Administrator on 2017/8/3.
 */
function getStyle(obj,name){
    if(obj.currentStyle){
        return obj.currentStyle[name];
    }else{
        return getComputedStyle(obj,null)[name];
    }
}
//        var timer=null;
function move(obj,attr,target,fnEnd){
    clearInterval(obj.timer);

    obj.timer=setInterval(function(){
        var cur=0;
        if(attr=="opacity"){
            cur=parseFloat(getStyle(obj,attr)*100);
        }else{
            cur=parseInt(getStyle(obj,attr));
        }

        var speed=(target-cur)/6;
        speed=speed>0?Math.ceil(speed):Math.floor(speed);

        if(cur==target){
            clearInterval(obj.timer);
            if(fnEnd){
                fnEnd();
            }
        }else {
            if (attr == "opacity") {
                obj.style.opacity = (cur + speed) / 100;
                obj.style.filter = 'alpha(opacity:' + (cur+speed) + ')';
            } else {
                obj.style[attr] = cur + speed + "px";
            }

        }
    },60);
}