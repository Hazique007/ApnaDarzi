// import ('dotenv').config();
import express from "express";
const router =express();

router.use(express.json());
import {sendOtp , verifyOtp,getUserdetials } from '../controllers/userController.js'


router.post('/send-otp',sendOtp);
router.post('/verify-otp',verifyOtp);
router.get('/getUserDetails',getUserdetials)


export default router;