<?php
header('content-type:text/html;charset="utf-8"');
// error_reporting(0);$xmlDoc->load("note.xml");
$name = $_POST['name'];
$password = $_POST['password'];
echo $name;
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
		$user->appendChild($name1);
		$user->appendChild($password1);
		$name1->appendChild($dom->createTextNode($name));
		$password1->appendChild($dom->createTextNode($password));
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
