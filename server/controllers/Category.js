const Category = require("../models/Categories");
// category karna hai
exports.createCategory = async(req,res)=>{

    try {
        // fetch data
        const {category, description} = req.body;
        // validate the data
        if(!category || !description){

            return res.status(400).json({
                success:false,
                message: "Enter category details perfectly",
            })
        }
        // check the validate 
        const response =  await Category.findOne({categoryName:category});

        if(response){
            return res.status(401).json({
                success:false,
                message: "Category is already present in Database",
            })
        }
        // create the emtry in database
        await Category.create({
            categoryName:category,
            description,
        })
        // response to client
        return res.status(200).json({
            success:true,
            message: "Category is created successfully",
        })
    } catch (error) {
        
        return res.status(500).json({
            success:false,
            message: "Error occured, Category is not created ",
            error: error.message
        })
    }
};

exports.getAllCategory = async(req,res) =>{

    try {
        // fetch the data from the database
        const response  = await Category.find({}, {
            categoryName:true,
            description:true,
        });

        res.status(200).json({
            success:true,
            data:response,
            message: "Tags fetched successfully"
        })

    } catch (error){
        
        console.log("Error at ", error);
        res.status(500).json({
            success:false,
            message: "Error occured while getting the tags"
        })
    }
}

exports.CategoryPageDetails = async(req,res)=>{
    try {
        // fetch  category id
        const {categoryId} = req.body;
        // get courses for specified categories
        const getCoursebyCategory = await Category.findById(categoryId).populate("course").exec();
        // validation
        if(!getCoursebyCategory){

            return res.status(404).json({
                success:false,
                message: "data about this category is not exist"
            })
        }
        	// Handle the case when there are no courses
		if (getCoursebyCategory.course.length === 0) {
			console.log("No courses found for the selected category.");
			return res.status(404).json({
				success: false,
				message: "No courses found for the selected category.",
			});
		}
        // get courses for different categories
        const getCourseDiffer = await Category.find({
            _id: {$ne:categoryId}
        })
        .populate("course")
        .exec();
        // get top 10 selling courses *******************crosscheck*************************
        // ********************************************testing********************************
        const getTopCourses = await Category.find({ _id: {$ne:categoryId}}).populate({
            path:"course"
        })
        .sort({"course.studentEnrolled.length": -1})
        .limit(10)
        .exec();
        console.log("top 10 courses are : ",getTopCourses);

        // return response
        return res.status(200).json({
            success:true,
            data: {
                getCourseDiffer,
                getCoursebyCategory,
                getTopCourses
            },
            message: "Courses fetched successfully"
        })
    } catch (error) {
        
        console.log("Error at ", error);
        res.status(500).json({
            success:false,
            message: "Error occured while getting the tags"
        })
    }
}