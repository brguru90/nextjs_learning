const next = require('next')
const express_app = require("../backend/src/server")
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const port = process.env.SERVER_PORT || 8000

console.log("next_server process.env.SERVER_PORT",process.env.SERVER_PORT)

app.prepare()
    .then(() => {
        express_app.get('*', (req, res) => {
            return handle(req, res)
        })
        express_app.listen(port, (err) => {
            if (err) throw err
            console.log(`running ========>  http://127.0.0.1:${port}`)
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })