<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <?php include 'includes/header.php'; ?>
    <main>
        <h1>Contact</h1>
        <form>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name"><br><br>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email"><br><br>
            <label for="message">Message:</label><br>
            <textarea id="message" name="message"></textarea><br><br>
            <input type="submit" value="Send">
        </form>
    </main>
    <?php include 'includes/footer.php'; ?>
</body>
</html>
