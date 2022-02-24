const express = require("express")
const router = express.Router()


router.all("/test_data", (req, res) => {
    console.log("cookies", req.cookies)
    if (!!req.cookies) {
        res.cookie("name", "guru", { expires: new Date(new Date().getTime() +(2*60*60*1000)), httpOnly: true, sameSite: "Strict" });
    }


    res.json([
        {
            name: "guru",
            resident: "shimoga"
        },
        {
            name: "manju",
            resident: "hassan"
        },
    ])
})

module.exports = router
