import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAtoken, backendUrl } = useContext(AdminContext);
  const navigate = useNavigate();

  const onsubmitHandler = async (event) => {
    event.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      toast.error('Please enter both email and password');
      return;
    }

    try {
      const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
        email: trimmedEmail,
        password: trimmedPassword,
      });

      if (data.success){
        localStorage.setItem('aToken', data.token);
        setAtoken(data.token);
        toast.success(`Admin login successful`);
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      toast.error(error.response?.data?.message || 'Login request failed');
    }
  };

  return (
    <form
      className="min-h-[80vh] flex items-center justify-center"
    >
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-black">Admin</span> Login
        </p>

        <div className="w-full">
          <p>Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none rounded-lg px-4 py-2 transition-all duration-200"
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none rounded-lg px-4 py-2 transition-all duration-200"
          />
        </div>

        <button
         onClick={() => navigate("/email-verification")}
         className="bg-blue-600 text-white w-full py-2 my-4 rounded-md text-base">
          Login
        </button>

      </div>
    </form>
  );
};

export default Login;
