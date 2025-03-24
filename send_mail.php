<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $service = $_POST['service'];
    $message = $_POST['message'];

    $to = "shitanshu@addinfi.online";  // Replace with your email
    $subject = "New Contact Form Submission";
    $headers = "From: " . $email . "\r\n";

    $body = "Name: $name\nEmail: $email\nService: $service\nMessage: $message";

    mail($to, $subject, $body, $headers);
    echo "Message Sent!";
}
?>
