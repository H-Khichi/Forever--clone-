import mongoose from "mongoose";

const ConnectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log("DB connected")
    })
    await mongoose.connect(`${process.env.MONGODB_URI}ecommerce`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}
export default ConnectDB;