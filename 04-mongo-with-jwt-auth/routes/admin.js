const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const {Admin} =require("../db")
const router = Router();
const {JWT_SECRET}=require("..");
const jwt= require("jsonwebtoken")

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username=req.body.username;
    const password=req.body.password;

    //check if the user with this username is already exits
    Admin.create({
        username:username,
        password:password
    })
    .then(function(){
        res.json({message:"Admin created successfully"});
    })
    .catch(function(){
        res.json({message:"Failed to create admin"});
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username=req.body.username;
    const password=req.body.password;

    const user=await User.find({
        username,
        password
    })
    if(user){
        const token= jwt.sign({
            username
        }, JWT_SECRET);
        res.json({token})
    }else{
        res.status(411).json({
            message:"Incorrect email and pass"
        })
    }
    
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
});
 
module.exports = router;