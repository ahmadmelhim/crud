import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast, Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Create() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const RegisterForm = async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BURL}/users`, data);
      if (response.status === 201) {
        toast.success('User added successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to add user!', {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit(RegisterForm)}>
        <div className="form-floating mb-3">
          <input {...register("userName")} type="text" className="form-control" id="userName" placeholder />
          <label htmlFor="userName">User Name</label>
        </div>

        <div className="form-floating mb-3">
          <input {...register("email")} type="email" className="form-control" id="email" placeholder />
          <label htmlFor="email">User Email</label>
        </div>

        <div className="form-floating mb-3">
          <input {...register("password")} type="password" className="form-control" id="password" placeholder />
          <label htmlFor="password">User Password</label>
        </div>

        <div className="form-floating mb-3">
          <input {...register("phone")} type="text" className="form-control" id="phone" placeholder />
          <label htmlFor="phone">User Phone</label>
        </div>

        <button type='submit' className='btn btn-outline-primary'>Register</button>
      </form>
    </div>
  );
}
