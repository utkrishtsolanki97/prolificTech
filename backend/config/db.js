import mongoose from 'mongoose';

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.connectionuri, {
            useNewUrlParser: true, 
            useCreateIndex: true, 
            useUnifiedTopology: true
        })

        console.log(`Mongoose Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB