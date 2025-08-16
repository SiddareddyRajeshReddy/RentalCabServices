// backend/routers/AuthRouter.js
import express from 'express';
import User from '../models/User.js';

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
    const user = await User.findOne({email, password})
    
})
export default router;