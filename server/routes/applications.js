const express = require('express')
const pool = require("../db")
const {validateApplication, validateId} = require("../utils/validation")
const router = express.Router()


router.get("/", async (req, res,next) => {
    try {
        const  result = await pool.query('SELECT id, company, job_posting_url AS "jobPostingUrl", role, date_applied AS "dateApplied", status, notes, created_at AS "createdAt" FROM applications');
        res.status(200).json(result.rows);
        
    } catch (error) {
;
        next(error); // error sent to centralized error handler fnc
    }
});


module.exports = router;