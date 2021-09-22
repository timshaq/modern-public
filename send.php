<?
// $_POST = json_decode(file_get_contents("php://input"), true);


$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=utf-8\r\n";
$headers .= "From: modern-test@timshaq.ru\r\n";

$to       = "resume@ooo-modern.ru, timur53shakirov@yandex.ru";

$subject  = "Questions from DreamCreditMaker: " . $_POST["subject"];
$email    = $_POST["email"];
$name     = $_POST["name"];
$tel      = $_POST["tel"];
$question = $_POST["question"];

$arr = array(
	"<b>Тема письма:</b> " => $subject,
	"Тело письма:"         => '',
	"Email: "              => $email,
	"Name: "               => $name,
	"Question: "           => $question,
	"Phone Number: "       => $tel,
);

$msg = '';

foreach ($arr as $key => $value) {
	$value = htmlspecialchars($value);
	$value = urldecode($value);
	$value = trim($value);

	$msg .= "<b>$key</b> $value <br>";
}

$mailSend = mail($to, $subject, $msg, $headers);

if($mailSend) {
	http_response_code(200);
} else {
	http_response_code(400);
}

?>

