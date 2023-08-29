const DoctorModel = require("../models/DoctorModel");
const UserModel = require("../models/userModel");

const getAllUsers = async (req, res) => {
    try {
        const user = await UserModel.find({})
        res.status(200).send({
            message: "user list",
            data: user,
            success: true
        })
    } catch (error) {
        // console.log(error);
        res.status(500).send({
            message: "error while fetching all users",
            error,
            success: false

        })
    }
}
const getAllDoctors = async (req, res) => {
    try {
        const doctors = await DoctorModel.find({})
        res.status(200).send({
            message: "user list",
            data: doctors,
            success: true
        })
    } catch (error) {
        // console.log(error);
        res.status(500).send({
            message: "error while fetching all doctors",
            error,
            success: false
        })
    }
}

//update status of doctor

const updateDoctorStatus = async (req, res) => {
    try {
        const { doctorId, status } = req.body;
        const doctor = await DoctorModel.findByIdAndUpdate(doctorId, { status })
        const user = await UserModel.findOne({ _id: doctor.userId })
        const notification = user.notification
        notification.push({
            type: "doctor-account-request-update",
            message: `your doctor account request has${status}`,
            onClickPath: "/notification"
        })
        user.isDoctor = status === "approved" ? true : false
        await user.save();
        res.status(200).send({
            success: true,
            message: "Account status updated",
            data: doctor
        })
    } catch (error) {
        // console.log(error);
        res.status(500).send({
            success: false,
            message: "account status updation failed",
            error
        })
    }
}

const getProfileCtrl = async (req, res) => {
    try {
        const profile = await UserModel.find({ isAdmin: true })
        res.status(201).send({
            success: true,
            message: "admin profile fetched",
            data: profile
        })
    } catch (error) {
        // console.log(error);
        res.status(500).send({
            success: false,
            message: "something went wrong in admin profile fetch",
        })
    }
}

module.exports = {
    getAllDoctors,
    getAllUsers,
    updateDoctorStatus,
    getProfileCtrl
}