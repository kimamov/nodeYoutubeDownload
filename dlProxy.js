const {
    pipeline
} = require('stream');
const express = require('express')
const router = express.Router();
const request = require("request");

router.get("", (req, res) => {
    if (req.query.link) {
        request.get(req.query.link).on("error", (e) => {
            return res.status(404).send("server could not get your data")
        }).pipe(res).on("close", () => {
            return res.end("done");
        })

    } else res.status(404).send("please provide a link")
})

module.exports = router;