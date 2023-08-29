const mongoose = require("mongoose")
const DbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log(`db connected`);

    } catch (error) {
        console.log(`server issue `);
    }
}

module.exports = DbConnection