const express = require("express")
const cookieParser = require("cookie-parser");
const app = express()

const port =  8000

app.use(function (req, res, next) {
    console.log("global middleware")
    return next()
})
app.use(
    express.json({
        limit: "50mb",
        extended: false,
    })
)

app.use(cookieParser());

app.use("/api/", require("./apis/set1"))

app.get("*", function (req, res) {
    res.status(404).send("<html><body><center><h1>404</h1></center></body></html)")
})

app.listen(port, () => {
    console.log(`App started running at ${port}\ncwd is ${__dirname}`)
    console.log(`running ========>  http://127.0.0.1:${port}`)
})