import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn'
import { IoAddCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowRightLong } from "react-icons/fa6";
import { setCourse, setEditCourse, setStep } from '../../../../../features/courseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseApi';

const CreateSection = () => {

    const {
      register,
      setValue,
      getValues,
      formState: {errors},
      handleSubmit,
      watch
    } = useForm();

    const {course} = useSelector((state)=>state.course);
    const dispatch = useDispatch();

    const [editSectionName, setEditSectionName] = useState(false);
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

      if(course?.courseContent?.length === 0){
        toast.error("Add atleast one section");
        return;
      }
      if(course?.courseContent.some((section)=>section.subSection.length===0)){
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


  return (
    <div>

<form className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
      onSubmit={handleSubmit(onSubmit)}
    >

      <h2>Course Builder</h2>

      <div>
            
            <label  htmlFor='sectionName'>
                Section Name <sup>*</sup>
            </label>

            <input
              type='text'
              id='sectionName'
              placeholder='Add a Section Name'
              {...register("sectionName",{
                required:true
              })}
              className='w-full'
            />
            {
              errors.sectionName && <p>Section name is required</p>
            }
      </div>
      <div className='mt-10 flex w-full'>
            <IconBtn
            type={"submit"}
            text={editSectionName ? ("Edit section name") : ("Create section name")}
            outline={true}
            customCLass={"text-richblack-50 bg-yellow-50"}
            >
              <IoAddCircleOutline className='bg-yellow-50 text-yellow-5' size={20} /> 
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
                <NestedView/>
              )
            }

            <div className='flex justify-end gap-x-4'>
                <button
                onClick={goBack}
                className='text-richblack-50 bg-richblack-600 py-1 px-3 rounded-md'
                >
                    back
                </button>

                <IconBtn
                text={"Next"}
                onclick={goToNext}
                >
                    <FaArrowRightLong/>
                </IconBtn>
            </div>

    </div>
  )
}

export default CreateSection