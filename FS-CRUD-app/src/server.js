import express from "express"
import path, { dirname } from "path"
import { fileURLToPath } from "url"
import authRoutes from "./routes/authRoutes.js"
import todoRoutes from "./routes/todoRoutes.js"
import authMiddleware from "./middleware/auth.js"


const app = express()

const PORT = process.env.PORT || 5003

const __filename = fileURLToPath(import.meta.url)

const __dirname = dirname(__filename)

app.use(express.json())

// best to define static middleware after the routes 
// if we have a static file middleware in code then express directly takes the file from here bypassing the "/" request by the browser
app.use(express.static(path.join(__dirname, "../public")))

app.get("/", (req, res) => {
    console.log("kaizo")
    res.sendFile(__dirname, "..", "public", "index.html")
})


app.use("/auth", authRoutes)
app.use("/todos", authMiddleware, todoRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port no. ${PORT}`)
})