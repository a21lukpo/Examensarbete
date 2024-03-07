<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <p>hello</p>



    <?php
    $servername = "name";
    $username = "username";
    $password = "password";


    try{
        $connection = new PDO("mysql:host=$servername;dbname=name", $username, $password);

        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        echo "Connection was successful";
    } catch(PDOException $e){
        echo "Connection failed: " . $e->getMessage();
    }

    $query=$connection->prepare("SELECT * FROM product");
    $query->execute();

    $result = $query -> fetch();

    print_r($result);

    ?>

</body>
</html>