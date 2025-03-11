const User = require('../Models/user.model');



const createUser = async(req, res)=>{
    try
    {
        const {username, email, password, haveAsthma} = req.body;
        if(!username || !email || !password || !haveAsthma)
        {
            return res.status(400).json({
                message: "please fill all the fields",
                error: true,
                success: false
            })
        }
        const user = await User.findOne({email});
        if(user)
        {
            return res.status(401).json({
                message: "user is already present please go to login page",
                error: true,
                success: false
            })
        }

        const newUser = await User.create({
            username,
            email,
            password,
            haveAsthma,
        });

        const token = await newUser.getSignedJwtToken();

        await newUser.save();

        return res.status(201).json({
            message: "user is created successfully..",
            error: false,
            success: true,
            data: newUser
        })
    }
    catch(error)
    {
        res.status(500).json({
            message: error.message,
            error: true,
            success: false
        })
    }
}


const loginUser = async(req, res)=>{
    try
    {
        const {email, password} = req.body;
        if(!email || !password)
        {
            return res.status(400).json({
                message: "please fill all the fields",
                error: true,
                success: false
            })
        }

        const user = await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({
                message:"user is not created yet please go to registration page",
                error: true,
                success: false
            })
        }

        if(password !== user.password)
        {
            return res.status(400).json({
                message: "invalid credentials",
                error: true,
                success: false
            })
        }

        const isMatch = await user.matchPassword(password);
        
        const token = await user.getSignedJwtToken();

        return res.status(200).json({
            message: "user login successfully....",
            error: false,
            success: true,
            data: {
                email,
                password
            },
            token
        })
       
    }
    catch(error)
    {
        res.status(500).json({
            message: error.message,
            error: true,
            success: false
        })
    }
}


const deleteUser = async(req, res)=>{
    try
    {
        const user = await User.findById(req.params.id);
        if(!user)
        {
            return res.status(404).json({
                message: "user is not found",
                error: true,
                success: false
            })
        }

        await user.deleteOne();

        return res.status(200).json({
            message: "user deleted successfully....",
            error: false,
            success: true
        })

    }
    catch(error)
    {
        res.status(500).json({
            message: error.message,
            error: true,
            success: false
        })
    }
}


module.exports = {createUser, loginUser, deleteUser}