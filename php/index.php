<?php
header('content-type:text/html;charset="utf-8"');
$name = $_POST['name'];
$password = $_POST['password'];
if (file_exists('../xml/index.xml')){
	$dom = new DOMDocument();
	$dom->formatOutput=true;//缩进格式输出
	if($dom->load('../xml/index.xml')){
		$person=$dom->getElementsByTagName('person');
		$person=$person->item(0);
		$user=$dom->createElement('user');
		$user->setAttribute('id',$name);
		$person->appendChild($user);
		$name1=$dom->createElement('name');
		$password1=$dom->createElement('password');
		$hs=$dom->createElement('hs');//可以加在这里因为一个用户名只能注册一次
		$user->appendChild($name1);
		$user->appendChild($password1);
		$user->appendChild($hs);
		$name1->appendChild($dom->createTextNode($name));
		$password1->appendChild($dom->createTextNode($password));
		$hs->appendChild($dom->createTextNode('0'));//默认给个0
	}
	
	$dom->save('../xml/index.xml');//保存文件并且
}else{
	$xmlTag = array('name','password');
	$dom = new SimpleXMLElement('<?xml version="1.0" encoding="UTF-8"?><person/>');
	$data= array($name,$password);
	$user = $dom->addChild('user');
	for ($i=0; $i <2 ; $i++) { 
		$user->addChild($xmlTag[$i],$data[$i]);
	}	
	 $dom->asXml('../xml/index.xml');	
}
exit;
?>
