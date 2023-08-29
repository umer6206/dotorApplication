const mongoose = require("mongoose")

const DoctorSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    firstName: {
        type: String,
        required: [true, "first name is required"]
    },
    lastName: {
        type: String,
        required: [true, "last name is required"]
    },

    phone: {
        type: String,
        required: [true, "phone no is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"]
    },
    website: {
        type: String,
    },
    address: {
        type: String,
        required: [true, "office address is required"]
    },
    specialization: {
        type: String,
        required: [true, "specialization is required"]
    },
    expereince: {
        type: String,
        required: [true, "expereince is required"]
    },
    feesPerConsultation: {
        type: Number,
        required: [true, "fees is required"]
    },
    status: {
        type: String,
        default: "pending"
    }
    ,
    timings: {
        type: Object,
        required: [true, "working time is required"]
    }
},
    { timestamps: true }
)

const DoctorModel = mongoose.model("doctors", DoctorSchema)

module.exports = DoctorModel