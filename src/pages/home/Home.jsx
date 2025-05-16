import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../components/loader/Loader';

export default function Home() {
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUsers = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BURL}/users`);
      setUsers(data.users);
    } catch (e) {
      console.error(e.response?.status);
      if (e.response?.status === 404) {
        setError("Page not Found");
      } else {
        setError("Something went wrong while fetching users.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const deleteUser = async (id)=>{
    const response =await axios.delete(`${import.meta.env.VITE_BURL}/users/${id}`);
    if (response.status == 200){
      toast.success('User Deleted', {
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
      const newUser=users.filter(user=>user._id != id);
      setUsers(newUser);
    }
  }
  useEffect(() => {
    getUsers();
  }, []);

  if (isLoading) {
    return <Loader/>
  }

  if (error) {
    return <div className='text-danger'>{error}</div>;
  }

  return (
    <div>
      <h2>Users List</h2>
      <table className='table table-striped table-bordered border-primary'>
        <thead>
          <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>
                <Link to={`/details/${user._id}`} className='btn btn-outline-primary'>Details</Link>

                <button onClick={()=>deleteUser(user._id)}className='btn btn-outline-danger'>Delete</button>

                <Link to={`/edit/${user._id}`} className='btn btn-outline-info'>Edit</Link>

              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
