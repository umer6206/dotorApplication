const express = require("express");
const authMiddleware = require("../middelware/authMiddleware");
const { getDoctorInfoCtrl, updateDoctorProfileCtrl, getDoctorById, getDoctorAppintmentCtrl, UpdateStatus } = require("../controllers/DoctorCtrl");
const router = express.Router();

router.post("/getDoctorInfo", authMiddleware, getDoctorInfoCtrl)

router.post("/updateDocProfile", authMiddleware, updateDoctorProfileCtrl)

router.post("/getDoctorById", authMiddleware, getDoctorById)

router.get("/get-doctor-appointment", authMiddleware, getDoctorAppintmentCtrl)

router.post("/update-status", authMiddleware, UpdateStatus)
module.exports = router