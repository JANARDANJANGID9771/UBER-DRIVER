import React ,{ useState } from "react";
import { Link } from "react-router-dom";

const UserSignup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userData, setUserData] = useState({})
    
   const  submitHandler =(e)=>{
      e.preventDefault()
      setUserData({
        FullName:{
            firstName:firstName,
            lastName:lastName
        },
        email:email,
        password:password
      })
      console.log(userData) 

    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
      
   }
  return (
    <div className="p-7  h-screen flex flex-col justify-between ">
      <div>
        <img
          className="w-20 mb-3"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt=""
        />

        <form
          onSubmit={(e) => {
            submitHandler(e);
           }}
        >
          <h3 className="text-base font-medium mb-2">What's your name</h3>
          <div className="flex gap-4 mb-5">
            <input
              required
              className="bg-[#eeeeee] w-1/2   rounded px-4 py-2 border  text-base placeholder:text-sm"
              type="text"
              placeholder="first name"
              value={firstName}
              onChange={(e)=>{
                setFirstName(e.target.value)
              }}
            />
            <input
              required
              className="bg-[#eeeeee]   rounded px-4 py-2 border  text-base placeholder:text-sm"
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e)=>{
                setLastName(e.target.value)
              }}
            />
          </div>


          <h3 className="text-base font-medium mb-2">What's your email</h3>
          <input
            required
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            type="email"
            placeholder="email@example.com"
            value={email}
              onChange={(e)=>{
                setEmail(e.target.value)
              }}
          />

          <h3 className="text-base font-medium mb-2">Enter password</h3>

          <input
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            value={password}
              onChange={(e)=>{
                setPassword(e.target.value)
              }}
            required
            type="password"
            placeholder="password"
          />

          <button className=" bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base">
            Login
          </button>
        </form>
        <p className="text-center">
           Already have a account?{" "}
          <Link to="/login" className="text-blue-600">
             Login here 
          </Link>
        </p>
      </div>
      <div>
      <p className="text-[10px] leading-tight ">
        This site is protected by reCAPTCHA and the <span className="underline ">Google Privacy 
        Policy</span> and <span className="underline">Terms of Service apply</span> </p>
      </div>
    </div>
  );
};

export default UserSignup;
