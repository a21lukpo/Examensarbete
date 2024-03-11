<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>


    <form action="index.php" method="POST">
        <input type="search" id="searchbar" name="searchbar">
        <button>knapp</button>

    </form>


    <?php
        $servername = "";
        $username = "";
        $password = "";

        try{
            $pdo = new PDO("mysql:host=$servername;dbname=", $username, $password);

            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            echo "Connection was successful";
        } catch(PDOException $e){
            echo "Connection failed: " . $e->getMessage();
        }


        $keywords = isset($_POST['searchbar']) ? '%'. $_POST['searchbar'] . '%' : '';
       
        $result = "SELECT Name FROM product where Name like '$keywords'";
        $stmt = $pdo->query($result);
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                echo "<div id='link' onClick='addText(\"".$row['Name']."\");'>" . $row['Name'] . "</div>";  
            }

    ?>

</body>
</html>