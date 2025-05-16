import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Edit() {
    const {register,handleSubmit,setValue} = useForm();
    const {userId} = useParams();
    const navigate = useNavigate();
    const getDetails = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_BURL}/users/${userId}`);
        setValue("userName",data.user.userName);
        setValue("email",data.user.email);
        setValue("phone",data.user.phone);
    }
        useEffect(()=>{
            getDetails();
        },[])
        const UpdateForm = async (value)=>{
            const {data}=await axios.put(`https://node-react-10.onrender.com/users/${userId}`,{userName:value.userName});
            navigate('/');
        }
        console.log(userId);
  return (
    <div>
        <h1>Edit Form</h1>
        <form onSubmit={handleSubmit(UpdateForm)}>
        <div className="form-floating mb-3">
          <input {...register("userName")} type="text" className="form-control" id="userName" placeholder />
          <label htmlFor="userName">User Name</label>
        </div>

        <div className="form-floating mb-3">
          <input {...register("email")} type="email" className="form-control" id="email" placeholder disabled />
          <label htmlFor="email">User Email</label>
        </div>

        <div className="form-floating mb-3">
          <input {...register("phone")} type="text" className="form-control" id="phone" placeholder disabled />
          <label htmlFor="phone">User Phone</label>
        </div>

        <button type='submit' className='btn btn-outline-primary'>Update</button>
      </form>
    </div>
  )
}
