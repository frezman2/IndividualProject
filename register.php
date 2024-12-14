<?php
// Подключение к базе данных SQLite
$db = new PDO('sqlite:database.db');

// Создание таблицы, если она не существует
$db->exec("CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL
)");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $login = $_POST['username'];
    $pass = $_POST['password'];

    // Хеширование пароля перед сохранением в базу данных
    $hashed_pass = password_hash($pass, PASSWORD_DEFAULT);

    $stmt = $db->prepare("INSERT INTO users (username, password) VALUES (:username, :password)");
    $stmt->bindParam(':username', $login);
    $stmt->bindParam(':password', $hashed_pass);

    if ($stmt->execute()) {
        echo "Registration successful!";
    } else {
        echo "Error: " . $stmt->errorInfo()[2];
    }
}
?>
