<?php
include 'database.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$username = $request->username;

echo "Valor de idUsuario: ";
var_dump($username);
echo "<br>";

// Generar un token único
$token = bin2hex(random_bytes(16)); // Genera un token hexadecimal de 32 caracteres

// Verificar si el usuario existe en la base de datos
$consulta = "SELECT * FROM usuarios WHERE username = $username";

$resultado = mysqli_query($con, $consulta);
echo "Valor de la consulta";
var_dump($resultado);
echo "<br>";
if (mysqli_num_rows($resultado) == 1) {
  // El usuario existe, actualizar el token en la base de datos
  $consulta_update = "UPDATE usuarios SET token = '$token' WHERE username = $username";
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
