<?php

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->Charset = 'utf-8';

$name = $_POST['firstname_name-input'];
$birthday = $_POST['data_name-input'];
$numberMAX =$_POST['maxnumber_name-input'];

$mail->isSMTP();
$mail->Host = 'sptm.mail.ru';
$mail->SMPTAuth = true;
$mail->Username = 'happy_letter_from_alison';
$mail->Password = '5%fjty@$445508irbfg';
$mail->SMPTSecure = 'ssl';
$mail->Port = 456;

$mail->setFrom('happy_letter_from_alison@mail.ru');
$mail->addAdress('happy_letter_from_alison@mail.ru');

$mail->isHTML(true);

$mail->Subject = 'ЗАЯВКА С ТЕСТОВОГО САЙТА'
$mail->Body = '' .$name . 'оставил заявку и его др ' .$birthday;
$mail->AltBody = '';

if(!$mail->send()) {
    echo 'Error';
} else {
    header('location: thank-you.html');
}
?>