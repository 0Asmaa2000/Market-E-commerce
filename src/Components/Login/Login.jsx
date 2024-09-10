import React, { useContext, useState } from 'react';
import style from './Login.module.css'; 
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup' ;
import Regisrer from './../Regisrer/Regisrer';
import { UserContext } from '../../Context/UserContext';
import Forgetpassword from '../Forgetpassword/Forgetpassword';
export default function Login() { 
  let {UserLogin,setUserLogin}=useContext(UserContext)

  const [ApiError, setApiError] = useState('')
  const [isLoading, setisLoading] = useState(false)
const navigate =useNavigate();
   function handleLogin(values) { 
    setisLoading(true)
 axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values).then((res)=>{
  setisLoading(false)

  console.log(res);
  if(res.data.message=='success'){
    localStorage.setItem('userToken',res.data.token)
    setUserLogin(res.data.token)
    navigate('/')
  }
 }).catch((res)=>{
  setisLoading(false);

  setApiError(res.response.data.message);
 })
 

  }
let  validationSchema = Yup.object().shape({
  email:Yup.string().email('Invalid Email').required('Email is required').required('Email is required'),
  password:Yup.string().matches(/^[A-Za-z0-9]{6,10}$/,'Password Should be between 6 and 10 character').required("Password is required"),
})
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
validationSchema:validationSchema ,
    onSubmit:handleLogin,
       });


  return (
<>
{ApiError?<div className='w-1/2 bg-red-600 mx-auto text-white font-bold rounded-lg p-2 text-center'>{ApiError}</div>:null
}

<div className='py-32'>
<h2 className='text-center text-2xl font-semibold text-blue-800'>Login</h2>
  <form className="max-w-md mx-auto py-10" onSubmit={formik.handleSubmit}>
      <div className="relative z-0 w-full mb-5 group" >
      <input type="email" onBlur={formik.handleBlur} onChange={formik.handleChange}  value={formik.values.email} name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-100 appearance-none  dark:border-gray-100 dark:focus:border-blue-800 focus:outline-none focus:ring-0 focus:border-blue-800 peer" placeholder=" "  />

<label htmlFor="email" className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 pb-16 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-emraled-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
{formik.errors.email&&formik.touched.email?<div className='text-red-600 font-semibold p-2 text-sm mb-3 text-center'>{formik.errors.email}</div>:null}

      </div>
      
      <div className="relative z-0 w-full mb-5 group">
  <input
    type="password"
    onBlur={formik.handleBlur}
    onChange={formik.handleChange}
    value={formik.values.password}
    name="password"
    id="password"
    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-800 focus:outline-none focus:ring-0 focus:border-blue-800 peer"
    placeholder=" "
    autoComplete="current-password"  
  />
  <label
    htmlFor="password"
    className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 pb-8 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-emraled-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    aria-autocomplete="new-password"
  >
    Enter Your Password
  </label>
  {formik.errors.password && formik.touched.password ? (
    <div className="text-red-600 font-semibold text-sm mb-3 p-2 text-center">
      {formik.errors.password}
    </div>
  ) : null}
<Link className='text-blue-950 underline flex justify-end pt-2' to={`/forget?email=${encodeURIComponent(formik.values.email)}`}>Forget Password?</Link>

</div>

      

      <div className='flex flex-col items-center gap-4'>

      <button type="submit" className="text-white bg-blue-800 hover:bg-blue-500  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">{isLoading?<i className='fas fa-spinner fa-spin'></i>:'Register'}</button>
      <div className='text-blue-950 underline'><Link to={"/register"} >Don't Have Account? <span className=''>Register</span></Link></div>


      </div>


  </form>
  
</div>

  </>
  

  )
}
