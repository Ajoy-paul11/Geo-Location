import mongoose from "mongoose"



const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGO_URL}/userLocation`
        )

        console.log(`\n MongoDB connected, DB HOST: ${connectionInstance.connection.host}`);

    } catch (error) {
        console.error("Error while trying to connect DB: ", error)
    }
}


export default connectDB