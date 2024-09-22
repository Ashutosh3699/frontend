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
    <div>

            <div>

                   <div>
                   <h2>{view ? ("Viewing") : edit ? ("Editing") : add ? ("Adding") : ("")} Lecture</h2>

                        <IconBtn
                        onclick={()=>(!loading ? setModalData(null) : {})}
                        >
                            <RxCross2/>
                        </IconBtn>
                   </div>

                   <form onSubmit={handleSubmit(onsubmit)}>
                            
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

                            <div>

                                    <label htmlFor='title'>Lecture Title</label>
                                    <input
                                        id='title'
                                        name='title'
                                        placeholder='Enter Lecture Name'
                                        className='w-full'
                                        {...register("lectureTitle",{required:true})}
                                    />
                                    {
                                        errors.lectureTitle && (<span>Title is required</span>)
                                    }
                            </div>

                            <div>
                                <label htmlFor='lectureDesc'>Lecture Description</label>
                                <textarea
                                    id='lectureDesc'
                                    name='lectureDesc'
                                    placeholder='Enter Lecture Description'
                                    className='w-full min-h-[130px]'
                                    {...register("lectureDesc",{required:true})}
                                />
                                {
                                    errors.lectureDesc && (<span>description is required</span>)
                                }
                            </div>

                            {
                                !view && (
                                  <div>
                                        <IconBtn
                                            text={loading ? "loading..." : edit ? "save changes" : "save"}
                                            customCLass={"bg-yellow-50 text-richblack-400 px-3 py-1"}
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