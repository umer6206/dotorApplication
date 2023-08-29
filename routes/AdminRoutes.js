const express = require("express");
const authMiddleware = require("../middelware/authMiddleware");
const { getAllUsers, getAllDoctors, updateDoctorStatus, getProfileCtrl } = require("../controllers/AdminCtrl");
const router = express.Router();

//get all user routes
router.get("/getAllUser", authMiddleware, getAllUsers)

//get all doctr routes
router.get("/getAllDoctor", authMiddleware, getAllDoctors)

// update doctor status

router.post("/updateDoctorStatus", authMiddleware, updateDoctorStatus)

//admin profile get
router.get("/get-admin-profile", authMiddleware, getProfileCtrl)

module.exports = router