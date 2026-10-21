


const pool = require("../db");
const { validateId ,validateApplication} = require("../utils/validation");

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
        next(error);
     }  
}


const createApplications =  async (req, res,next) => {
    try{
    
  const newApplication = {
        company: req.body.company,
        jobPostingUrl: req.body.jobPostingUrl,
        role: req.body.role,
        dateApplied: req.body.dateApplied,
        status: req.body.status,
        notes: req.body.notes,
    };

 const validationError = validateApplication(newApplication);
    if(validationError) {
        return res.status(400).json({ error: validationError });
    }

   const result =  await pool.query(
    'INSERT INTO applications(company, job_posting_url, role, date_applied, status, notes) VALUES($1, $2, $3, $4, $5, $6) RETURNING id, company, job_posting_url AS "jobPostingUrl", role, date_applied AS "dateApplied", status, notes, created_at AS "createdAt"',
    [
        newApplication.company, 
        newApplication.jobPostingUrl,
         newApplication.role,
          newApplication.dateApplied, 
        newApplication.status,
        newApplication.notes,
]
     

   )
    res.status(201).json(result.rows[0]);

    }catch(error){
        next(error);
    }
   
}

const updateApplication =  async (req, res,next) => {
    const {id} = req.params;
    const idError = validateId(id);
     if(idError === null) {
        return res.status(400).json({ error:"Invalid application ID" });
     }

    const {company, jobPostingUrl, role, dateApplied, status, notes} = req.body;
    const updateApplications = {company, jobPostingUrl, role, dateApplied, status, notes}
   
       const validateError = validateApplication(updateApplications)
         if(validateError) {
            return res.status(400).json({ error: validateError });
         }  
    try{
        const result = await pool.query('UPDATE applications SET company=$1, job_posting_url=$2, role=$3, date_applied=$4, status=$5, notes=$6 WHERE id=$7 RETURNING id, company, job_posting_url AS "jobPostingUrl", role, date_applied AS "dateApplied", status, notes, created_at AS "createdAt"',
            [company, jobPostingUrl, role, dateApplied, status, notes, id]
        )
        if(result.rows.length === 0) {
            return res.status(404).json({ error: 'Application not found' });
        }
        res.status(200).json(result.rows[0]);

    }catch(error){
     next(error);
    }
}

const deleteApplication = async (req, res,next) => {
    const {id} = req.params; 
     const idError = validateId(id);
     if(idError === null) {
        return res.status(400).json({ error:"Invalid application ID" });
     }

    try {
         const result = await pool.query('DELETE FROM applications WHERE id=$1 RETURNING id ,company, job_posting_url AS "jobPostingUrl", role, date_applied as "dateApplied", status, notes,created_at as "createdAt"', [id])
 
  if(result.rows.length === 0) {
        return res.status(404).json({ error: 'Application not found' });
    }
    res.status(200).json({ message: 'Application deleted successfully', application: result.rows[0] });

        
    } catch (error) {
        next(error);
    }
    
 
};

module.exports = {getApplications, getApplicationById, createApplications, updateApplication, deleteApplication}