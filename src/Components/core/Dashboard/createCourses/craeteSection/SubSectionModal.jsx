import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../../common/IconBtn';
import { RxCross2 } from 'react-icons/rx';
import toast from 'react-hot-toast';
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseApi';
import { setCourse } from '../../../../../features/courseSlice';
import CourseImageUploader from '../Addcourses/CourseImageUploader';

const SubSectionModal = ({
    modalData,
    setModalData,
    add=false,
    edit=false,
    view= false
}) => {

    const  {
        register,
        setValue,
        getValues,
        formState: {errors},
        handleSubmit
    } = useForm()

    const [loading,setLoading] = useState(false);

    const dispatch = useDispatch();
    const {token} = useSelector((state)=>state.auth);
    const {course} = useSelector((state)=>state.course);



    useEffect(()=>{


        if(view || edit){
            setValue("lectureTitle", modalData.title);
            setValue("lectureDesc", modalData.videoDetail);
            setValue("lectureVideo", modalData.video);
        }
    },[])

    const isFormUpdated= ()=>{

        const currentValue = getValues();

        if(currentValue.lectureTitle !== modalData.title ||
            currentValue.lectureDesc !==  modalData.videoDetail ||
            currentValue.lectureVideo !== modalData.video
        ){
            return true;
        }
        else{
            return false;
        }
    }

    const handleEditSubSection= async()=>{

        const currentValue = getValues();
        const formData = new FormData();

        formData.append("sectionId", modalData.sectionId);
        formData.append("subSectionId", modalData._id);

        if(currentValue.lectureDesc !== modalData.videoDetail){
            formData.append("videoDetail",currentValue.lectureDesc );
        }
        if(currentValue.lectureTitle !== modalData.title){
            formData.append("title",currentValue.lectureTitle );
        }
        if(currentValue.lectureVideo !== modalData.video){
            formData.append("video",currentValue.lectureVideo );
        }

        setLoading(true);
        const result = await updateSubSection(formData,token);

        if(result){

            const updatedSection = course.courseContent.map((section)=>
            section._id === modalData.sectionId ? result : section);

            const updatedCourse = {...course, courseContent:updatedSection};
            dispatch(setCourse(updatedCourse));
        }

        setModalData(null);
        setLoading(false);

    }

    const onsubmit = async(data)=>{
        
        if(view){
            return;
        }
        if(edit){

            if(isFormUpdated()){
                // edit the subsection
                handleEditSubSection();
            }
            else{
                toast.error("No updation made yet");
            }
            return;
        }

        const formData = new FormData();
        formData.append("sectionId", modalData);
        formData.append("title", data.lectureTitle);
        formData.append("videoDetail", data.lectureDesc);
        formData.append("video", data.lectureVideo);

        setLoading(true);
        // create the data in database
        const result = await createSubSection(formData,token);
        console.log("result of subsection : ", result);
        
        if(result){
            const updatedSection = course.courseContent.map((section)=>
            section._id === modalData ? result : section);

            const updatedCourse = {...course, courseContent:updatedSection};
            dispatch(setCourse(updatedCourse));
        }

        setLoading(false);
        setModalData(null);
    }


  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">

            <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">

                   <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
                   <h2  className="text-xl font-semibold text-richblack-5 ">{view ? ("Viewing") : edit ? ("Editing") : add ? ("Adding") : ("")} Lecture</h2>

                        <button
                        onClick={()=>(!loading ? setModalData(null) : {})}
                        >
                            <RxCross2 className="text-2xl text-richblack-5"/>
                        </button>
                   </div>

                   <form onSubmit={handleSubmit(onsubmit)}
                     className="space-y-8 px-8 py-10"
                   >
                            
                            <CourseImageUploader
                                name={"lectureVideo"}
                                label={"Lecture Video"}
                                register={register}
                                setValue={setValue}
                                errors={errors}
                                video={true}
                                viewData={view ? modalData?.video : null}
                                editData={edit? modalData?.video : null}
                            />

                            <div className="flex flex-col space-y-2">

                                    <label htmlFor='title' className="text-sm text-richblack-5">Lecture Title {!view && <sup className="text-pink-200">*</sup>}</label>
                                    <input
                                        id='title'
                                        name='title'
                                        placeholder='Enter Lecture Name'
                                        className='w-full bg-richblack-800 border text-richblack-25  border-richblack-700 rounded-lg py-1 px-6 text-lg  font-medium'
                                        {...register("lectureTitle",{required:true})}
                                    />
                                    {
                                        errors.lectureTitle && (<span className="ml-2 text-xs tracking-wide text-pink-200">Title is required</span>)
                                    }
                            </div>

                            <div className="flex flex-col space-y-2">
                                <label htmlFor='lectureDesc' className="text-sm text-richblack-5" >Lecture Description
                                {!view && <sup className="text-pink-200">*</sup>}
                                </label>
                                <textarea
                                    id='lectureDesc'
                                    name='lectureDesc'
                                    placeholder='Enter Lecture Description'
                                    className='w-full bg-richblack-800 border text-richblack-25 min-h-[130px]  border-richblack-700 rounded-lg py-1 px-4 text-lg  font-medium'
                                    {...register("lectureDesc",{required:true})}
                                />
                                {
                                    errors.lectureDesc && (<span className="ml-2 text-xs tracking-wide text-pink-200">description is required</span>)
                                }
                            </div>

                            {
                                !view && (
                                  <div>
                                        <IconBtn
                                            text={loading ? "loading..." : edit ? "save changes" : "save"}
                                            customCLass={"bg-yellow-50 text-richblack-500 text-xl flex items-center  rounded-md  px-3 py-1"}
                                            type={"submit"}
                                        />
                                  </div>
                                )
                            }
                   </form>
            </div>

    
    </div>
  )
}

export default SubSectionModal