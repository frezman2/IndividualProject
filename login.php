<?php
// Подключение к базе данных SQLite
$db = new PDO('sqlite:database.db');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $login = $_POST['username'];
    $pass = $_POST['password'];

    // Подготовка запроса для получения пользователя по логину
    $stmt = $db->prepare("SELECT * FROM users WHERE username = :username");
    $stmt->bindParam(':username', $login);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($pass, $user['password'])) {
        echo "Login successful!";
        // Здесь можно добавить код для создания сессии или куки
    } else {
        echo "Invalid username or password.";
    }
}
?>
