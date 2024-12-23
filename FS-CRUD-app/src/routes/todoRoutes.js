import express from "express"
import prisma from "../prismaClient.js"


const router = express.Router()

router.get("/", async (req, res) => {
    // const getTodos = db.prepare(`SELECT * FROM todos WHERE user_id = ?`)
    // const todos = getTodos.all(req.userId)

    const todos = await prisma.todos.findMany({
        where: {
            userId: req.userId
        }
    })
    res.json(todos)
})

// for adding the todos 
router.post('/', async (req, res) => {
    const { task } = req.body
    if (!task) {
        return res.status(400).json({ error: "Task is required" });
    }

    // const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?, ?)`)
    // const result = insertTodo.run(req.userId, task)

    const todos = await prisma.todos.create({
        data: {
            task,
            userId: req.userId
        }
    })

    res.json(todos)

})


// for updating the todos 
router.put('/:id', async (req, res) => {
    const { completed } = req.body
    const { id } = req.params

    // const upadateTodo = db.prepare(`UPDATE todos SET completed = ? WHERE id = ?`)

    // upadateTodo.run(completed, id)

    const upadateTodo = await prisma.todos.update({
        where: {
            id: parseInt(id),
            userId: req.userId
        },
        data: {
            completed: !!completed
        }
    })

    res.json(upadateTodo)

})


// for deleting the todos
router.delete('/:id', async (req, res) => {
    const { id } = req.params

    // const deleteTodo = db.prepare(`DELETE FROM todos WHERE id = ? AND user_id = ?`)

    // deleteTodo.run(id, req.userId)

    await prisma.todos.delete({
        where: {
            id: parseInt(id),
            userId: req.userId

        }
    })

    res.json({ message: "Todo Deleted!" })
})


export default router