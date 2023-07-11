const express = require("express")
const axios = require('axios');
const router = express.Router()
const fs = require('fs');
const { json } = require("express");


fs.writeFileSync('./shared_sample.txt', JSON.stringify({
    _date: new Date()
}));



/** 
 * @swagger 
 * /server_api/test_data: 
 *   get: 
 *     description: Shows dummy data
 *     responses:  
 *       200: 
 *         description: Success  
 *   
 */
router.get("/test_data", (req, res) => {
    // console.log("cookies", req.cookies)
    if (!!req.cookies) {
        res.cookie("name", "guru", { expires: new Date(new Date().getTime() + (2 * 60 * 60 * 1000)), httpOnly: true, sameSite: "Strict" });
    }

    const a_data=JSON.parse(fs.readFileSync('./shared_sample.txt',
            {encoding:'utf8', flag:'r'}))

    res.json([
        {
            name: "guru",
            resident: "shimoga",
            _date:a_data["_date"],
            dt:new Date(),
        },
        {
            name: "manju",
            resident: "hassan",
            _date:a_data["_date"],
            dt:new Date(),
        },
    ])
})



router.all("/updateData", (req, res) => {
    fs.writeFileSync('./shared_sample.txt', JSON.stringify({
        _date: new Date()
    }));

    res.json({
        "status":"success",
        "message":"data updated"
    })
})

module.exports = router
