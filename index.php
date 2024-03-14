<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="stylesheet.css">
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
            $pdo = new PDO("mysql:host=$servername;dbname=a21lukpo_se_db", $username, $password);

            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            echo "Connection was successful";
        } catch(PDOException $e){
            echo "Connection failed: " . $e->getMessage();
        }

        if(isset($_POST['searchbar']) && !empty(trim($_POST['searchbar']))){

            $keywords = '%'. $_POST['searchbar'] . '%';
           
            $result = "SELECT * FROM products where name like :keywords";
            $stmt = $pdo->prepare($result);
            $stmt->bindParam(':keywords', $keywords);
            $stmt->execute();
    
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                echo "<div>" . $row['name'] . "</div>"; 
                echo "<div>" . $row['price'] . " " . $row['currency'] . "</div>"; 
                echo "<div>" . $row['description'] . "</div>";
               
                $image = $row['images'];
                $image = ltrim($image, "['");
                $shownImage = explode(",", $image);
                echo '<img src="' . $shownImage[0] . '" alt="image">';
                echo "<div>" . $shownImage[0] . "</div>";
                
            }
        }
    ?>

</body>
</html>