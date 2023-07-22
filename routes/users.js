const router = require('express').Router();
let User = require('../models/User');

router.route('/').get(async (req, res) => {
    const users = await User.find({});
    res.status(200).json({ message: "Users retrieved", success: true, users });
});

router.route('/:id').get(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(400).json({ message: "User doesn't exist for the provided id.", success: false });
    }
    return res.status(200).json({ user, success: true });
});

router.route('/add').post(async (req, res) => {
    const { email, firstName } = req.body;
    
    if (!email || !firstName) {
      return res.status(400).json({ message: "Email and firstName are required", success: false });
    }
    
    const newUser = new User({ email, firstName });
    await newUser.save();
    return res.status(200).json({ message: "User added", success: true });
});

router.route('/update/:id').put(async (req, res) => {
    const { email, firstName } = req.body;
    const { id } = req.params;
  
    if (!email || !firstName) {
      return res.status(400).json({ message: "Email and firstName are required", success: false });
    }
  
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User not found for the provided id.", success: false });
    }
    
    user.email = email;
    user.firstName = firstName;
    
    await user.save();
    return res.status(200).json({ message: "User updated", success: true });
});

router.route('/:id').delete(async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    return res.status(200).json({ message: "User deleted.", success: true });
});

module.exports = router;
