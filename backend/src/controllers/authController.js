const user = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const env = require('dotenv');


exports.signup = async (req , res) => {
    const { username , email , password } = req.body;

    try {

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one symbol.' });
        }

        const existingUser = await user.findOne({ email }) || await user.findOne({ username });
        if(existingUser){
            return res.status(400).json({ message: 'User already exists' });
    }

        const hashedPassword = await bcrypt.hash(password , parseInt(env.config().parsed.BCRYPT_SALT_ROUNDS));
        const newUser = new user ({
            username,
            email,
            password : hashedPassword
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(201).json({ token });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.signin = async (req , res) => {
    const { email , password } = req.body;

    try {
        const existingUser = await user.findOne({ email });
        if(!existingUser){
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password , existingUser.password);
        if(!isPasswordValid){
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        return res.status(200).json({ token });
    }catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}


exports.updatePassword = async (req , res) => {
    const { oldPassword , newPassword } = req.body;

    try {

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

        if (!passwordRegex.test(newPassword)) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one symbol.' });
        }

        const existingUser = await user.findById(req.userID);
        if(!existingUser){
            return res.status(404).json({ message: 'User not found' });
        }

        const isOldPasswordValid = await bcrypt.compare(oldPassword , existingUser.password);
        if(!isOldPasswordValid){
            return res.status(400).json({ message: 'Old password is incorrect' });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword , parseInt(env.config().parsed.BCRYPT_SALT_ROUNDS));
        existingUser.password = hashedNewPassword;
        await existingUser.save();

        return res.status(200).json({ message: 'Password updated successfully' });


    }catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

