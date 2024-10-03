import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
const Login = () => {
  const { backendUrl, navigate, token, setToken } = useContext(ShopContext)
  const [currentState, setCurrentState] = useState('Login');
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const onSubmitHandler = async (e) => {
    e.preventDefault(); // Prevent form submission refresh
    try {
      if (currentState === 'Sign Up') {
        const res = await axios.post(backendUrl + '/api/user/signup', { name, email, password });
        console.log(res);
        if (res.data.success) {

          setToken(res.data.token); 
          localStorage.setItem('token',res.data.token)
          
        } else {
          toast.error(res.data.message); // Show error message if signup failed
        }
      } else {

        const res= await axios.post(backendUrl+'/api/user/login',{email,password})
        if(res.data.success){
          setToken(res.data.token)
          localStorage.setItem('token',res.data.token)
        }else{
          toast.error(res.data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  };
  useEffect(()=>{
    if(token){
      navigate('/');
    }
  },[token])
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState == 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800 ' placeholder='Name' required />}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className='w-full px-3 py-2 border border-gray-800 '
        placeholder='Email'
        required />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className='w-full px-3 py-2 border border-gray-800 '
        placeholder='Password'
        required
      />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p>Forget Password</p>
        {
          currentState === 'Login' ? <p className='cursor-pointer' onClick={() => setCurrentState('Sign Up')}>Create Account</p> : <p className='cursor-pointer' onClick={() => setCurrentState('Login')}>Login here</p>
        }
      </div>
      <button type='submit' className='bg-black text-white px-4 py-2'>{currentState === 'Sign Up' ? 'Sign Up' : 'Login'} </button>
    </form>
  )
}

export default Login