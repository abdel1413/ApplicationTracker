const express = require('express')
const cors = require('cors')
const pool = require("./db")

const app = express()   
app.use(cors())
app.use(express.json()); //When JSON data arrives in a request, parse it so I can access it through req.body



const applications = [
    {
    "id": 1,
    "company": "goggle",
    "role": "Software Engineer",
    "status": "applied"

    },{
        "id": 2,
        "company": "amazon",
        "role": "Data Scientist",
        "status": "interviewing"    
    }
]



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
    const  result = await pool.query('SELECT * FROM applications');
    res.json(result.rows);
});


app.post("/api/applications", (req, res) => {

    const newApplication = {
        id: req.body.id,
        company: req.body.company,
        jobPostingUrl: req.body.jobPostingUrl,
        role: req.body.role,
        dateApplied: req.body.dateApplied,
        status: req.body.status,
        notes: req.body.notes,
        createdAt: req.body.createdAt
    };

   
    applications.push(newApplication);
    res.status(201).json(newApplication);
});

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

