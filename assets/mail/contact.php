<?php
// Verifica que la petición sea POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("HTTP/1.1 405 Method Not Allowed");
    exit("405 Method Not Allowed");
}

// Recibir y limpiar los datos del formulario
$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$subject = trim($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');

// Validaciones básicas
if ($name === '' || $email === '' || $subject === '' || $message === '') {
    exit("<div id='response-message' class='alert alert-error'>❌ Por favor completa todos los campos.</div>");
}

// Destinatario
$destinatario = "mampelmartina@hotmail.com";

// Asunto del correo
$e_subject = "Nuevo Contacto - $subject";

// Cuerpo del correo
$e_body  = "Has recibido un nuevo mensaje desde tu sitio web.\n\n";
$e_body .= "Nombre: $name\n";
$e_body .= "Email: $email\n";
$e_body .= "Asunto: $subject\n";
$e_body .= "Mensaje:\n$message\n";
$e_body .= "------------------------\n";

// Cabeceras
$headers = "From: no-reply@tudominio.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";
$headers .= "Content-Transfer-Encoding: quoted-printable\r\n";

// Enviar el correo y devolver respuesta
if (mail($destinatario, $e_subject, $e_body, $headers)) {
    exit("<div id='response-message' class='alert alert-success'>✅ Correo enviado correctamente. ¡Gracias por contactarnos!</div>");
} else {
    exit("<div id='response-message' class='alert alert-error'>❌ Error al enviar el correo. Por favor, intenta nuevamente.</div>");
}
?>
