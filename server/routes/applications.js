const express = require('express')
const pool = require("../db")
const {validateApplication, validateId} = require("../utils/validation")
const { getApplications, getApplicationById, createApplications, updateApplication, deleteApplication } = require('../controllers/applicationController')
const router = express.Router()


router.get("/", getApplications);


//edit app first get the specific application
router.get("/:id",getApplicationById
)

router.post("/", createApplications);

//2nd route - update application
router.put("/:id", updateApplication);

//3rd route - delete application
router.delete("/:id", deleteApplication);





module.exports = router;