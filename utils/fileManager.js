import fs from 'node:fs/promises'

const DB_PATH = new URL('../db.json', import.meta.url).pathname

export const getAllTasks = async () => {
    const db = await fs.readFile(DB_PATH, 'utf-8')

    return JSON.parse(db)
}

export const saveTask = async (db) => {
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2))
    return db
}

export const addTask = async (task) => {
    const db = await getAllTasks()
    db.tasks.push(task)
    await saveTask(db)
    return task
}
