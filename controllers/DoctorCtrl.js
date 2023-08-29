const DoctorModel = require("../models/DoctorModel");
const appointmentModel = require("../models/appointmentModel")
const userModel = require("../models/userModel")
const getDoctorInfoCtrl = async (req, res) => {
    try {
        const doctor = await DoctorModel.findOne({ userId: req.body.userId })

        res.status(200).send({
            success: true,
            message: "doctor data fetch success",
            data: doctor
        })
    } catch (error) {
        // console.log(error);
        res.status(500).send({
            success: false,
            message: " doctor data failed to fetch",
            error
        })
    }
}


const updateDoctorProfileCtrl = async (req, res) => {
    try {
        const doctor = await DoctorModel.findOneAndUpdate({ userId: req.body.userId }, req.body)
        res.status(200).send({
            success: true,
            message: "doctor update successfully",
            data: doctor
        })
    } catch (error) {
        // console.log(error);
        res.status(500).send({
            success: false,
            message: "profiile updation failed",
            error
        })
    }
}

const getDoctorById = async (req, res) => {
    try {
        const doctor = await DoctorModel.findOne({ _id: req.body.doctorId })
        res.status(201).send({
            success: true,
            message: "fetch single doctor ",
            data: doctor
        })
    } catch (error) {
        // console.log(error);
        res.status(500).send({
            success: false,
            message: "Failed to get doctor by id",
            error
        })
    }
}

const getDoctorAppintmentCtrl = async (req, res) => {
    try {
        const doctor = await DoctorModel.findOne({ userId: req.body.userId })
        const appointment = await appointmentModel.find({ doctorId: doctor._id })
        res.status(201).send({
            success: true,
            message: "successfully fetched doctor appointment",
            data: appointment
        })
    } catch (error) {
        // console.log(error);
        res.status(500).send({
            success: false,
            message: "Failed to get doctor appointment",
            error
        })
    }
}
const UpdateStatus = async (req, res) => {
    try {
        const { appointmentId, status } = req.body;
        const appointment = await appointmentModel.findByIdAndUpdate(appointmentId, { status })
        const user = await userModel.findOne({ _id: appointment.userId })
        const notification = user.notification
        notification.push({
            type: "status-updated",
            message: `Your appointment has been ${status}`,
            onclickPath: "/doctor-appointment"
        })
        await user.save();
        res.status(201).send({
            success: true,
            message: `Your appointment has been ${status}`
        })
    } catch (error) {
        // console.log(error);
        res.status(500).send({
            success: false,
            message: "Failed to get doctor appointment",
            error
        })
    }
}

module.exports = {
    getDoctorInfoCtrl,
    updateDoctorProfileCtrl,
    getDoctorById,
    getDoctorAppintmentCtrl,
    UpdateStatus
}