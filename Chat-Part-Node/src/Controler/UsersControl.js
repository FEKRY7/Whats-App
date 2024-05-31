const jwt =  require('jsonwebtoken')
const userModel = require('../../Database/models/userModel.js') 
const bcrypt = require('bcrypt')
const validator = require('validator')
// const sendEmail = require('../utilites/sendEmail.js')
// const signUpTemplate = require('../utilites/htmlTemplets.js')


const SignUp = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if the user already exists
        let isUser = await userModel.findOne({ email });
        if (isUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
 
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Email must be a valid email" });
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ success: false, message: "Password must be strong" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 5);
        isUser = await new userModel({ name, email, password: hashedPassword });
        await isUser.save();

        const token = jwt.sign({ email: isUser.email, id: isUser._id }, process.env.JWT_SECRET_KEY);
        res.status(200).json({
            success: true,
            message: "User created successfully",
            token,
            email: isUser.email,
            _id: isUser._id,
            name: isUser.name
        });
    } catch (error) {
        console.error("Error in SignUp:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};



const SignIn = async (req, res) => {
    try {
        // Destructuring the req.body
        const { email, password } = req.body;

        // Searching for the user in the database
        const isUser = await userModel.findOne({ email });
        if (!isUser) {
            return res.status(400).json({ success: false, message: "Invalid Email..."});
        }


        // Comparing the hashed password with the req.body password
        const match = await bcrypt.compare(password, isUser.password);

        // Sending a response if the passwords don't match
        if (!match) {
            return res.status(400).json({ success: false, message: "Invalid password..." });
        }

        // Creating a token for authentication and authorization
        const token = jwt.sign({ email: isUser.email, id: isUser._id }, process.env.JWT_SECRET_KEY);


        // Sending the response
        return res.status(200).json({
            success: true,
            message: "You are logged in",
            token,
            email: isUser.email,
            _id: isUser._id,
            name: isUser.name
        });
    } catch (error) {
        console.error("Error in signIn:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


const findUser = async (req, res) => {
    try {
        const userId = await userModel.findById(req.params.id);
        if (!userId) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ 
            success: true, 
            email: userId.email,
            _id: userId._id, // Corrected from isUser._id to userId._id
            name: userId.name // Corrected from isUser.name to userId.name
        }); 
    } catch (error) {
        console.error("Error in findUser:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error in findUser:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


module.exports = {
    SignUp,
    SignIn,
    findUser,
    getUsers   
}