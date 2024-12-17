import express from "express"
import db from "../db.js"


const router = express.Router()

router.get("/", (req, res) => {
    const getTodos = db.prepare(`SELECT * FROM todos WHERE user_id = ?`)
    const todos = getTodos.all(req.userId)
    res.json(todos)
})

// for adding the todos 
router.post('/', (req, res) => {

})


// for updating the todos 
router.put('/', (req, res) => {

})


// for deleting the todos
router.delete('/', (req, res) => {

})


export default router