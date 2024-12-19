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
    const { task } = req.body

    if (!task) {
        return res.status(400).json({ error: "Task is required" });
    }
    if (!req.userId) {
        return res.status(401).json({ error: "Unauthorized: User ID is missing" });
    }

    const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?, ?)`)
    const result = insertTodo.run(req.userId, task)

    res.json({ id: result.lastInsertRowid, task, completed: 0 })

})


// for updating the todos 
router.put('/', (req, res) => {

})


// for deleting the todos
router.delete('/', (req, res) => {

})


export default router