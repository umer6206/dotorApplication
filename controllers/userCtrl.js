const userModel = require('../models/userModel')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const DoctorModel = require('../models/DoctorModel');
const AppointmentModel = require('../models/appointmentModel');
const moment = require("moment")
//register callback function
const registerControllers = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(200).send({ success: false, message: "email already exist" })
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({ name, email, password: hashPassword });
        await newUser.save()
        res.status(201).send({ success: true, message: "Register successfully" })

    } catch (error) {
        // console.log(error);
        res.status(500).send({ success: false, message: `Register controller ${error.message}` })
    }
}
const loginControllers = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email })
        if (!user) {
            return res.status(404).send({ message: "user not found", success: false })
        }
        const isPassMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isPassMatch) {
            return res.status(400).send({ message: "invlaid email or password", success: false })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "2d" })
        res.status(200).send({ message: "login success", success: true, token })

    } catch (error) {
        // console.log(error);
        res.status(500).send({ message: `Errors in Login CTRL ${error.message}` })
    }
}
const authControllers = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userId });
        user.password = undefined;
        if (!user) {
            return res.status(404).send({
                message: "user not found",
                success: false
            })
        } else {
            res.status(200).send({
                success: true,
                data: user
            })
        }
    } catch (error) {
        // console.log(error);
        res.status(500).send({
            message: "auth error",
            success: false,
            error
        })
    }
}

const applyDocControllers = async (req, res) => {
    try {
        const newDoctor = await DoctorModel({ ...req.body, status: "pending" })
        await newDoctor.save();
        const adminUser = await userModel.findOne({ isAdmin: true });
        const notification = adminUser.notification;
        notification.push({
            type: "apply doctor-reques",
            message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for doctor`,
            data: {
                doctorId: newDoctor._id,
                name: `${newDoctor.firstName} ${newDoctor.lastName}`,
                onClickPath: "/admin/doctor"
            }
        })
        await userModel.findByIdAndUpdate(adminUser._id, { notification })
        res.status(200).send({
            success: true,
            message: "doctor applied successfuly"
        })
    } catch (error) {
        // console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while applying doctor"
        })
    }
}

const getAllNotificationDoctor = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId });
        const notification = user.notification;
        const seennotification = user.seennotification;
        seennotification.push(...notification)
        user.notification = [];
        user.seennotification = notification;
        const updatedUser = await user.save();
        res.status(200).send({
            success: true,
            message: "all notification mark as read",
            data: updatedUser
        })
    } catch (error) {
        // console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error in getting all notification"
        })
    }
}

const deleteAllNotification = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId })
        user.notification = [];
        user.seennotification = [];
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send({
            message: "successfully deleted all notification",
            success: true,
            data: updatedUser
        })

    } catch (error) {
        // console.log(error)
        res.status(500).send({
            success: false,
            message: "error in deleting all notification",
            error
        })
    }
}

const getAllDoctor = async (req, res) => {
    try {
        const doctor = await DoctorModel.find({ status: "approved" })
        res.status(200).send({
            success: true,
            message: "fetch doctor list successfully",
            data: doctor
        })
    } catch (error) {
        // console.log(error)
        res.status(500).send({
            success: false,
            message: "error in fetching doctor list",
            error
        })
    }
}

const bookAppointmentCtrl = async (req, res) => {
    try {
        req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
        req.body.time = moment(req.body.time, "HH:mm").toISOString();
        req.body.status = "pending"
        const newAppoinment = new AppointmentModel(req.body)
        await newAppoinment.save()
        const user = await userModel.findOne({ _id: req.body.doctorInfo.userId })
        user.notification.push({
            type: "appointment notification",
            message: "A new Appointment notification from " + req.body.userInfo.name,
            onclick: "/user/appointments"
        })
        await user.save()
        res.status(201).send({
            success: true,
            message: "new appointment sent"
        })
    } catch (error) {
        // console.log(error);
        res.status(500).send({
            success: false,
            message: "somenthing went wrong during appointment",
            error
        })
    }
}

const userAppointmentsListCtrl = async (req, res) => {
    try {
        const appointment = await AppointmentModel.find({ userId: req.body.userId })
        res.status(200).send({
            success: true,
            message: "fetched appointment list successfully",
            data: appointment
        })
    } catch (error) {
        // console.log(error);
        res.status(500).send({
            success: false,
            message: "somenthing went during fethcing appointment",
            error
        })
    }
}

const getUserProfileCtrl = async (req, res) => {
    try {
        const user = await userModel.find({ _id: req.body.userId })
        res.status(201).send({
            success: true,
            message: "use fetched successfully",
            data: user
        })
    } catch (error) {
        // console.log(error);
        res.status(500).send({
            success: false,
            message: "somenthing went during fethcing appointment",
            error
        })
    }
}
module.exports = {
    loginControllers,
    registerControllers,
    authControllers,
    applyDocControllers,
    getAllNotificationDoctor,
    deleteAllNotification,
    getAllDoctor,
    bookAppointmentCtrl,
    userAppointmentsListCtrl,
    getUserProfileCtrl
}