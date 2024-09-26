import React, {useState} from 'react'
import {  useSelector } from 'react-redux';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { COURSE_STATUS } from '../../../../utils/constant';
import ConfirmationModal from '../../../common/ConfirmationModal';
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseApi';
import { useNavigate } from 'react-router-dom';
import { HiClock } from 'react-icons/hi';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaCheck } from 'react-icons/fa';
import toast from 'react-hot-toast';

const CoursesTable = ({courses,setCourses}) => {

    const {token} = useSelector((state)=>state.auth);
    const [loading,setLoading] = useState(false);
    const [confirmationModal,setConfirmationModal] = useState(null);
    const navigate = useNavigate();
    const [selectedCourse, setSelectedCourse] = useState([]);
    const [addCourse,setAddCourse] = useState(false);

    const handleCourseDelete=async(courseId)=>{

        setLoading(true);

        await deleteCourse({courseId:courseId},token);
        const  result = await fetchInstructorCourses(token);
        if(result){
            setCourses(result);
        }

        setConfirmationModal(null);
        setLoading(false);
    };

    const addCourseFunction=()=>{
        if(addCourse){
            setAddCourse(false);
            setSelectedCourse([]);
        }else{
            setAddCourse(true);
            setSelectedCourse([]);
        }
    }


    const clickHandlerFunction=(courseId)=>{     
        const response = selectedCourse.filter((item)=>item===courseId);
        if(response.length!==0){
            const res = selectedCourse.filter((item)=>item !== courseId);
            setSelectedCourse(res);
        }else{
            setSelectedCourse([...selectedCourse,courseId]);
        }
    }

    const handleAllCourseDelete= async()=>{

        if(selectedCourse.length===0){
            toast.error("No course is selected");
            return;
        }

        setLoading(true);
        for (const courseId of selectedCourse) {
            console.log("course id is: ", courseId);
            await deleteCourse({courseId:courseId},token);
        }

        const  result = await fetchInstructorCourses(token);
        if(result){
            setCourses(result);
        }

        setConfirmationModal(null);
        setLoading(false);
    }



  return (
    <div>  
        <div className='flex gap-9'>
            <button className='text-white  '
            onClick={()=>addCourseFunction()}
            >
                Delete multiple
            </button>

            {
                selectedCourse.length !== 0 && (<button 
            disabled={loading}
            onClick={()=>setConfirmationModal({
                text1:"Do you want to delete ALL this course",
                text2:"All the data related to this courses will be deleted",
                btn1text:"Delete All",
                btn2text:"cancel",
                btn1Handler: !loading ? ()=>handleAllCourseDelete() : ()=>{},
                btn2Handler: !loading ? ()=>setConfirmationModal(null) :()=>{},

            })}
            title="Delete All"
            className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000] flex gap-x-2"
            >
                    <span>Delete All</span>  <RiDeleteBin6Line size={20} />
            </button>)
            }

        </div>
        <Table className="rounded-xl border border-richblack-800 ">
                <Thead>
                    <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
                            <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
                                Courses
                            </Th>
                            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                                Duration
                            </Th>
                            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                                Price
                            </Th>
                            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                                Actions
                            </Th>

                    </Tr>
                </Thead>
                <Tbody>
                    {
                        courses.length===0 ? (
                            <Tr>
                                <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                                    No courses Found
                                </Td>
                            </Tr>
                        ) : (
                                courses?.map((course)=>(
                                    <Tr key={course._id}
                                     className="flex gap-x-10 border-b border-richblack-800 px-6 py-8"
                                    >
                                        <Td  className="flex flex-1 gap-x-4">
                                            {
                                                addCourse && <input
                                                    type='checkbox'
                                                    onClick={()=>clickHandlerFunction(course._id)}
                                                />     
                                            }
                                            <img
                                                src={course?.thumbnail}
                                               className="h-[148px] w-[220px] rounded-lg object-cover"
                                            />

                                            <div className="flex flex-col justify-between">
                                                <p className="text-lg font-semibold text-richblack-5">{course?.courseName}</p>
                                                <p className="text-xs text-richblack-300">{course?.courseDetail}</p>
                                                <p>Created at: </p>
                                                {
                                                    course?.status=== COURSE_STATUS.DRAFT ? (
                                                        <p  className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 
                                                        px-2 py-[2px] text-[12px] font-medium text-pink-100">
                                                         <HiClock size={14} />
                                                        Drafted</p>
                                                    ) : (
                                                        <div className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                                                            <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                                                            <FaCheck size={8} />
                                                            </div>
                                                            Published
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </Td>

                                        <Td className="text-sm font-medium text-richblack-100">
                                             2hr 30 min
                                        </Td>

                                        <Td className="text-sm font-medium text-richblack-100">
                                            ₹{course?.price}
                                        </Td>

                                        <Td >
                                                
                                                <button
                                                disabled={loading}
                                                  title="Edit"
                                                    className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                                                onClick={()=>{navigate(`/dashboard/edit-course/${course._id}`)}}

                                                >
                                                   <FiEdit2 size={20} />
                                                </button>

                                                <button 
                                                disabled={loading}
                                                onClick={()=>setConfirmationModal({
                                                    text1:"Do you want to delete this course",
                                                    text2:"All the data related to this course will be deleted",
                                                    btn1text:"Delete",
                                                    btn2text:"cancel",
                                                    btn1Handler: !loading ? ()=>handleCourseDelete(course._id) : ()=>{},
                                                    btn2Handler: !loading ? ()=>setConfirmationModal(null) :()=>{},

                                                })}
                                                title="Delete"
                                                className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                                                >
                                                     <RiDeleteBin6Line size={20} />
                                                </button>
                                        </Td>
                                    </Tr>
                                ))
                        )
                    }
                </Tbody>
        </Table>

        {
            confirmationModal && <ConfirmationModal  modalData={confirmationModal}/> 
        }
    </div>
  )
}

export default CoursesTable