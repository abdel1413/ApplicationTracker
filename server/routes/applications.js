const express = require('express')
const { getApplications, getApplicationById, createApplications, updateApplication, deleteApplication } = require('../controllers/applicationController')
const router = express.Router()


router.get("/", getApplications);


router.get("/:id",getApplicationById)

router.post("/", createApplications);

router.put("/:id", updateApplication);

router.delete("/:id", deleteApplication);

module.exports = router;