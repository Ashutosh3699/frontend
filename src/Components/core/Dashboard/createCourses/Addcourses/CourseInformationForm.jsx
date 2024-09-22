import React from 'react';
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import CourseRequirements from './CourseRequirements';
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {fetchCourseCategories} from "../../../../../services/operations/courseApi";
import toast from 'react-hot-toast';
import IconBtn from '../../../../common/IconBtn';
import { setStep, setCourse, setEditCourse } from '../../../../../features/courseSlice';
import {COURSE_STATUS} from "../../../../../utils/constant"
import { editCourseDetails, addCourseDetails } from '../../../../../services/operations/courseApi';
import CourseTags from './CourseTags';
import CourseImageUploader from './CourseImageUploader';

const CourseInformationForm = () => {

    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const [showCategory,setShowCategory] = useState([]);
    const {course,editCourse} = useSelector((state)=>state.course);
    const {token} = useSelector((state)=>state.auth);

    const {
        register,
        setValue,
        getValues,
        formState: {errors},
        handleSubmit
    } = useForm();

    useEffect(() =>{
        
        const getAllCategory= async()=>{
            setLoading(true);
             const category = await fetchCourseCategories();
             if(category.length> 0){
                setShowCategory(category)
             }
            setLoading(false);
        }

        getAllCategory();
        console.log("categories are: ", showCategory);

        if(editCourse){
            setValue("courseTitle", course.courseName);
            setValue("courseDescription", course.courseDetail);
            setValue("Price", course.price);
            setValue("category", course.category);
            setValue("courseBenefits", course.whatWeWillLearn);
            setValue("courseTags", course.tags);
            setValue("courseImage", course.thumbnail);
            setValue("courseRequirements", course.instructions);
        }

    }, []);

    const isFormUpdate=()=>{

        const currentCourse = getValues();

        if(currentCourse.courseTitle !== course.courseTitle ||
            currentCourse.courseDescription !== course.courseDetail ||
            currentCourse.Price !== course.price ||
            currentCourse.category._id !== course.category._id ||
            currentCourse.courseBenefits !== course.whatWeWillLearn ||
            currentCourse.courseTags.toString() !== course.tags.toString() ||
            currentCourse.courseImage !== course.thumbnail ||
            currentCourse.courseRequirements.toString() !== course.instructions.toString()
        ){
            return true;
        }
        else return false;
    }

    const onsubmit = async(data)=>{

    console.log("data is : ", data);
      if(editCourse){  // edit course from course slice will be true after the first save of the course

        if(isFormUpdate()){

            const currentCourse = getValues();
            const formData = new FormData();

            formData.append("courseId", course._id);
            if(currentCourse.courseTitle !== course.courseTitle){
                formData.append("courseName", data.courseTitle);
            }
            if(currentCourse.courseDescription !== course.courseDetail){
                formData.append("courseDetail", data.courseDescription);
            }
            if(currentCourse.Price !== course.price){
                formData.append("price", data.Price);
            }
            if(currentCourse.category._id !== course.category._id){
                formData.append("category", data.category);
            }
            if(currentCourse.courseBenefits !== course.whatWeWillLearn){
                formData.append("whatWeWillLearn", data.courseBenefits);
            }
            if(currentCourse.courseTags.toString() !== course.tags.toString()){
                formData.append("tags", JSON.stringify(data.courseTags));
            }
            if(currentCourse.courseImage !== course.thumbnail){
                formData.append("thumbnail", data.courseImage);
            }
            if(currentCourse.courseRequirements.toString() !== course.instructions.toString()){
                formData.append("instructions", JSON.stringify(data.courseRequirements));
            }

            setLoading(true);
            const result = await editCourseDetails(formData, token);
            // console.log(" result is after edit is: ", result);
            setLoading(false);
            if(result){
                // console.log("inside the result is: ", result);
                dispatch(setStep(2));
                dispatch(setCourse(result));
            }
            
        }
        else{
            toast("No changes made yet");
        }

        return ;
      }

      const formData = new FormData();

      formData.append("courseName", data.courseTitle);
      formData.append("courseDetail", data.courseDescription);
      formData.append("price", data.Price);
      formData.append("category", data.category);
      formData.append("whatWeWillLearn", data.courseBenefits);
      formData.append("tags", JSON.stringify(data.courseTags));
      formData.append("thumbnail", data.courseImage);
      formData.append("instructions", JSON.stringify(data.courseRequirements));
      formData.append("status", COURSE_STATUS.DRAFT);


    // for (const [key, value] of formData.entries()) {
    //     console.log(key, value);
    //   }
      setLoading(true);
      console.log("BEFORE add course API call");
      console.log("PRINTING FORMDATA", formData.entries());
      const result = await addCourseDetails(formData,token);
      setLoading(false);
        if(result) {
            console.log("changes at step section");
            dispatch( setStep(2));
            dispatch(setEditCourse(true));
            dispatch(setCourse(result));
        }
       
        console.log("PRINTING FORMDATA", );
        console.log("PRINTING result", result);

    }

  return (
    <form className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
    onSubmit={handleSubmit(onsubmit)}
    >
            {/* course title */}
        <label className="flex flex-col space-y-2">
            <div className='text-md text-richblack-25 font-semibold'>
                Course Title <sup className="text-pink-200">*</sup>
            </div>
            <input
                id='courseTitle'
                type='text'
                name='courseTitle'
                placeholder='Enter Course Name'
                className='lg:w-[70%] bg-richblack-800 text-richblack-25 border border-richblack-700 rounded-lg py-1 px-2 text-lg  font-medium'
                {...register("courseTitle", {required:true})}
            />
            {errors.courseTitle && <p  className="ml-2 text-xs tracking-wide text-pink-200">courseTitle is required.</p>}
        </label>

            {/* course description */}
        <label className="flex flex-col space-y-2">
            <div className='text-md text-richblack-25 font-semibold'>
                Course Description <sup className="text-pink-200">*</sup>
            </div>
            <textarea
                id='courseDescription'
                name='courseDescription'
                placeholder='Enter Course Description'
                className='lg:min-w-[70%]  h-[120px] bg-richblack-800 text-richblack-25 border border-richblack-700 rounded-lg py-1 px-2 text-lg  font-medium'
                {...register("courseDescription", {required:true})}
            />
            {errors.courseDescription && <p className="ml-2 text-xs tracking-wide text-pink-200">courseDescription is required.</p>}
        </label>

            {/* course price */}
        <label className="flex flex-col space-y-2">
            <div className='text-md text-richblack-25 font-semibold'>
                Price <sup className="text-pink-200">*</sup>
            </div>
            <div className="relative" >
                <input
                    id='Price'
                    type='text'
                    name='Price'
                    className='lg:w-[70%] bg-richblack-800 border text-richblack-25  border-richblack-700 rounded-lg py-1 px-16 text-lg  font-medium'
                    placeholder='Enter Course Price'
                    {...register("Price", {
                        required:true,
                        valueAsNumber:true,
                        pattern: {
                            value: /^(0|[1-9]\d*)(\.\d+)?$/,
                        },
                    })}
                />
                {/* rupee icon */}
                <RiMoneyRupeeCircleLine className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
            </div>
            {errors.Price && <p className="ml-2 text-xs tracking-wide text-pink-200">Price is required.</p>}
        </label>

            {/* course category */}
        
                <div className="flex flex-col space-y-2">
                    <label className='text-md text-richblack-25 font-semibold'
                     htmlFor="category">Course Category<sup className="text-pink-200">*</sup></label>
                    <select
                        id="category"
                        defaultValue=""
                        className="lg:w-[70%] bg-richblack-800 border text-richblack-25 border-richblack-700 rounded-lg py-1 px-2 text-lg font-medium"
                        {...register("category", { required: true })}
                    >
                        <option value="" >Choose a Category</option>
                        {!loading && showCategory.map((category, index) => (
                        <option key={index} value={category?._id} >
                            {category?.categoryName}
                        </option>
                        ))}
                    </select>
                    {errors.courseCategory && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">Course Category is Required</span>
                    )}
                </div>

        {/* tags using common component */}
        <CourseTags
            label={"Course Tags"}
            name={"courseTags"}
            placeholder="Enter Tags and press Enter"
            setValue={setValue}
            errors={errors}
            register={register}
            getValues={getValues}
        />

        {/* image using common component */}
            <CourseImageUploader
                name="courseImage"
                label="Course Thumbnail"
                register={register}
                setValue={setValue}
                errors={errors}
                editData={editCourse ? course?.thumbnail : null}
            />
                
            {/* course benefits */}
        <label className="flex flex-col space-y-2">
            <div className='text-md text-richblack-25 font-semibold' >
                Benefits of course <sup className="text-pink-200">*</sup>
                </div>
                <textarea
                    id='courseBenefits'
                    type='text'
                    className='lg:w-[70%] h-[120px] bg-richblack-800 text-richblack-25 border resize-x-none min-h-[130px] w-full border-richblack-700 rounded-lg py-1 px-2 text-lg  font-medium'
                    name='courseBenefits'
                    placeholder="Enter benefits of the course"
                    {...register("courseBenefits", {required:true})}
                />
                {errors.courseBenefits && <p className="ml-2 text-xs tracking-wide text-pink-200">courseBenefits is required.</p>}
        </label>

        {/* requirements/ instructions */}
                
            <CourseRequirements
                name={"courseRequirements"}
                label={"Requirements/Instructions"}
                setValue={setValue}
                errors={errors}
                register={register}
            />
            {/* buttons countinue without saving & save change || next */}
            <div className="flex justify-end gap-x-2">

                  {
                    editCourse && (
                        <button 
                            onClick={()=>{dispatch(setStep(2))}}
                         disabled={loading}
                         className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
                        >
                        countinue without saving
                        </button>
                    )
                  }
                 
                 <IconBtn
                 disabled={loading}
                 customCLass={"flex cursor-pointer items-center gap-x-2 rounded-md bg-yellow-50 py-[8px] px-[20px] font-semibold text-richblack-900 "}
                 text={!editCourse ? ("next") : ("save change")}
                 />
            </div>

        </form>
  )
}

export default CourseInformationForm