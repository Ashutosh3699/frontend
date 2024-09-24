import React, {useState} from 'react'
import {  useSelector } from 'react-redux';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { COURSE_STATUS } from '../../../../utils/constant';
import ConfirmationModal from '../../../common/ConfirmationModal';
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseApi';
import { useNavigate } from 'react-router-dom';

const CoursesTable = ({courses,setCourses}) => {

    const {token} = useSelector((state)=>state.auth);
    const [loading,setLoading] = useState(false);
    const [confirmationModal,setConfirmationModal] = useState(null);
    const navigate = useNavigate();

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


  return (
    <div>
        <Table>
                <Thead>
                    <Tr>
                            <Th>
                                Courses
                            </Th>
                            <Th>
                                Duration
                            </Th>
                            <Th>
                                Price
                            </Th>
                            <Th>
                                Actions
                            </Th>

                    </Tr>
                </Thead>
                <Tbody>
                    {
                        courses.length===0 ? (
                            <Tr>
                                <Td>
                                    No courses Found
                                </Td>
                            </Tr>
                        ) : (
                                courses?.map((course)=>(
                                    <Tr key={course._id}>
                                        <Td className='flex gap-x-10  border-richblack-300 p-8'>
                                            <img
                                                src={course?.thumbnail}
                                                className='w-[220px]  h-[150px] rounded-lg object-cover'
                                            />

                                            <div className='flex flex-col '>
                                                <p>{course?.courseName}</p>
                                                <p>{course?.courseDetail}</p>
                                                <p>Created at: </p>
                                                {
                                                    course?.status=== COURSE_STATUS.DRAFT ? (
                                                        <p className='text-pink-100'>Drafted</p>
                                                    ) : (
                                                        <p className='text-yellow-200'>Published</p>
                                                    )
                                                }
                                            </div>
                                        </Td>

                                        <Td>
                                             2hr 30 min
                                        </Td>

                                        <Td>
                                            {course?.price}
                                        </Td>

                                        <Td >
                                                
                                                <button
                                                disabled={loading}
                                                className='mr-4'
                                                onClick={()=>{navigate(`/dashboard/edit-course/${course._id}`)}}
                                                >
                                                    Edit
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
                                                >
                                                    Delete
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