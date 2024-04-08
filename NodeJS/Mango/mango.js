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
        
        let html = '<div>';
        results.forEach(product => {
            html += `<div>`;
                html += `<p>${product.name}</p>`;
                html += `<p>${product.description}</p>`;
            html += `</div>`;
        });
        html += '</div>';

        res.send(html);
    
    });
});

app.listen(port, () => {
    console.log('Listening on port 8080');
});