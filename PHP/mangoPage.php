<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mango PHP</title>
    <link rel="stylesheet" href="../stylesheet.css">
</head>
<body>

    <header>
        <a href="../index.html">
            <button>Start Page</button>
        </a>

        <form action="mangoPage.php" method="POST">
            <input type="search" id="searchbar" name="searchbar">
            <button id="searchButton">knapp</button>
        </form>
    </header>

    <?php
        $servername = "";
        $username = "";
        $password = "";
        
        try{
            $pdo = new PDO("mysql:host=$servername;dbname=a21lukpo_se_db", $username, $password);

            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e){
            echo "Connection failed: " . $e->getMessage();
        }

        if(isset($_POST['searchbar']) && !empty(trim($_POST['searchbar']))){

            $keywords = '%'. $_POST['searchbar'] . '%';
           
            $result = "SELECT * FROM products where name like :keywords OR description like :keywords" ;
            $stmt = $pdo->prepare($result);
            $stmt->bindParam(':keywords', $keywords);
            $stmt->execute();
    
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                echo "<div id='product'>";  
                    echo "<div id='productName'>" . $row['name'] . "</div>";             
                    $image = $row['images'];
                    $image = ltrim($image, "['");
                    $shownImage = explode(",", $image);
                    echo "<img src='" . $shownImage[0] . "' alt='image' id='productImage'>";
                    echo "<div id='productPrice'>" . $row['price'] . " " . $row['currency'] . "</div>"; 
                    echo "<div id='productDescription'>" . $row['description'] . "</div>";
                echo "</div>";
            }
        }
    ?>

    <footer>
        <p>The data that is used is taken from <a href="https://www.kaggle.com/datasets/maparla/mango-products?select=store_mango.csv">Kaggle</a> under license <a href="https://www.mit.edu/~amini/LICENSE.md">MIT</a></p> 
    </footer>

</body>
</html>