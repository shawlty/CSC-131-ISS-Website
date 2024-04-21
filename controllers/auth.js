const { request } = require("express");

const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.register = (req,res) =>{
    console.log(req.body);
    // const name = request.body.name;
    // const email = request.body.email;
    // const password = requues.bod.password;
    // const passwordConfirm = requues.bod.passwordConfirm;

    const { name, email, password, passwordConfirm} = req.body;

    db.query('SELECT email FROM users Where email = ?', [email],async(error, results) =>{
        if (error){
            console.log(error);
        }
        if (results.length > 0 ){
            return results.render('register', {
                message: 'That email is already in use'
            })
        } else if(password !== passwordConfirm){
            return res.render ('register', {
                message: 'Passwords do not match'
            });
        }
        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);
        
        res.send("testing")
    });


}