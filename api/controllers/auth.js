import {db} from "../db.js"
import bcrypt from "bcryptjs"
// import jwt from "jsonwebtoken"


// db.connect((err) => {
//     if (err) return console.error(err.message);
  
//     console.log('Connected to the MySQL server.');
//   });
export const register= (req,res) => {

    // check existing user
    // console.log(req);
    const q = "SELECT * FROM users WHERE email = ? OR username = ?"

    db.query(q,[req.body.email,req.body.username], (err,data)=>{
        if(err) return res.json(err)
        if(data.length) return res.status(409).json("User already exists!");

        // HASH the passwords using bcrypt
        // var bcrypt = require('bcryptjs');
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);


        const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)"
        const values = [
            req.body.username,
            req.body.email,
            hash,
        ]

        db.query(q,[values],(err,data)=>{
            if(err) return res.json(err)
            return res.status(200).json("User has been created.")
        })

    })
    
    // res.json("from controller")


};
export const login =(req,res) => {
    // check user exists or not

    // const q = "SELECT * FROM users WHERE username = ?"

    // db.query(q,[req.body.username],(err,data)=>{
    //     if(err) return res.json(err);
    //     if(data.length === 0) return res.status(404).json("User not found!");

    //     // check password
    //     const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password); // data[0] gives user
    //     if(!isPasswordCorrect) return res.status(400).json("wrong username or password")

        // jwt to avoid password storage in local storage
        // const token = jwt.sign({id:data[0].id},"jwtkey")
        // this token carries id with it to check if the one logged in same as the one writing the post
        // therfore allowing him to make changes else not

        // store this token as cookie
        // res.cookie("access_token",token,{
        //     httpOn
        // })

    // })



}
export const logout =(req,res) => {
    
}