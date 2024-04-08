const express = require('express');
const app = express();
const port = 8080;
const mysql = require('mysql');

app.use(express.urlencoded({ extended: true}));

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

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/search', (req, res) =>{
    const searchTerm = req.body.searchbar;

    const query = `SELECT * FROM products WHERE name LIKE ? OR description LIKE ?`

    connection.query(query, [`%${searchTerm}%`, `%${searchTerm}%`], (error, results, fields) => {
        if (error){
            console.error('Error: ', error);
            res.status(500).send('Error Searching');
            return;
        }
        
        let html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Sökbar!!</title><link rel="stylesheet" href="stylesheet.css"></head><body>';
        html += '<header>';
        html += '<form action="/search" method="POST">';
        html += '<input type="text" name="searchbar" id="searchbar" value="' + searchTerm + '">';
        html += '<button type="submit">SÖk!</button>';
        html += '</form>';
        html += '</header>';
        
        results.forEach(product => {
            html += `<div id='product'>`;
                html += `<p id='productName'>${product.name}</p>`;
                html += `<p id='productPrice'>${product.price} EUR</p>`;
                html += `<p id='productDescription'>${product.description}</p>`;
            html += `</div>`;
        });
        html += '</body></html>';

        res.send(html);
    
    });
});

app.listen(port, () => {
    console.log('Listening on port 8080');
});