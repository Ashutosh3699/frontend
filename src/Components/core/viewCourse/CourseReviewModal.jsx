import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import IconBtn from '../../common/IconBtn';
import { createRating } from '../../../services/operations/courseApi';

const CourseReviewModal = ({setReviewModal}) => {

  const {user} = useSelector((state)=>state.profile);
  const {token} = useSelector((state)=>state.auth);
  const {courseEntireData} = useSelector((state)=>state.viewCourse);

  const {register,
    handleSubmit,
    formState:{errors},
    setValue
  } = useForm();

  useEffect(()=>{

    setValue("courseExperience", "");
    setValue("courseRating", 0);
  },[])

  const onSubmit= async(data)=>{

    await createRating(
      {
        courseId: courseEntireData._id,
        rating:data.courseRating,
        review: data.courseExperience
      },
      token
    );

    setReviewModal(false);
  }

  const ratingChanged=(newRating)=>{
    setValue("courseRating", newRating);
  }

  return (
    <div  className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">

      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
          {/* header */}
            <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
                <h3 className="text-xl font-semibold text-richblack-5">Add Review</h3>
                <button
                onClick={()=>setReviewModal(false)}
                >
                  Close
                </button>
            </div>

            {/* content */}
            <div  className="p-6">

                {/* profile image */}
                <div className="flex items-center justify-center gap-x-4">
                    <img
                      src={user?.image}
                      alt='profile-image'
                      className="aspect-square w-[50px] rounded-full object-cover"
                    />
                    <div>
                       <p className="font-semibold text-richblack-5">{user?.firstName} {user?.lastName}</p>
                       <p className="text-sm text-richblack-5">Posting Publicly</p>
                    </div>

                </div>

                                    
                <form
                onSubmit={handleSubmit(onSubmit)}
               className="mt-6 flex flex-col items-center"
                >
                    
                    <ReactStars
                      count={5}
                      onChange={ratingChanged}
                      size={24}
                      activeColor="#ffd700"
                    />

                    <div className="flex w-11/12 flex-col space-y-2">
                       <label  htmlFor='courseExperience' className="text-sm text-richblack-5">Add your courseExperience</label>

                       <textarea
                       id='courseExperience'
                       placeholder='Add your experience'
                       {...register("courseExperience", {required:true})}
                      className="form-style resize-x-none min-h-[130px] w-full"

                      />
                      {
                        errors.courseExperience && (<p>Add exp required</p>)
                      }

                    </div>

                    {/* buttons */}
                    <div className="mt-6 flex w-11/12 justify-end gap-x-2">

                        <button
                        onClick={()=>setReviewModal(false)}
                        className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
                        >
                          cancel
                        </button>

                        <IconBtn
                          type={"submit"}
                          text={"save"}
                        />
                    </div>
                </form>
            </div>

      </div>
    
    </div>
  )
}

export default CourseReviewModal