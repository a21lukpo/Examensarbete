const express = require('express');
const app = express();
const port = 8080;
const mysql = require('mysql');

app.use(express.urlencoded({ extended: true}));
app.use(express.static(__dirname));

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
        
        let html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Asos NodeJS</title><link rel="stylesheet" href="stylesheet.css"></head><body>';
        html += '<header>';
        html += '<form action="/search" method="POST">';
        html += '<input type="text" name="searchbar" id="searchbar" value="' + searchTerm + '">';
        html += '<button id="searchButton">SÖk!</button>';
        html += '</form>';
        html += '</header>';
        
        results.forEach(product => {
            html += `<div id='product'>`;
                html += `<div id='productName'>${product.name}</div>`;
                let image = product.images.substring(2, product.images.length - 2);
                let shownImage = image.split(',');
                html += `<div id='productImage'>${shownImage[0]}</div>`;
                html += `<div id='productPrice'>${product.price} EUR</div>`;
                html += `<div id='productDescription'>${product.description}</div>`;
            html += `</div>`;
        });

        html += '<footer>';
        html += ' <p>The data that is used is taken from <a href="https://www.kaggle.com/datasets/trainingdatapro/asos-e-commerce-dataset-30845-products">Kaggle</a> under license <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)</a></p>';
        html += '</footer>';
        html += '</body></html>';

        res.send(html);
    });
});

app.listen(port, () => {
    console.log('Listening on port 8080');
});