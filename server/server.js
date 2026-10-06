const express = require('express')
const cors = require('cors')
const pool = require("./db")

const app = express()   
app.use(cors())
app.use(express.json()); //When JSON data arrives in a request, parse it so I can access it through req.body



// const applications = [
//     {
//     "id": 1,
//     "company": "goggle",
//     "role": "Software Engineer",
//     "status": "applied"

//     },{
//         "id": 2,
//         "company": "amazon",
//         "role": "Data Scientist",
//         "status": "interviewing"    
//     }
// ]


//if no company name, do insert to backend
// if(!newApplication.company || !newApplication.company.trim()) {
//     return res.status(400).json({ error: 'Company name is required' });
// }
//  if(!newApplication.role || !newApplication.role.trim()) {
//     return res.status(400).json({ error: 'Role is required' });
// }   

// if(!newApplication.dateApplied || !newApplication.dateApplied.trim()) {
//     return res.status(400).json({ error: 'Date applied is required' });
// }
// //'hello' is a valued str so it passe the above 
// // test though it is not a valued date. 
// // we need to validate the date format
// if(isNaN(Date.parse(newApplication.dateApplied))) {
//     return res.status(400).json({ error: 'Invalid date format' });
// }


// const allowedStatuses =['applied', 'interview', 'offer', 'rejected']
// if(!allowedStatuses.includes(newApplication.status)) {
//     return res.status(400).json({ error: 'Invalid status' });
// }   

const validateApplication = (application) => {
    if(!application.company 
        || typeof application.company !== 'string' 
        || !application.company.trim()) {
        return 'Company name is required' ;
    }
    if(!application.role 
        || typeof application.role !== 'string' 
        || !application.role.trim()) {
        return  'Role is required' ;
    }
    if(!application.dateApplied ||
         typeof application.dateApplied !== 'string' ||
         !application.dateApplied.trim()) {
        return  'Date applied is required' ;
    }
    if(isNaN(Date.parse(application.dateApplied))) {
        return'Invalid date format' ;
    }
    if(!application.status 
        || typeof application.status !== 'string'
        || !application.status.trim()) {
        return 'Status is required' ;
    }

    const allowedStatuses =['applied', 'interview', 'offer', 'rejected']
    if(!allowedStatuses.includes(application.status)) {
        return 'Invalid status' ;
    }
    return null
};

app.get('/', (req, res) => {
    res.send('Job application tracker API is running !');
});



// app.get("/test-db", async (req, res) => {
//     const  result = await pool.query('SELECT * FROM applications');
//     res.json(result.rows);
// })

// app.get("/api/applications", (req, res) => {
//     res.json(applications);
// });

app.get("/api/applications", async (req, res) => {
    try {
        const  result = await pool.query('SELECT id, company, job_posting_url AS "jobPostingUrl", role, date_applied AS "dateApplied", status, notes, created_at AS "createdAt" FROM applications');
        res.status(200).json(result.rows);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch applications' });
    }
});


app.post("/api/applications",  async (req, res) => {
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
        console.log(error)
        res.status(500).json({ error: 'Failed to create application' })
    }

  


   
});


app.delete("/api/applications/:id", async (req, res) => {
    const {id} = req.params; 
    console.log(id)
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
        console.log(error)
        res.status(500).json({ error: 'Failed to delete application' });
    }
    
 
});

//edit app first get the specific application
app.get("/api/applications/:id", async (req, res) => {

    const {id} = req.params; 
     try {
         const result = await pool.query('SELECT id, company, job_posting_url as "jobPostingUrl", role, date_applied as "dateApplied", notes,status, created_at as "createdAt" FROM applications WHERE id =$1',
         [id]);

    if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Application not found' });
    }
    res.status(200).json(result.rows[0]);

        
     } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to fetch application' });
     }  
})

//2nd route - update application
app.put("/api/applications/:id", async (req, res) => {
    const {id} = req.params;

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
     console.log(error)
     res.status(500).json({ error: 'Failed to update application' });
    }
})




const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

