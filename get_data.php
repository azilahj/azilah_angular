<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Credentials: true");


$host = 'localhost';
$username = 'root';
$password = '';
$database = 'angular_app_db';

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
    console.log('Connection failed: ', $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $query = "SELECT * FROM task_master";
    $result = $conn->query($query);

    $data = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode($data);
    } else {
        echo json_encode(['message' => 'No tasks found']);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    $title = $data->title;
    $description = $data->description;
    $dueDate = $data->dueDate;
    $status = $data->status;

    $sql = "INSERT INTO task_master (title, description, dueDate, status) VALUES ('$title', '$description', '$dueDate', '$status')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['message' => 'Task created successfully']);
    } else {
        echo json_encode(['error' => 'Error creating task: ' . $conn->error]);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"));

    $taskId = $data->id;
    $title = $data->title;
    $description = $data->description;
    $dueDate = $data->dueDate;
    $status = $data->status;

    $sql = "UPDATE task_master SET title='$title', description='$description', dueDate='$dueDate', status='$status' WHERE id=$taskId";

    if ($conn->query($sql) === TRUE) {
        http_response_code(204); 
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Error updating task: ' . $conn->error]);
    }
}


if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $taskId = $_GET['id'];

    $sql = "DELETE FROM task_master WHERE id=$taskId";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['message' => 'Task deleted successfully']);
    } else {
        echo json_encode(['error' => 'Error deleting task: ' . $conn->error]);
    }
}


$conn->close();

?>
