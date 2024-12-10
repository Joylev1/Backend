import express from "express"
import path, { dirname } from "path"
import { fileURLToPath } from "url"

const app = express()

const PORT = process.env.PORT || 3000

const __filename = fileURLToPath(import.meta.url)

const __dirname = dirname(__filename)

app.use(express.static(path.join(__dirname, "../public")))

app.get("/", (req, res) => {
    res.sendFile(__dirname, "..", "public", "index.html")
})

app.listen(PORT, () => {
    console.log(`Server is running on port no. ${PORT}`)
})