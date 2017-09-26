	var Header=document.querySelector('.Header');

	function $(id){
		return document.getElementById(id);
	}



	getDisplay('btn3','.one');
	getDisplay('btn4','.two');
	function getDisplay(btn,div){
		var div=document.querySelector(div);
		$(btn).onclick=function(){
			div.style.display='block';
			div.style.backgroundColor='rgba(255,255,255,.5)';
			this.style.backgroundColor= '#64DCAA';
			this.style.color= '#fff';

		}
	}

	closePage('close','.one');
	closePage('close1','.two');
	function closePage(id,div){
		var div=document.querySelector(div);
		$(id).onclick=function(){
			div.style.display='none';
		}
	}

	getResult('sp1','sp1r');
	getResult('sp2','sp2r');
	getResult('sp4','sp4r');
	getResult('sp5','sp5r');
	function getResult(id1,id2){
		$(id1).onblur=function(){
			if($(id1).value.length>=6&&$(id1).value.length<=30)
			{
				$(id2).className="right";
				$(id2).innerHTML="输入正确";
			}
			else
			{
				$(id2).className='wrong';
				$(id2).innerHTML="请重新输入";
			}
		}
	}
	$('sp3').onblur=function(){
		var re= /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
		if($('sp3').value==''){
			$('sp3r').className='wrong';
			$('sp3r').innerHTML="请重新输入";
		}
		else if(isNaN($('sp3').value)==false){
			if($('sp3').value.length==11)
			{
				$('sp3r').className="right";
				$('sp3r').innerHTML="输入正确";
			}
			else
			{
				$('sp3r').className='wrong';
				$('sp3r').innerHTML="请输入正确的手机号";
			}
		}
		else{
			if(re.test($('sp3').value))
			{
				$('sp3r').className="right";
				$('sp3r').innerHTML="输入正确";
			}
			else
			{
				$('sp3r').className='wrong';
				$('sp3r').innerHTML="请输入正确的邮箱";
			}

		}
	}
	
	$('sp5').onblur=function(){
		if($('sp4').value==$('sp5').value && $('sp5').value!='')
		{
			$('sp5r').className="right";
			$('sp5r').innerHTML="输入正确";

		}
		else
		{
			$('sp5r').className='wrong';
			$('sp5r').innerHTML="密码不正确";
		}

	}

	setInterval(function(){
		$('div1').style.display='none';
		$('div2').style.display='block';

	},3000);
	setInterval(function(){
		$('div1').style.display='block';
		$('div2').style.display='none';
	
	},6000);