<?php
include 'database.php';

$idUsuario = $request->idUsuario;

// Generar un token único
$token = bin2hex(random_bytes(16)); // Genera un token hexadecimal de 32 caracteres

// Verificar si el usuario existe en la base de datos
$consulta = "SELECT * FROM usuario WHERE username = $idUsuario";
$resultado = mysqli_query($con, $consulta);

if (mysqli_num_rows($resultado) == 1) {
    // El usuario existe, actualizar el token en la base de datos
    $consulta_update = "UPDATE usuario SET token = '$token' WHERE username = $idUsuario";
    if (mysqli_query($con, $consulta_update)) {
        echo json_encode(['success' => true, 'token' => $token]);
    } else {
        echo json_encode(['success' => false, 'error' => mysqli_error($con)]);
    }
} else {
    // El usuario no existe en la base de datos
    echo json_encode(['success' => false, 'error' => 'Usuario no encontrado']);
}

$con->close();
?>
