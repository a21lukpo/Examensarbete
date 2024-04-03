const app = require("express")();
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: ''
});

connection.connect((err) => {
    if(err) throw err;
    console.log("Connected");
})



app.get("/", (req, res) => res.send ("Hello world!"));

app.listen(8080, () => console.log("Listening on port 8080"));