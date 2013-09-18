<?php

//Pega os campos digitados pelo usuario
$nomeremetente	= $_POST['nome'];
$motivo			= $_POST['motivo'];
$telefone			= $_POST['telefone'];
$emailcontato = trim($_POST['email']);
$mensagem		= $_POST['mensagem'];

//Email de quem ira receber
$emaildestinatario	= 'luyzgarcia@gmail.com';
$emailremetente = 'atendimento@proiz.com.br';


$horaenviado = date("d/m/y H:i");

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

echo ''.$mensagemHTML;

//$envio	= mail($emaildestinatario, "Formulario Conte sua historia", $mensagemHTML, $headers);
//print_r($envio);
//if($envio) {
//	echo false;
//}else {
//	echo 'Erro ao enviar teu email';
//}


?>