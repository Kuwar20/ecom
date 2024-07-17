import mongoose from 'mongoose';

export const connectDB = async () => {
    mongoose.connect(process.env.MONGO_URI, {dbName: process.env.dbName,})
    .then((c)=>console.log(`Connected to ${c.connections[0].name} database`))
    .catch((err)=>console.log(`Error connecting to database: ${err.message}`))
};