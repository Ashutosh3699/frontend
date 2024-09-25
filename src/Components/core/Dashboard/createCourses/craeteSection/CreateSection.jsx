import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn'
import { IoAddCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowRightLong } from "react-icons/fa6";
import { setCourse, setEditCourse, setStep } from '../../../../../features/courseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseApi';
import NestedView from './NestedView';

const CreateSection = ( ) => {

    const {
      register,
      setValue,
      formState: {errors},
      handleSubmit,
    } = useForm();

    const {course} = useSelector((state)=>state.course);
    // console.log("course is:",course);
    const dispatch = useDispatch();

    const [editSectionName, setEditSectionName] = useState(null);
    const [loading,setLoading] = useState(false);
    const {token} = useSelector((state)=>state.auth);


    const cancelEdit=()=>{

      setEditSectionName(null);
      setValue("sectionName", "");
    }

    const  goBack=()=>{
      dispatch(setStep(1));
      dispatch(setEditCourse(true));
    }

    const goToNext=()=>{

      // console.log("courses is: ", course);
      if(course?.courseContent.length === 0){
        toast.error("Add atleast one section");
        return;
      }
      if(course?.courseContent.some((section)=>section.videoUrl.length===0)){
        toast.error("Add suSection ");
        return;
      }

      dispatch(setStep(3));
    }

    const onSubmit= async(data)=>{

      setLoading(true);
      let result;

        if(editSectionName){
              result = await updateSection({
                sectionName: data.sectionName,
                sectionId: editSectionName,
                courseId:course._id
              }, token);
          }
          else{
            result = await createSection({
              sectionName: data.sectionName,
              courseId: course._id,
            },token)
        }

        if(result){
          dispatch(setCourse(result));
          setEditSectionName(null);
          setValue("sectionName", "");
        }

        setLoading(false);

    }

    const handleChangeSectionName = (sectionId,sectionName)=>{

      if(editSectionName === sectionId){
        cancelEdit();
        return;
      }

      setEditSectionName(sectionId);
      setValue("sectionName", sectionName);
    }


  return (
    <div className="space-y-8 rounded-md border-[1px] text-richblack-25  border-richblack-700 bg-richblack-800 p-6">
          <h2 className="text-2xl font-semibold text-richblack-5">Course Builder</h2>
        <form 
              onSubmit={handleSubmit(onSubmit)}
               className="space-y-4"
            >

              <div className="flex flex-col space-y-2">
                    
                    <label  htmlFor='sectionName' className="text-sm text-richblack-5">
                        Section Name <sup className="text-pink-200">*</sup>
                    </label>

                    <input
                      type='text'
                      id='sectionName'
                      placeholder='Add a Section Name'
                      {...register("sectionName",{
                        required:true
                      })}
                      className='w-full bg-richblack-800 border text-richblack-25  border-richblack-700 rounded-lg py-1 px-16 text-lg  font-medium'
                    />
                    {
                      errors.sectionName && <p className="ml-2 text-xs tracking-wide text-pink-200">Section name is required</p>
                    }
              </div>
              <div className="flex items-end gap-x-4">
                    <IconBtn
                    disabled={loading}
                    type={"submit"}
                    text={editSectionName ? ("Edit section name") : ("Create section name")}
                    outline={true}
                    customCLass={"text-richblack-25  bg-yellow-50 flex flex-row  gap-3 px-4 py-2 rounded-md"}
                    >
                      <IoAddCircleOutline className=' text-yellow-5' size={20} /> 
                    </IconBtn>

                    {
                      editSectionName && <button
                      type='button'
                      onClick={cancelEdit}
                      className='text-md text-richblack-100 underline'
                      >
                        cancel edit
                      </button>
                    }
              </div>

            </form>

            {
              course.courseContent?.length > 0  && (
                <NestedView  handleChangeSectionName={handleChangeSectionName} />
              )
            }

            <div className='flex justify-end gap-x-4'>
                <button
                disabled={loading}
                onClick={goBack}
                className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
                >
                    back
                </button>

                <IconBtn
                disabled={loading}
                text={"Next"}
                onclick={goToNext}
                customCLass={"text-richblack-800 px-4 py-1 bg-yellow-50 rounded-md flex gap-1 item-center"}
                >
                    <FaArrowRightLong/>
                </IconBtn>
            </div>

    </div>
  )
}

export default CreateSection