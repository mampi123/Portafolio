<?php
$to = "mampelmartina@gmail.com"; // Cambia por tu correo
$subject = "Prueba de PHP mail()";
$message = "Hola, esto es una prueba para verificar si mail() funciona.";
$headers = "From: no-reply@tudominio.com";

if (mail($to, $subject, $message, $headers)) {
    echo "✅ Correo enviado correctamente.";
} else {
    echo "❌ Error: No se pudo enviar el correo.";
}
?>