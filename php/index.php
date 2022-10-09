<?php

require __DIR__ . '/../vendor/autoload.php';

const MAILER_DSN='smtp://80add756cd0cac:1f2ad22b777d26@smtp.mailtrap.io:2525?encryption=tls&auth_mode=login';

use Symfony\Component\Mime\Email;
use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mailer\Transport;

$transport = Transport::fromDsn(MAILER_DSN);
$mailer = new Mailer($transport);

$from = trim($_POST['fromMail']);
$to = trim($_POST['toMail']);
$text = trim($_POST['message']);
$copy = $_POST['copy']??false;
$image = $_POST['image'];

$image = '<img src="'.$image.'"><br>'.$text;

$errors = [];

if (!$from) {
    $errors[] = 'Le champ "Votre email" est obligatoire';
}
elseif (!filter_var($from, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Format du champ "Votre email" invalide';
}

if(!$to) { 
    $errors[] = 'Le champ "Email du destinataire" est obligatoire';
}
elseif (!filter_var($to, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Format du champ "Email du destinataire" invalide';
}


if ($errors) {
    echo json_encode(['error' => $errors]);
}
else {

    $email = (new Email())
        ->from($from)
        ->to($to)
        ->priority(Email::PRIORITY_HIGHEST)
        ->subject('[e-Card] Vous avez reçu un Dessin !')
        ->text($text)
        ->html($image);

    if ($copy == 'on') {
        $email ->cc($from);
    }

    $mailer->send($email);

    echo json_encode(['message' => 'OK']);
}

