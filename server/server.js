const express = require('express')
const cors = require('cors')
const pool = require("./db")
const errorhandlerMiddleware = require("./middleware/errorHandler")
const {validateApplication, validateId} = require("./utils/validation")
const applicationsRoutes = require("./routes/applications")

const app = express()   
app.use(cors())
app.use(express.json()); //When JSON data arrives in a request, parse it so I can access it through req.body
app.use("/api/applications", applicationsRoutes);



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


//if no company name, not do insert to backend
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









app.use(errorhandlerMiddleware)

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

