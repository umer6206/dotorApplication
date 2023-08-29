const mongoose = require("mongoose")

const AppointmentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    doctorId: {
        type: String,
        required: true
    },
    userInfo: {
        type: String,
        required: true
    },
    doctorInfo: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "pending"
    }

}, {
    timestamps: true
})
const AppointmentModel = new mongoose.model("appointment", AppointmentSchema)

module.exports = AppointmentModel