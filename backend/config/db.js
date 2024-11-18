import mongoose from 'mongoose';

// when connectDB is called, db.js can access process.env, which is a global object in Node.js, and call .MONGO_URI
export const connectDB = async () => {
    try {
        // connects to the database
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // Immediately ends the process with an exit code of 1
        // process code 1 means exit with failure, and 0 means success
        process.exit(1);
    }
}