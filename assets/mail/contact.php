<?php
// Comprobar que la petición sea POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    // Si no es POST, avisar y salir
    echo "❌ Solo se permite el método POST.";
    exit;
}

// Recibir y limpiar los datos del formulario
$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$subject = trim($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');

// Validaciones básicas
if ($name === '' || $email === '' || $subject === '' || $message === '') {
    exit("❌ Por favor completa todos los campos.");
}

// Destinatario (cambia si corresponde)
$destinatario = "mampelmartina@gmail.com";

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

// Enviar el correo con la función mail (si tu hosting lo soporta)
$mailEnviado = mail($destinatario, $e_subject, $e_body, $headers);

// Verificar resultado y responder
if ($mailEnviado) {
    echo "✅ Tu mensaje se envió correctamente.";
} else {
    echo "❌ Ocurrió un error al enviar tu mensaje.";
}
