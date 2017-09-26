window.onload=function(){
    // 拿取元素
    var reg=document.getElementById('reg');
    var log=document.getElementById('log');//alert(log);
    var hide=document.getElementById('hide');
    var register=document.getElementById('register');
    var login=document.getElementById('login');
    var rbtn=document.getElementById('rbtn');
    var lbtn=document.getElementById('lbtn');
    var yesBtn=document.getElementById('yesBtn');
    var noBtn=document.getElementById('noBtn');
    var rUser=document.getElementById('rUser');
    var rPassword=document.getElementById('rPassword');
    var lUser=document.getElementById('lUser');
    var lPassword=document.getElementById('lPassword');
    var tip=document.getElementById('tip');
    var comfirm=document.getElementById('comfirm');
    var showname=document.getElementById('showname');
    var headImg=document.getElementById('headImg');
    var mask1=document.getElementById('mask1');
    var mask2=document.getElementById('mask2');
    var play1=document.getElementById('play1');
    var play2=document.getElementById('play2');
    var wrong1=document.getElementById('wrong');
    var rClose=document.getElementById('rClose');
    var lClose=document.getElementById('lClose');
    //点击登入选项出现登入界面
    log.onclick=function () {
        hide.style.display='block';
        login.style.display='block';
    }
    lClose.onclick=function(){
        hide.style.display='none';
        login.style.display='none';
        login.style.display='none'
    }
    // 注册成功时的tip信息模块
     tip.style.display='none';
   // 点击注选项进入注册界面，遮罩层显示,然后完成相关操作
    reg.onclick=function () {
        hide.style.display='block';
        register.style.display='block';
    }
     rClose.onclick=function(){
        hide.style.display='none';
        login.style.display='none';
        register.style.display='none'
    }
    // 点解注册就把注册信息提交给后台，让后台把信息写入XML
    rbtn.onclick=function(){
        // 创建请求对象
        var xhr = null;
        try {
            xhr = new XMLHttpRequest();
        } catch (e) {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }
        xhr.open('post','php/index.php',true);
        //post方式，数据放在send()里面作为参数传
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');//申明发送的数据类型
        //post没有缓存问题
        //无需编码
        if(rPassword.value==comfirm.value){
            xhr.send('name='+rUser.value+''+'&password='+rPassword.value+'');
        }else{
            alert("密码前后不一致");
        }
        
       
        xhr.onreadystatechange = function() {
            if ( xhr.readyState == 4 && xhr.status == 200) {
              // 注册完后的选择  
              tip.style.display='block'; 
              Deal();
            }else{}
            
        } 
        // 注册完后的选择封装为函数函数
        function Deal(){
            yesBtn.onclick=()=>{
                register.style.display='none'; 
                login.style.display='block';
            };
            noBtn.onclick=()=>{
                 register.style.display='none';;
                 hide.style.display='none';
            };
           
        }            
    };   
    

    lbtn.onclick=function(){
        function loadXMLDoc(xmlFileUrl){
            var xmlDoc;
            try{
                //Internet Explorer 可以使用其原生方法加载 XML
                xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
            }catch(e){
                try{
                    //使用 XMLHttpRequest 替代,适用于大部分浏览器
                    var xmlHttp=new XMLHttpRequest() ;
                    xmlHttp.open("post",xmlFileUrl,false) ;//必须同步
                    xmlHttp.send(null) ;
                    return xmlHttp.responseXML;
                }catch(e){
                    return null;
                }
            }
            xmlDoc.async=false;
            xmlDoc.load(xmlFileUrl);
            return xmlDoc;
        }
        // 加载XML 
        var xml=loadXMLDoc("xml/index.xml"); 
        // 获得id=lUser.value的user节点
        var node=xml.getElementById(''+lUser.value+'');
        var nameV=node.getElementsByTagName('name')[0].childNodes[0].nodeValue;
        var passwordV=node.getElementsByTagName('password')[0].childNodes[0].nodeValue;
        // 表单用户名字为XML中用户节点id号,现在要拿到XML值并且进行验证，验证成功，然后进行一些操作
        // 用jQuery 拿到值更简便
       if(nameV==lUser.value){
            if(passwordV==lPassword.value){
                // 1.显示头像，账户信息,并且把登入注册选项消失呈现退出按钮
                headImg.style.display='block';
                showname.innerText=nameV;
                reg.style.display="none";
                log.style.display="none";
                unlogin.style.display='block';
                // 2.自己和遮罩消失(遮罩有两个，表单下面遮罩以及游戏入口遮罩)
                hide.style.display='none';
                login.style.display='none';
                mask1.style.display='none';
                mask2.style.display='none';
                //退出账户功能
                unlogin.onclick=function(){
                    headImg.style.display='none'; 
                    showname.innerText=''; 
                    reg.style.display="block";
                    log.style.display="block";
                    this.style.display='none';
                    mask1.style.display='none';
                    mask2.style.display='none';                    
                }   
            }else{
                    wrong1.innerText='密码或账号错误';
            }
       }else{
         alert('没有该账户，请先注册后再登入!!!');
       }
        
    }
    // 跳转页面并且传输并且把要传的数据放在链接里面
    function JumpToAndSendData(url,str){
        location.href=url+"?"+"yourname="+encodeURI(str);
    }    
    function enter(obj){
        obj.onclick=function(){
            if(obj.previousElementSibling.style.display=='none'){
                if(obj==play1){
                    JumpToAndSendData('snake-select.html',showname.innerText);
                }else{
                   location.href='JumpBird.html';
                }
                
            }else{
                alert('如果没有注册请先注册，注册了的请先登入');
            }
        }
    }
    enter(play1);
    enter(play2);
    //任何输入框必须不为空，minlength ==6&&maxlength==30
     var reg1=/^[A-Z]+\w{4,29}$/;
     var reg2=/^\w{6,30}$/;
    function wrongTip(obj,reg){
        //  触发提示错误
        obj.onblur=function(){
            // 没有匹配到就有错误提示
            if(reg.test(obj.value)){
               obj.style.fontSize='8px';
               obj.style.color='rgba(0,0,0,1)';  
            }else{
                obj.value='内容有误';
                obj.style.fontSize='8px';
                obj.style.color='rgba(255,0,0,.5)';
            }
        }
    }
    wrongTip(rUser,reg1);
    wrongTip(rPassword,reg2);
    wrongTip(lUser,reg1);
    wrongTip(lPassword,reg2);
    
    
}
