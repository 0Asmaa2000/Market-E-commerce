import React from 'react'
import style from './Footer.module.css'
export default function Footer() {
  return (
    <div className=" bg-gray-200 ">
      <h4 className="  pt-5  pb-4  font-semibold text-xl text-center">Send Message Us</h4>
  <div className=" flex justify-around pb-4  ">
    <div className="  flex flex-col w-1/3">
      <input className="form-control p-2  form-control-lg block py-2.5 px-0 w-full text-sm text-white mb-1 border-0 border-b-2 border-gray-100 appearance-none  dark:border-gray-100 dark:focus:border-blue-800 focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" Email"  />

<label htmlFor="email" className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 pb-16 dark:text-gray-400 my-2" type="text" placeholder="Your Email" aria-label=".form-control-lg example" />
      <textarea className="form-control" id="exampleFormControlTextarea1" rows={5} defaultValue={""} />
    </div>
    <div className=" pt-5 w-1/3">
      <h6 className="h1  ">Get in Touch</h6>
      <div className="iiii">
        <li> <i className="fa-solid text-blue-800 fa-location-dot px-1" /> <span>A108 Adam Street, New York, NY
            535022 </span></li>
        <li><i className="fa-solid text-blue-800 fa-mobile-screen  px-1" /> <a href="#"> (617) 557-0089</a> </li>
        <li><i className="fa-regular text-blue-800 fa-envelope px-1" /> <a className="sas" href="#">
            contact@example.com</a></li>
       
      </div>
    </div>
  </div>
</div>

  )
}
