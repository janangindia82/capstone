import express from "express";
import mysql from "mysql2";
//var express = require('express')
//var bodyParser=require('body-parser')
//var app=express()
const app = express();
//app.use(bodyParser());

//var mysql2 = require('mysql2')

//var con=mysql.createConnection({host:'localhost',port:3306,
//user:'root',password:'Namashiva@82',database:'demo'})

const con = mysql.createConnection({
    host: process.env.DB_HOST || 'mysql', // Default to 'mysql' if DB_HOST is not set
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'demo',
    port: 3306, // Optional if MySQL is already on port 3306
  });

app.get("/",function(request,response){
    var mydate=new Date();
    con.connect(function(err){
        if (err) throw err
        console.log("data base connected ...")
        
    
        const sql="select * from employee"
        con.query(sql,function(err,result){
            if (err) throw err
            response.send(result)
        })
    
    con.end()    
    })
    
});
app.get("/hello",function(request,response){
    var mydate=new Date();
    response.send("hello world...."+mydate.toDateString())
});

app.post("/hi",function(request,response){
    var data=request.body;
    response.send(data)
})

app.put("/update",function(request,response){
  
    response.send("hello world...using PUT")
})

app.delete("/remove",function(request,response){
  
    response.send("hello world...using DELETE")
})

app.listen(8787);
