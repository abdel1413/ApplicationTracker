const express = require('express')
const cors = require('cors')
const errorhandlerMiddleware = require("./middleware/errorHandler")
const applicationsRoutes = require("./routes/applications")


const allowedOrigins =[
    'http://localhost:5173', process.env.FRONTEND_URL
]
const app = express()   
app.use(cors({ origin: (origin, callback) => {
    if(!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
    } else {
        callback(new Error('Not allowed by CORS'))
    }
} }))

app.use(express.json()); 
app.use("/api/applications", applicationsRoutes);

app.get('/', (req, res) => {
    res.send('Job application tracker API is running !');
});

app.use(errorhandlerMiddleware)

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

