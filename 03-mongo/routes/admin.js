const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require('../db/index');
const router = Router();


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

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title=req.body.title;
    const description=req.body.description;
    const price=req.body.price;
    const imageLink=req.body.price;

    const newCourse= await Course.create({
        title,
        description,
        imageLink,
        price
    })
    res.json({
        message: "Course created successfully",
        courseId:newCourse._id
    })
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    Course.find({})
        .then(function(response){
            res.json({
                courses:response
            });
        })
    
});

module.exports = router;
