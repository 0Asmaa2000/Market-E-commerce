
import React, { useContext, useState } from 'react';
import style from './Regisrer.module.css'; 
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup' ;
import Login from './../Login/Login';
import { UserContext } from '../../Context/UserContext';


export default function Regisrer() { 
let {UserLogin,setUserLogin}=useContext(UserContext)
  const [ApiError, setApiError] = useState('')
  const [isLoading, setisLoading] = useState(false)
const navigate =useNavigate();
   function handleRegister(values) { 
    setisLoading(true)
 axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values).then((res)=>{
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
  name:Yup.string().min(3,'min length is 3').max(10,'max length is 10 ').required('Name is required'),
  email:Yup.string().email('Invalid Email').required('Email is required').required('Email is required'),
  phone:Yup.string().matches(/^01[0125][0-9]{8}$/,'Invalid Number').required('Phone Number is required'),
  password:Yup.string().matches(/^[A-Za-z0-9]{6,10}$/,'Password Should be between 6 and 10 character').required("Password is required"),
  rePassword:Yup.string().oneOf([Yup.ref('password')],'Password And RePassword Are Not The Same').required('rePassword is Required')
})
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: ""
    },
validationSchema:validationSchema ,
    onSubmit: handleRegister,
       });


  return (
<>
{ApiError?<div className='w-1/2 bg-red-600 mx-auto text-white font-bold rounded-lg p-2 text-center'>{ApiError}</div>:null
}

<div className='py-2'>
<h1 className='text-center text-2xl font-semibold text-blue-800 mt-8'>Register Now</h1>
  <form className="max-w-md mx-auto py-10" onSubmit={formik.handleSubmit}>
  <div className="relative z-0 w-full mb-5 group">
      <input type="text" onBlur={formik.handleBlur} onChange={formik.handleChange}  value={formik.values.name} name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
      <label htmlFor="name" className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-emraled-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name</label>
      {formik.errors.name&&formik.touched.name?<div className='text-red-700 p-2 mb-3 text-sm text-center'>{formik.errors.name}</div>:null}

      </div>
      <div className="relative z-0 w-full mb-5 group" >
      <input type="email" onBlur={formik.handleBlur} onChange={formik.handleChange}  value={formik.values.email} name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />

<label htmlFor="email" className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-emraled-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
{formik.errors.email&&formik.touched.email?<div className='text-red-700 p-2 text-sm mb-3 text-center'>{formik.errors.email}</div>:null}

      </div>
      <div className="relative z-0 w-full mb-5 group" >
      <input type="tel" onBlur={formik.handleBlur} onChange={formik.handleChange}  value={formik.values.phone} name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />

<label htmlFor="phone" className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-emraled-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email Phone</label>
{formik.errors.phone&&formik.touched.phone?<div className='text-red-700 p-2 text-sm mb-3 text-center'>{formik.errors.phone}</div>:null}

      </div>
      <div className="relative z-0 w-full mb-5 group" >
      <input type="password" onBlur={formik.handleBlur} onChange={formik.handleChange}  value={formik.values.password} name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />

<label htmlFor="password" className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-emraled-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your password</label>
{formik.errors.password&&formik.touched.password?<div className='text-red-700 text-sm mb-3 p-2 text-center'>{formik.errors.password}</div>:null}

      </div>
      <div className="relative z-0 w-full mb-5 group" >
      <input type="password" onBlur={formik.handleBlur} onChange={formik.handleChange}  value={formik.values.rePassword} name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />

<label htmlFor="Password" className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-emraled-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Repassword</label>
{formik.errors.rePassword&&formik.touched.rePassword?<div className='text-red-700 text-sm p-2 mb-3 text-center'>{formik.errors.rePassword}</div>:null}

      </div>
      <div className='flex items-center gap-4'> 
  <button type="submit" className="text-white bg-blue-800 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-50 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">{isLoading?<i className='fas fa-spinner fa-spin'></i>:'Register'}</button>

<div className='text-blue-700 underline cursor-pointer'><Link to={"/Login"} >Do you Have Account? <span className=''>Login</span></Link></div>

      </div>

  </form>

</div>

  </>
  

  )
}
