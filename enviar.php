<?php

//Pega os campos digitados pelo usuario
$nomeremetente	= $_POST['nome'];
$motivo			= $_POST['motivo'];
$telefone			= $_POST['telefone'];
$emailcontato = trim($_POST['email']);
$mensagem		= $_POST['mensagem'];

//Email de quem ira receber
$emaildestinatario	= 'taipasempreendimentos@gmail.com';
$emailremetente = 'sac@residencialdonaelvira.com.br';


$horaenviado = date("d/m/y H:i");
if($motivo == 0) {
	$motivo = 'Contato';
}else if($motivo == 1) {
	$motivo = 'Sugestão';
}else if($motivo ==2) {
	$motivo = 'Dúvidas';
}
$mensagemHTML = '<p>Formulario Contato Residencial Dona Elvira<p>
<p>Nome: '.$nomeremetente.'</b>
<p>Email: '.$emailcontato.'</b>
<p>Motivo: '.$motivo.'</b>
<p>Telefone: '.$telefone.'</b>
<p>Mensagem: '.$mensagem.'</b>
<hr>';

// O remetente deve ser um e-mail do seu domínio conforme determina a RFC 822.
// O return-path deve ser ser o mesmo e-mail do remetente.
$headers	= "MIME-Version: 1.1\r\n";
$headers.= "Content-type: text/html; charset=utf-8\r\n";
$headers.= "From: $emailremetente\r\n"; //rementente
$headers.= "Return-Path: $emaildestinatario \r\n";

//echo ''.$mensagemHTML;

$envio	= mail($emaildestinatario, "Formulario Contato Residencial Dona Elvira", $mensagemHTML, $headers);
//print_r($envio);
if($envio) {
	echo 'Email enviado com sucesso!';
}else {
	echo 'Erro ao enviar teu email, tente novamente mais tarde!';
}


?>