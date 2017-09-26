function stopDefault(){
	if(e||e.preventDefault){
		e.preventDefault;
	}else{
		window.event.returnValue=false;
	}
	return false;
}
// 在jQuery中return false;就可以去掉默认事件