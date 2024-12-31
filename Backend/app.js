import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import { sendEmail } from './utils/sendEmail.js';
import { Contact } from './models/Contact.js';
import mongoose from 'mongoose';

const app = express();
const router = express.Router();


config({ path: './config.env' });

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });


app.use(cors({
    origin:[process.env.FRONTEND_URL,"http://localhost:5173/"],
    methods:["POST"],
    credentials:true
}));

app.options("*", cors());



  app.use(express.json())
  app.use(express.urlencoded({extended:true}));

  router.post("/send/mail", async (req,res) => {
       const {name , email ,message} = req.body;

        if(!name || !email || !message){
            return (res.status(400)).json({
                success:false,
                message:"Please provide all details"
            });
        }
         try {

            const newContact = new Contact({ name, email, message });
            await newContact.save(); // MongoDB save

            await sendEmail({
                email:"nawin8925@gmail.com",
                subject:"GYM WEBSITE CONTACT",
                message,
                userEmail:email,
            });
            res.status(200).json({
                success:true,
                message:"Message Send Successfully."})
            
         } catch (error) {
             console.error(error)    
             res.status(500).json({
                success:false,
                error:"Internal Server Error."})        
         }
  })
    app.use(router)  

app.listen(process.env.PORT, () => {
  console.log(`Server Running on http://localhost:${process.env.PORT}`);
});
