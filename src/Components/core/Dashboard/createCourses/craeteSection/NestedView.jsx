import React, { useState } from 'react'
import { BiSolidDownArrow } from 'react-icons/bi';
import { MdAddBox, MdEdit } from 'react-icons/md';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { RxDropdownMenu } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux'
import ConfirmationModal from '../../../../common/ConfirmationModal';
import SubSectionModal from './SubSectionModal';
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseApi';
import { setCourse } from '../../../../../features/courseSlice';


const NestedView = ({handleChangeSectionName}) => {

    const {course} = useSelector((state)=>state.course);
    const {token} = useSelector((state)=>state.auth);

    const [addSubSection,setAddSubSection] = useState(null);
    const [editSubSection,setEditSubSection] = useState(null);
    const [viewSubSection,setViewSubSection] = useState(null);

    const [confirmationModal,setConfirmationModal] = useState(null);
    const dispatch = useDispatch();

    const handleDeleteSection= async(sectionId)=>{

      const result = await deleteSection({
        sectionId: sectionId,
        courseId: course._id
      },token);

      if(result){
        const updatedSection = course.courseContent.map((section)=>
          section._id === sectionId ? result : section);
          const updatedCourse = {...course, courseContent:updatedSection};

          dispatch(setCourse(updatedCourse));
      }

      setConfirmationModal(null);
    }

    const handleDeleteSubSection= async(subSectionId, sectionId)=>{

      const result = await deleteSubSection({
        sectionId:sectionId,
        subSectionId: subSectionId
      },token);

      if(result){

          const updatedSection = course.courseContent.map((section)=>
          section._id === sectionId ? result : section);
          const updatedCourse = {...course, courseContent:updatedSection};

          dispatch(setCourse(updatedCourse));
      }

      setConfirmationModal(null);
    }


  return (
    <div>
    
        <div className='rounded-lg bg-richblack-700 p-6 px-8'>

                {course?.courseContent?.map((section)=>(
                    
                    <details key={section?._id} open>

                                <summary className='flex justify-between items-center border
                                         border-richblack-500  px-5 py-2 border-b-4 border-b-richblack-200 rounded-lg '>
                                        <div className='flex justify-between items-center gap-x-3 '>
                                                <RxDropdownMenu/>
                                                <p>{section?.sectionName}</p>
                                        </div>
                                        <div className='flex items-center'>

                                            <button 
                                            onClick={()=>(handleChangeSectionName(section?._id , section?.sectionName))}
                                            >
                                                <MdEdit/>
                                            </button>

                                            <button
                                            onClick={()=>{
                                              setConfirmationModal({
                                                text1: "Delete this section",
                                                text2: "Are you sure, you want to delete this section",
                                                btn1Handler: ()=>{handleDeleteSection(section?._id)},
                                                btn2Handler: ()=>{setConfirmationModal(null)},
                                                btn1text: "delete",
                                                btn2text:"cancel"
                                              })
                                            }}
                                            >
                                                <RiDeleteBin2Fill/>
                                            </button>

                                            <span>|</span>

                                            <BiSolidDownArrow  className='text-xl text-richblack-100 '/>
                                        </div>
                                </summary>

                                    <div>
                                            
                                            {
                                              section.videoUrl?.map((data)=>(
                                                <div
                                                key={data._id}
                                                onClick={()=>setViewSubSection(data)}
                                                className='flex justify-between items-center gap-x-3  border-b-2 border-richblack-300'
                                                >
                                                    <div className='flex justify-between items-center gap-x-3 '>
                                                          <RxDropdownMenu/>
                                                          <p>{data?.title}</p>
                                                  </div>

                                                    <div className='flex items-center'
                                                    onClick={(e)=>e.stopPropagation()}
                                                    >
                                                      <button 
                                                        onClick={()=>setEditSubSection({...data, sectionId:section?._id})}
                                                        >
                                                            <MdEdit/>
                                                      </button>

                                                      <button
                                                        onClick={()=>{
                                                          setConfirmationModal({
                                                            text1: "Delete this sub section",
                                                            text2: "Are you sure, you want to delete this sub section",
                                                            btn1Handler: ()=>{handleDeleteSubSection(data?._id,section?._id)},
                                                            btn2Handler: ()=>{setConfirmationModal(null)},
                                                            btn1text: "delete",
                                                            btn2text:"cancel"
                                                          })
                                                        }}
                                                        >
                                                            <RiDeleteBin2Fill/>
                                                      </button>
                                                  </div>

                                                </div>
                                              ))
                                            }
                                    </div>

                                    <button 
                                    onClick={()=>setAddSubSection(section._id)}
                                    className='mt-4 flex items-center bg-yellow-5  text-richblack-100 gap-x-2'
                                    >
                                            <MdAddBox/>
                                            <p>Add lecture</p> 
                                    </button>

                    </details>
                ))}
        </div>


                {
                  addSubSection ? (<SubSectionModal
                    modalData = {addSubSection}
                    setModalData = {setAddSubSection}
                    add = {true}
                  />) : 
                  editSubSection ? ( <SubSectionModal
                    modalData={editSubSection}
                    setModalData= {setEditSubSection}
                    edit={true}
                  />)  : 
                  viewSubSection ? (<SubSectionModal
                    modalData={viewSubSection}
                    setModalData={setViewSubSection}
                    view = {true}
                  />) :
                  <div></div>
                  
                }

                {
                  confirmationModal ? (<ConfirmationModal  modalData={confirmationModal}/>) : (<div></div>)
                }
    
    </div>
  )
}

export default NestedView