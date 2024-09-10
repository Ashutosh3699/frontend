import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {DeleteAccount} from "../../../services/operations/profileApi"

const DeleteProfile = () => {
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();

    const deleteHandler=()=>{

        dispatch(DeleteAccount(token))
    }
    
  return (
    <>
        <h3>Delete Account</h3>

        <button onClick={deleteHandler}>Delete</button>
    </>
  )
}

export default DeleteProfile