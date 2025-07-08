import http from 'node:http'
import { getAllTasks, addTask } from './utils/fileManager.js'
import { JSONResponse } from './utils/JSONResponse.js'

const PORT = 4000

const server = http.createServer(async (req, res) => {

    const { tasks } = await getAllTasks()

    const urlObj = new URL(req.url, `http://${req.headers.host}`)

    // ------------------------
    // |    Gets All Tasks    |
    // ------------------------
    // JSONReponse is a simple utility function that takes the res, a status code, and the data to return applying all neccissary headers and CORS policies
    if (urlObj.pathname === '/api' && req.method === 'GET') {
        
        JSONResponse(res, 200, tasks)

    }

    // ------------------------
    // |    Adds New Task     |
    // ------------------------
    if (urlObj.pathname === '/api' && req.method === 'POST') {
        
        let body = ''

        req.on('data', (chunk) => {
            body += chunk
        })

        req.on('end', async () => {
            try {

                const resData = JSON.parse(body)
                if (!resData.name || typeof resData.name !== 'string') {
                    return JSONResponse(res, 400, { error: 'Task must have a name' })
                }

                const newTask = {
                    id: Date.now(),
                    name: resData.name,
                    complete: false,
                    createAt: new Date().toISOString()
                }

                await addTask(newTask)

                return JSONResponse(res, 201, newTask)
                
            } catch (err) {
                return JSONResponse(res, 400, { error: 'Invalid JSON format' })
            }
        })

    }
})

server.listen(PORT, () => console.log(`Server is running on: http://localhost:${PORT}`))