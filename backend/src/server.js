const express = require("express")
const cookieParser = require("cookie-parser");
require('dotenv').config({ path: __dirname + "/../../.env" })
const app = express()

app.use("/server_api/",function (req, res, next) {
    console.log("global middleware",req.url)
    return next()
})
app.use(
    express.json({
        limit: "50mb",
        extended: false,
    })
)

app.use(cookieParser());
app.use("/server_api/", require("./apis/set1"))



if (process.env.NEXT_SERVER == undefined || process.env.NEXT_SERVER == "false" || !process.env.NEXT_SERVER) {

    console.log("backend_server process.env.SERVER_PORT", process.env.SERVER_PORT)
    const port = process.env.SERVER_PORT || 8000

    app.get("*", function (req, res) {
        res.status(404).send("<html><body><center><h1>404</h1></center></body></html)")
    })

    app.listen(port, () => {
        console.log(`App started running at ${port}\ncwd is ${__dirname}`)
        console.log(`running backend ========>  http://127.0.0.1:${port}`)
    })

}

module.exports = app



