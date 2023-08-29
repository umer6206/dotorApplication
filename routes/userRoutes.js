const express = require("express");
const { loginControllers, registerControllers, authControllers, applyDocControllers, getAllNotificationDoctor, deleteAllNotification, getAllDoctor, bookAppointmentCtrl, userAppointmentsListCtrl, getUserProfileCtrl } = require("../controllers/userCtrl");
const authMiddleware = require("../middelware/authMiddleware");

//objects
const router = express.Router();

//routes

//login 
router.post('/login', loginControllers);

//register
router.post("/register", registerControllers)

//authorization routes

router.post("/getLoginUser", authMiddleware, authControllers)

// apply doctor routes
router.post("/apply-doctor", authMiddleware, applyDocControllers)

// get all notification doctor routes
router.post("/get-all-notification", authMiddleware, getAllNotificationDoctor)

// delete all notification doctor routes

router.post("/delete-all-notification", authMiddleware, deleteAllNotification)

//get all doctor list
router.get("/doctor-list", authMiddleware, getAllDoctor)

// appoinment route
router.post("/book-appointment", authMiddleware, bookAppointmentCtrl)

//appointment list user

router.get("/userAppointment", authMiddleware, userAppointmentsListCtrl)

//get user profile

router.post("/get-user-profile", authMiddleware, getUserProfileCtrl)

module.exports = router;

