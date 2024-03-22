const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const getUser = async (req, res) => {
  

  try {
    let users = await User.find({  });
   

      return res.status(200).json(users);
   
    
   
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
const editUserRole = async (req, res) => {
  const {  newRole } = req.body;
  const { userId } = req.params;
  try {
    // Find the user by ID
    console.log(userId)
    let user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's role
    user.role = `${newRole}`;
    await user.save();

    res.status(200).json({ message: 'User role updated successfully', user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // Check if the user is an admin
    if (user.role === 'Admin') {
      return res.status(403).json({ message: 'Access Denied. Please log in through the admin portal.' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      'this-is-our-web-app',
      { expiresIn: 36000 },
      (error, token) => {
        if (error) throw error;
        res.status(200).json({ token, user });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
const registerUser = async (req, res) => {
   
    const { name, email, password } = req.body;
  
    try {
    
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
   
      user = new User({
        name,
        email,
        password,
      });
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
   
      await user.save();
  
  const payload = {
    user: {
      id: user.id,
    },
  };
 
  
  jwt.sign(
    payload,
    'this-is-our-web-app',
    { expiresIn: 3600 },
    (error, token) => {
      if (error) throw error;
      res.status(200).json({ token });
    }
    );
   
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
  };
  const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        if (user.role !== 'Admin') {
            return res.status(403).json({ message: 'Access Denied' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            'this-is-our-web-app', 
            { expiresIn: 36000 },
            (error, token) => {
                if (error) throw error;
                res.status(200).json({ token ,user});
            }
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

const adminRegister = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

      
        user = new User({
            name,
            email,
            password,
            role: 'Admin', 
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            'this-is-our-web-app', 
            { expiresIn: 3600 },
            (error, token) => {
                if (error) throw error;
                res.status(200).json({ token });
            }
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
  loginUser,
  registerUser,
  adminLogin,
  adminRegister,
  getUser,
  editUserRole
};