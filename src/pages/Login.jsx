import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from "../hook/useWindowDimensions";


export default function Login(){
    const [loading,setloading]=useState(false);
    const [userid,setuserid]=useState();
    const [password,setpassword]=useState();
     const [error,seterror]=useState(false);
     const {width,height}=useWindowDimensions();
     const Navigate=useNavigate();
  async function userLogin(){
    if(loading)
    return;
    setloading(true);
    seterror(false);
try{
const res=await axios.post(process.env.REACT_APP_NODE+'/user/login',{userid,password},{
    withCredentials: true,
    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
});

localStorage.setItem('userid',res.data.userid);
localStorage.setItem('dp',res.data.dp);
localStorage.setItem('username',res.data.username);
window.open('/chat','_self');
}
catch(err){
console.log(err);
seterror(true);
}
 
    setloading(false);
  }
  if(width>=768)
    return (
        <div className="bg-gray-200 w-screen h-screen font-Montserrat">
          <div className="bg-white w-1/5 flex-row m-auto  translate-y-32 p-10  shadow-xl rounded-lg">
            <p className=" font-bold text-xl">Chat Application</p>
            <p className="mt-5 text-sm mb-5">Please Login to your account</p>
          <input type='text' placeholder="Username" className="w-full border-2 border-gray-200 mb-2 p-2"
           onChange={(e)=>setuserid(e.target.value)} />
            <input type='password' placeholder="password"  className="w-full border-2 border-gray-200 p-2"
            onChange={(e)=>setpassword(e.target.value)} />
            <button onClick={()=>userLogin()} className='bg-blue-400 w-full p-2 rounded-sm font-bold mt-2'>LogIn</button>
             <div className="flex text-sm">
                <p >Don't have account?</p>
                <button className="text-blue-500 ml-2" onClick={()=>Navigate("/signup")}>Signup</button></div>
           {error &&  <p className="text-red-500">unsuccessful</p>}
          </div>
        </div>
    )
    else 
    return (
        <div className="bg-gray-200 w-screen h-screen font-Montserrat">
          <div className="bg-white w-4/5 flex-row m-auto  translate-y-32 p-10  shadow-xl rounded-lg">
            <p className=" font-bold text-xl">Chat Application</p>
            <p className="mt-5 text-sm mb-5">Please Login to your account</p>
          <input type='text' placeholder="Username" className="w-full border-2 border-gray-200 mb-2 p-2"
           onChange={(e)=>setuserid(e.target.value)} />
            <input type='password' placeholder="password"  className="w-full border-2 border-gray-200 p-2"
            onChange={(e)=>setpassword(e.target.value)} />
            <button onClick={()=>userLogin()} className='bg-blue-400 w-full p-2 rounded-sm font-bold mt-2'>LogIn</button>
            <div className="flex text-sm">
                <p >Don't have account?</p>
                <button className="text-blue-500 ml-2"  onClick={()=>Navigate("/signup")}>Signup</button></div>
      
           {error &&  <p className="text-red-500">unsuccessful</p>}
          </div>
        </div>
    )

}