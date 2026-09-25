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
    res.json({message: "delete route reached",
        id: id
    })
})

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

