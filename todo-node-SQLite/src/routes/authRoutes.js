import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import db from "../db.js"
import { describe } from "node:test"


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
    }
    catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }
})

router.post("/login", (req, res) => {

})

export default router