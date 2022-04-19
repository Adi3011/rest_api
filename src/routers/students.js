const express = require("express")
const router = new express.Router();
const Student = require("../models/students");

// get all students
router.get("/students", async( req, res) => {

    try{
        const result = await Student.find();
        console.log(result)
        res.status(201).send(result);

    }catch(err)
    {
        res.status(400).send(err);
    }
})


// get single student data
router.get("/students/:id", async(req,res) => {
    try{
        const _id = req.params.id
        const result = await Student.findById(_id)
        if(!result){
            res.status(404).send()
        }
        else{
            console.log(result)
            res.status(200).send(result)
        }
        
    }catch(err){
        res.status(500).send(err)
    }
});



// create using async-await (this is better than promise)
router.post("/students", async(req,res) => {
    try{
        const user = new Student( req.body);
        const result = await user.save();
        res.status(201).send(result);
    } 
    catch(err){
        res.status(400).send(err);
    }
   

})

//update the students by its id
router.patch("/students/:id", async(req,res) =>{
    try{
        const _id =req.params.id;
        const result = await Student.findByIdAndUpdate(_id, req.body, { 
            new : true, // returns modified document instead original
            useFindAndModify : false
        })
        if(result){
            console.log(result);
            res.status(200).send(result);
        }
        else{
            res.status(400).send()
        }
    }catch(err){
        res.status(404).send(err);
    }
});


//delete student
router.delete("/students/:id" , async(req,res) => {
    try{
        const _id = req.params.id;
        const result = await Student.findByIdAndDelete(_id,{ 
            new : true, // returns modified document instead original
            useFindAndModify : false
        });
        if(result){
            console.log(result);
            res.status(200).send(result);
        }
        else{
            res.status(404).send()
        }
    }catch(err){
        res.status(500).send(err);
    }
})

module.exports = router;