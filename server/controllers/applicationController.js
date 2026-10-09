const pool = require("../db")
const getApplications = async (req,res, next) => {
    try {
        const result = await pool.query('SELECT id, company, job_posting_url as "jobPostingUrl", role , date_applied as "dateApplied", status, notes, created_at as "createdAt" FROM applications');
        res.status(200).json(result.rows);
    } catch (error) {
        next(error);
    }
}



  const getApplicationById =  async (req, res,next) => {

    const {id} = req.params; 

    const idError = validateId(id);
     if(idError === null) {
        return res.status(400).json({ error:"Invalid application ID" });
     }

    
    
     try {
         const result = await pool.query('SELECT id, company, job_posting_url as "jobPostingUrl", role, date_applied as "dateApplied", notes,status, created_at as "createdAt" FROM applications WHERE id =$1',
         [id]);

    if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Application not found' });
    }
    res.status(200).json(result.rows[0]);

        
     } catch (error) {
        // res.status(500).json({ error: 'Failed to fetch application' });
        next(error);
     }  
}

module.exports = {getApplications, getApplicationById}