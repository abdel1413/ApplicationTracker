const express = require('express')
const cors = require('cors')

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

app.get("/api/applications", (req, res) => {
    res.json(applications);
});


app.post("/api/applications", (req, res) => {
    const newApplication = {
        "id": applications.length + 1,
        "company": req.body.company,
        "role": req.body.role,
        "status": req.body.status
    };
    applications.push(newApplication);
    res.status(201).json(newApplication);
});

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

