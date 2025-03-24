<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'src/Exception.php';
require 'src/PHPMailer.php';
require 'src/SMTP.php';

$mail = new PHPMailer(true);

try {
    $mail->SMTPDebug = 2;
$mail->Debugoutput = 'html';

    $mail->isSMTP();
    $mail->Host       = 'smtp.addinfi.online'; // 🔹 Change if using another email provider
    $mail->SMTPAuth   = true;
    $mail->Username   = 'shitanshu@addinfi.online'; // 🔹 Replace with your email
    $mail->Password   = 'brql nlxj yihx ihpl'; // 🔹 Use the generated App Password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // 🔹 Use `ENCRYPTION_SMTPS` for SSL
    $mail->Port       = 587; // 465 for SSL

    // Email Details
    $mail->setFrom('your-email@gmail.com', 'Your Name');
    $mail->addAddress('shitanshu@addinfi.online'); // 🔹 Replace with the recipient's email
    $mail->Subject = 'New Contact Form Submission';

    // Capture form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $service = $_POST['service'];
    $message = $_POST['message'];

    // Email Body
    $mail->Body = "Name: $name\nEmail: $email\nService: $service\nMessage:\n$message";

    $mail->send();
    echo "Message sent successfully!";
} catch (Exception $e) {
    echo "Message could not be sent. Error: {$mail->ErrorInfo}";
}
?>
