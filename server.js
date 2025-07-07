import http from 'node:http'

const PORT = 4000

const server = http.createServer((req, res) => {
    res.end('Task Tracker')
})

server.listen(PORT, () => console.log(`Server is running on: http://localhost:${PORT}`))