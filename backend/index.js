import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to MongoDB ✅");
        app.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT} 🚀`)
        })
    })
    .catch((err)=>{
        console.error("Failed to connect to MongoDB ", err);
    })