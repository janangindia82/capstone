import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';

const app = express();
app.use(bodyParser.json());

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'mysql',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'demo',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.get("/", function(request, response) {
    const sql = "SELECT * FROM employee";
    pool.query(sql, function(err, result) {
        if (err) throw err;
        response.send(result);
    });
});

app.get("/hello", function(request, response) {
    const mydate = new Date();
    response.send("hello world...." + mydate.toDateString());
});

app.post("/hi", function(request, response) {
    const data = request.body;
    response.send(data);
});

app.put("/update", function(request, response) {
    response.send("hello world...using PUT");
});

app.delete("/remove", function(request, response) {
    response.send("hello world...using DELETE");
});

const port = 8787;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
