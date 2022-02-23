const express = require("express")
const router = express.Router()


router.all("/test_data", (req, res) => {
    res.json([
        {
            name:"guru",
            resident:"shimoga"
        },
        {
            name:"manju",
            resident:"hassan"
        },
    ])
})

module.exports = router
