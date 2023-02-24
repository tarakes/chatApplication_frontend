import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from "../hook/useWindowDimensions";

export default function Signup(){
   const [gender,setgender]=useState('male');
   const [name,setname]=useState();
   const [dp,setdp]=useState();
   const [username,setusername]=useState();
   const [error,seterror]=useState(false);
   const [loading,setloading]=useState(false);
   const [password,setpassword]=useState();
   const [serial,setserial]=useState();
   const {width,height}=useWindowDimensions();
   const Navigate=useNavigate();
  let count=0;
 
     const prefix_src='https://api.dicebear.com/5.x/personas/svg?seed=';
     async function checkAvailable(value){
      seterror(false);
       const tmp=count;
       count++;

    try {
  const res=  await axios.get(process.env.REACT_APP_NODE+'/user/username?userid='+value,{
            withCredentials: true,
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
        })
        if(tmp+1===count){
          if(res.data.value)
        setusername(value);
        else
        seterror(true);
        }
        
    } catch (error) {
        if(tmp+1===count)
        seterror(true);
        console.log(error);
        
    }
  
     }
     async function createAccount(){
   setloading(true);
   try {
    const res=await axios.post(process.env.REACT_APP_NODE+'/user/signup',{
        name:name,
        userid:username,
        dp:dp,
        password
    },{
        withCredentials: true,
        headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
    });
    localStorage.setItem('userid',username);
    localStorage.setItem('username',name)
    localStorage.setItem('dp',dp);
   window.open("/chat",'_self');
   } catch (error) {
    console.log(error);
    alert('error occured try again');
   }
   setloading(false);
     }
     if(width>=768)
    return(
        <div className="w-screen h-screen bg-gray-200 ">
           <div className="w-1/5 flex-row m-auto translate-y-10 font-Montserrat space-y-2 shadow-lg rounded-md bg-white p-4 pl-2">
           <p className="text-xl font-bold ">Create your Account</p>
           <input type='text' placeholder="Type your name" className="p-2 border-2 w-full border-gray-400 " onChange={(e)=>setname(e.target.value)} /><br />
            <input type='password' placeholder="type password" className="p-2 border-2 border-gray-400 w-full"  onChange={(e)=>setpassword(e.target.value)}/><br />
          
          { name && <div className="space-x-4">
            <input type='radio' value='male' onClick={(e)=>{setgender(e.target.value); console.log(e.target.value)}} name='gender' defaultChecked />
            <input type='radio'  value='female' onClick={(e)=>setgender(e.target.value)} name='gender'  />
           <input type='radio'   value='other' onClick={(e)=>setgender(e.target.value)}  name='gender' />
           </div>
}
         {
            name && gender  &&
            <div >
                <p className="text-sm">choose profile picture</p>
 <div className="photo-list flex">
            <img alt="photooption" className={`w-10 h-10 ${serial===1?'ring-2':'ring-0'}`} src={prefix_src+name+gender} onClick={()=>{setdp(name+gender); setserial(1)}}/>
            <img alt="photooption" className={`w-10 h-10 ${serial===2?'ring-2':'ring-0'}`} src={prefix_src+name+gender+'_'}   onClick={()=>{setdp(name+gender+'_'); setserial(2)}} />
            <img alt="photooption"  className={`w-10 h-10 ${serial===3?'ring-2':'ring-0'}`} src={prefix_src+name+'_'+gender}  onClick={()=>{setdp(name+'_'+gender); setserial(3)}}/>
            <img alt="photooption"  className={`w-10 h-10 ${serial===4?'ring-2':'ring-0'}`} src={prefix_src+name+'_'+gender+'_'}   onClick={()=>{setdp(name+'_'+gender+'_'); setserial(4)}} />
        
      </div>
         </div>
         }
     
        <input type='text' placeholder="type an username" className="p-2 border-2 border-gray-400 w-full"  onChange={(e)=>checkAvailable(e.target.value)}/>
       {
        error && <p className="text-red-500">try with another username</p>
       }
       <br />
       <button onClick={()=>createAccount()} disabled={loading} 
       className='bg-blue-200 w-full p-2  rounded-lg font-bold' >signup</button>
      <div><p>Already have account? <button className="text-blue-500" onClick={()=>Navigate("/")}>Login</button></p></div>
           </div>
        </div>
    )
    else
    return(
        <div className="w-screen h-screen bg-gray-200 ">
           <div className="w-3/5 flex-row m-auto translate-y-10 font-Montserrat space-y-2 shadow-lg rounded-md bg-white p-4 pl-2">
           <p className="text-xl font-bold ">Create your Account</p>
           <input type='text' placeholder="Type your name" className="p-2 border-2 w-full border-gray-400 " onChange={(e)=>setname(e.target.value)} /><br />
            <input type='password' placeholder="type password" className="p-2 border-2 border-gray-400 w-full"  onChange={(e)=>setpassword(e.target.value)}/><br />
          
          { name && <div className="space-x-4">
            <input type='radio' value='male' onClick={(e)=>{setgender(e.target.value); console.log(e.target.value)}} name='gender' defaultChecked />
            <input type='radio'  value='female' onClick={(e)=>setgender(e.target.value)} name='gender'  />
           <input type='radio'   value='other' onClick={(e)=>setgender(e.target.value)}  name='gender' />
           </div>
}
         {
            name && gender  &&
            <div >
                <p className="text-sm">choose profile picture</p>
 <div className="photo-list flex">
            <img alt="photooption" className={`w-10 h-10 ${serial===1?'ring-2':'ring-0'}`} src={prefix_src+name+gender} onClick={()=>{setdp(name+gender); setserial(1)}}/>
            <img alt="photooption" className={`w-10 h-10 ${serial===2?'ring-2':'ring-0'}`} src={prefix_src+name+gender+'_'}   onClick={()=>{setdp(name+gender+'_'); setserial(2)}} />
            <img alt="photooption"  className={`w-10 h-10 ${serial===3?'ring-2':'ring-0'}`} src={prefix_src+name+'_'+gender}  onClick={()=>{setdp(name+'_'+gender); setserial(3)}}/>
            <img alt="photooption"  className={`w-10 h-10 ${serial===4?'ring-2':'ring-0'}`} src={prefix_src+name+'_'+gender+'_'}   onClick={()=>{setdp(name+'_'+gender+'_'); setserial(4)}} />
        
      </div>
         </div>
         }
     
        <input type='text' placeholder="type an username" className="p-2 border-2 border-gray-400 w-full"  onChange={(e)=>checkAvailable(e.target.value)}/>
       {
        error && <p>try with another username</p>
       }
       <br />
       <button onClick={()=>createAccount()} disabled={loading} 
       className='bg-blue-200 w-full p-2  rounded-lg font-bold' >signup</button>
      <div><p>Already have account? <button className="text-blue-500" onClick={()=>Navigate("/")}>Login</button></p></div>
           </div>
        </div>
    )
}