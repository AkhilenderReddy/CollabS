const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Influencer = require('../Models/InfluencerModel')
const Client = require('../Models/ClientModel')
const HttpError = require('../Models/errorModel')

 
const getUserModel = (role)=>{
    if(role === "Influencer") return Influencer;
    if(role === "Client") return Client;
    throw new HttpError('Invalid user role login again.',422)
}

const registerUser = async (req, res, next) => {
    const { role, username, password, email } = req.body;

    if(!role){
        return next(new HttpError('Please select appropriate role to continue.', 401));   
    }

    if(!username || !password || !email){
        return next(new HttpError("Please fill all the details.",401));
    }

    let UserModel;
    try {
        UserModel = getUserModel(role);
    } catch (error) {
        return next(error);
    }

    try {
        let existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return next(new HttpError('Username already exists. Please choose a different username.', 422));
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            username,
            password: hashedPass,
            email
        });

        await newUser.save(); 
        
        const {_id: id} = newUser;
        
        const profile_pic = newUser.profilePicture;

        const token = jwt.sign(
            { id , username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({ message: 'User registered successfully!',token,username: newUser.username,id: newUser._id,role,profile_pic});
    } catch (error) {
        return next(new HttpError('Registration failed. Please try again later.', 500));
    }
};



const loginUser = async(req,res,next)=>{ 
    
    const { role, username, password } = req.body;

    if(!role){
        return next(new HttpError('Please select appropriate role to continue.', 401));   
    }

    let UserModel;
    try {
        UserModel = getUserModel(role);
    } catch (error) {
        return next(error);
    }
    try {

        const user = await UserModel.findOne({ username }); 
        if (!user) {
            return next(new HttpError('Invalid credentials. Check your username and password.', 401));
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(new HttpError('Invalid credentials. Please check your username and password.', 401));
        }

        const {_id: id} = user;
        const profile_pic = user.profilePicture;
        
        const token = jwt.sign(
            { id , username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ id, username: user.username,role , token,profile_pic });
    } catch (error) {
        return next(new HttpError('Login failed. Please try again later.', 500));
    }
}

const getUser = async(req,res,next)=>{
    
    const {id} = req.params;
 
    try {
        let user = await Influencer.findById(id);
        if(user){
            return res.status(200).json({user, role: 'Influencer'})
        }
        user = await Client.findById(id);
        if(user){
            return res.status(200).json({user,role: 'Client'})
        }
        return next(new HttpError('User not found', 404))
    } catch (error) {
        return next(new HttpError(error))
    }
}


const decodeToken = (req,res,next) => {
    try {
        const {token} = req.params;
        const decode = jwt.decode(token);
        const exp = decode.exp;
        return Math.floor(Date.now() / 1000) < exp ? res.status(200).json({message: true}) : res.status(200).json({message: false});
    } catch (error) {
        return next(new HttpError('Authentication failed. Please login again.', 401));
    }
}

module.exports = {registerUser,loginUser,getUser,decodeToken} 

