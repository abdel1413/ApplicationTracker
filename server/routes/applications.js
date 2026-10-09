const express = require('express')
const pool = require("../db")
const {validateApplication, validateId} = require("../utils/validation")
const { getApplications, getApplicationById } = require('../controllers/applicationController')
const router = express.Router()




router.get("/", getApplications);


//edit app first get the specific application
router.get("/:id",getApplicationById
)

router.post("/",  async (req, res,next) => {
    try{
        // 1. Get data from req.body
  const newApplication = {
        // id: req.body.id,
        company: req.body.company,
        jobPostingUrl: req.body.jobPostingUrl,
        role: req.body.role,
        dateApplied: req.body.dateApplied,
        status: req.body.status,
        notes: req.body.notes,
        // createdAt: req.body.createdAt
    };

 const validationError = validateApplication(newApplication);
    if(validationError) {
        return res.status(400).json({ error: validationError });
    }

 // 2. INSERT into PostgreSQL
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
     // 3. Send successful response

    // applications.push(newApplication);
    // res.status(201).json(newApplication);
    res.status(201).json(result.rows[0]);

    }catch(error){
        // console.log(error)
        // res.status(500).json({ error: 'Failed to create application' })
        next(error);
    }

  


   
});

//2nd route - update application
router.put("/:id", async (req, res,next) => {
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
     // console.log(error)
    //  res.status(500).json({ error: 'Failed to update application' });
     next(error);
    }
})


router.delete("/:id", async (req, res) => {
    const {id} = req.params; 
     const idError = validateId(id);
     if(idError === null) {
        return res.status(400).json({ error:"Invalid application ID" });
     }

    // res.json({message: "delete route reached",
    //     id: id
    // })
    try {
         const result = await pool.query('DELETE FROM applications WHERE id=$1 RETURNING id ,company, job_posting_url AS "jobPostingUrl", role, date_applied as "dateApplied", status, notes,created_at as "createdAt"', [id])
 
  if(result.rows.length === 0) {
        return res.status(404).json({ error: 'Application not found' });
    }
    res.status(200).json({ message: 'Application deleted successfully', application: result.rows[0] });

        
    } catch (error) {
       //console.log(error)
        // res.status(500).json({ error: 'Failed to delete application' });
        next(error);
    }
    
 
});





module.exports = router;