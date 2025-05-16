import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Details() {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getDetails = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BURL}/users/${userId}`);
      setUser(data.user);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to load user details.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div className="container">
      <h2>User Details</h2>
      <h3>Name is: {user.userName}</h3>
      <h3>Email is: {user.email}</h3>
      <h3>Phone is: {user.phone}</h3>
    </div>
  );
}
