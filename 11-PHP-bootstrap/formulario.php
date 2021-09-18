<?php

if ($_POST) {
    $usuario = "";
    $correo = "";
    $mensaje = "";
    if (isset($_POST["usuario"])) {
        $usuario = filter_var(trim($_POST['usuario']), FILTER_SANITIZE_STRING);
    }

    if (isset($_POST["correo"])) {
        $correo = filter_var(trim($_POST['correo']), FILTER_VALIDATE_EMAIL);
    }

    if (isset($_POST["mensaje"])) {
        $mensaje = filter_var(trim($_POST['mensaje']), FILTER_SANITIZE_STRING);
    }

    if (empty($usuario)) {
        echo json_encode(array(
            'error' => true,
            'campo' => 'usuario'
        ));
        return;
    }

    if (empty($correo)) {
        echo json_encode(array(
            'error' => true,
            'campo' => 'correo'
        ));
        return;
    }

    if (empty($mensaje)) {
        echo json_encode(array(
            'error' => true,
            'campo' => 'mensaje'
        ));
        return;
    }

    // Cuerpo del mensaje

    $cuerpo = "Usuario: " . $usuario . "<br/>";
    $cuerpo .= "Email: " . $correo . "<br/>";
    $cuerpo .= "Mensaje : " . $mensaje . "<br/>";


    //Direccion
    $destinatario = "lnnsntg@gmail.com";
    $asunto = "Mensaje desde mi sitio web";
    $headers  = 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n" . 'From: ' . $correo . "\r\n";

    if (mail($destinatario, $asunto, $cuerpo, $headers)) {
        echo json_encode(array(
            'error' => false,
            'campo' => 'success'
        ));
    } else {
        echo json_encode(array(
            'error' => true,
            'campo' => 'mail'
        ));
    }

} else {
    echo json_encode(array(
        'error' => true,
        'campo' => 'post'
    ));
}
