import React, {useEffect, useState} from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../../common/IconBtn';
import { resetCourseState, setStep } from '../../../../../features/courseSlice';
import { COURSE_STATUS } from '../../../../../utils/constant';
import { useNavigate } from 'react-router-dom';
import { editCourseDetails } from '../../../../../services/operations/courseApi';

const PublishCourse = () => {

    const {register, setValue, getValues,handleSubmit} = useForm();
    const {course} = useSelector((state)=>state.course);
    const  dispatch = useDispatch();
    const {token} = useSelector((state)=>state.auth);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        if(course?.status === COURSE_STATUS.PUBLISHED){
            setValue("publish",true);
        }
    },[])

    const goBack=()=>{
        dispatch(setStep(2));
    }

    const goToCourse=()=>{

        dispatch(resetCourseState());
        // navigate("/dashboard/my-courses")
    }

    const handleCoursePublish= async()=>{

        if(course?.status === COURSE_STATUS.PUBLISHED && getValues("publish")===true || 
            course?.status === COURSE_STATUS.DRAFT && getValues("publish") === false){

                goToCourse();
                return;
            }

        // if course is updated
        const formData = new FormData();
        formData.append("courseId", course._id);
        const courseStatus = getValues("publish") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT ;
        formData.append("status",courseStatus);

        setLoading(true);
        const result = await editCourseDetails(formData,token);

        if(result){
            goToCourse();
        }

        setLoading(false);

    }

    const onSubmit=()=>{
        // need to values of publish
        handleCoursePublish();
    }


  return (
    <div className='p-6 bg-richblack-800 border border-richblack-700 rounded-md text-richblack-25'>
        <p>Publish Course</p>

        <form onSubmit={handleSubmit(onSubmit)}>

            <div>

                <label htmlFor='publish' className='flex gap-x-5  items-center'>
                    <input
                        type='checkbox'
                        id='publish'
                        className='rounded-full w-4 aspect-square'
                        {...register("publish")}
                    />
                    <span>Make this course as Public</span>
                </label>
            </div>

            <div className='flex gap-x-4 items-center '>

                    <button
                    type='button'
                    className='text-md text-richblack-25  bg-richblack-500 px-4 py-1'
                    onClick={goBack}
                    >
                        Back
                    </button>

                    <IconBtn
                        type={"submit"}
                        text={"Save Changes"}
                        disabled={loading}
                        customCLass={"px-4 py-1 bg-yellow-5  text-richblack-50 text-md"}
                    />
            </div>
        </form>

    </div>
  )
}

export default PublishCourse