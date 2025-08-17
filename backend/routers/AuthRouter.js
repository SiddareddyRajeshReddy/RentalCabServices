// backend/routers/AuthRouter.js
import express from 'express';
import User from '../models/User.js';
import { connect } from 'mongoose';
import connectDB from '../config/db.js';
const router = express.Router();
router.get('/AuthSignUp', (req, res)=>{
    res.send("hello")
}
)
router.post('/AuthSignUp', async (req, res) => {
  const { email, password, name, phone } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    console.log(existingUser)
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }
    // Create new user
    const user = new User({ email, password, name, phone });
    await user.save();

    res.status(201).json({
      success: true,
      user: { email: user.email, name: user.name, phone: user.phone }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/AuthLogin', async (req, res)=>{
    const {email, password} = req.body
    try{
      const userData = await User.findOne({email: email});
      console.log(userData)
      if(!userData)
      {
        res.status(401).send('Invalid Credentiatls');
      }
      else{
        if(password === userData.password)
        {
          res.status(200).send("Login Successful");
        }
        else{
          res.status('401').send('Invalid Credentials')
        }
      }
      }
      catch(error){
        res.status(500).send('Error logging in');
    }
    
})
export default router;