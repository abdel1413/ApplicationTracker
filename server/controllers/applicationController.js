const pool = require("../db")
const getApplications = async (req,res, next) => {
    try {
        const result = await pool.query('SELECT id, company, job_posting_utl as "jobPostingUrl", role , date_applied as "dateApplied", status, notes, created_at as "createdAt" FROM applications');
        res.status(200).json(result.rows);
    } catch (error) {
        next(error);
    }
}

module.exports = {getApplications}