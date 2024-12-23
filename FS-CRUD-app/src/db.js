import { DatabaseSync } from "node:sqlite"
const db = new DatabaseSync(":memory:") // keeps the data in memory of the running server (data is lost if the server is closed/restarted)

db.exec(`
    CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
    )
`)

db.exec(`
    CREATE TABLE todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    task TEXT,
    completed BOOLEAN DEFAULT 0,
    FOREIGN KEY(user_id) REFERENCES users(id)    
    )
`)

export default db;