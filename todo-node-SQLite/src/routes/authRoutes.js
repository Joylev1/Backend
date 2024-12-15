import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import db from "../db.js"


const router = express.Router()

router.post("/register", (req, res) => {
    //const body = req.body
    const { username, password } = req.body
    const hashedPass = bcrypt.hashSync(password, 8)
    try {
        const insertNewUser = db.prepare(`INSERT INTO users (username, password)
             VALUES (?, ?)`)
        const result = insertNewUser.run(username, hashedPass)

        // user created now we add a default todo 
        const defaultTodo = "Hey :) add your first Todo!"
        const insertNewTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?, ?)`)
        insertNewTodo.run(result.lastInsertRowid, defaultTodo)  // the result.lastinsertedrowid links the user_id to the result's id

        // now for the token of the new user 
        const token = jwt.sign({ id: result.lastInsertRowid }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ token })
    }
    catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }
})

router.post("/login", (req, res) => {

    const { username, password } = req.body
    try {
        // checking if the user exist in the database or not
        const loginUser = db.prepare(`SELECT * FROM users WHERE username= ?`) // * -> reads the table
        const user = loginUser.get(username)
        if (!user) { res.status(404).send({ message: "user not found" }) }

        // checking if the password is valid or not
        const validPass = bcrypt.compareSync(password, user.password)
        if (!validPass) { res.status(401).send({ message: "Invalid password" }) }
        console.log(user)
        // if everthing goes fine then 
        // token alocation
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "24h" })


    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }

})

export default router