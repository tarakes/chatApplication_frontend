import {FiSettings} from 'react-icons/fi';
import {CiLogout} from 'react-icons/ci';
import { useState } from 'react';
import Settings from './Settings';
import useWindowDimensions from '../hook/useWindowDimensions';
import axios from 'axios';
import {socket} from '../utils/socket';
import { useNavigate } from 'react-router-dom';
export default function Navigation(){
    const [setting,setsetting]=useState(false);
    const { width } = useWindowDimensions();
    const [loading,setloading]=useState(false);
    const Navigate=useNavigate();
    const src='https://api.dicebear.com/5.x/personas/svg?seed='+window.localStorage['dp'];
    async function logout(){
        if(loading)
        return;
        setloading(true);
    try{
       const res=await axios.get(process.env.REACT_APP_NODE+'/user/logout',{
        withCredentials: true,
        headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
    });
    socket.disconnect();
    localStorage.removeItem('userid');
    localStorage.removeItem('dp');
   
  Navigate("/");
    }catch(err){
        alert("unable to logout");
    console.log(err);
    }
    setloading(false);
    }
     if(width>=768)
    return(
        <>
        <div className="bg-white shadow-lg p-2 flex-row space-y-12 border-gray-200 border-r-2 ">
         <img className="w-12 h-12  ring-blue-500 ring-2 rounded-3xl mt-4 cursor-pointer" alt='dp' src={src} onClick={()=>setsetting(false)}/>
        <FiSettings  className={`${setting?'ring-blue-200':'ring-gray-200'} scale-150 ml-4 rounded-xl  ring-8 cursor-pointer`}
        onClick={()=>setsetting(true)}/>
       <CiLogout className='scale-150 ml-4 rounded-xl ring-gray-200 ring-8 cursor-pointer' onClick={()=>logout()} />
        </div>
 { setting &&  <Settings setsetting={setsetting} />

    }
        </>
    )
  /*  else  if(width>=600 && width<768)
    return(
        <>
        <div className="bg-white shadow-lg p-2 flex-row space-y-12 border-gray-200 border-r-2 ">
         <img className="w-12 h-12  ring-blue-500 ring-2 rounded-3xl mt-4 cursor-pointer" alt='dp' src={src} onClick={()=>setsetting(false)}/>
        <FiSettings  className={`${setting?'ring-blue-200':'ring-gray-200'} scale-150 ml-4 rounded-xl  ring-8 cursor-pointer`}
        onClick={()=>setsetting(true)}/>
       <CiLogout className='scale-150 ml-4 rounded-xl ring-gray-200 ring-8 cursor-pointer'  />
        </div>
 { setting &&  <Settings setsetting={setsetting} />

    }
        </>
    )*/
    else
    return(
        <>
        <div className="bg-white shadow-lg p-2 flex space-x-12 border-gray-200  border-b-2 border-b-gray-200 w-full pl-28   ">
         <img className="w-12 h-12  ring-blue-500 ring-2 rounded-3xl mt-4 cursor-pointer" alt='dp' src={src} onClick={()=>setsetting(false)}/>
        <FiSettings  className={`${setting?'ring-blue-200':'ring-gray-200'} scale-150 ml-4 rounded-xl bg-gray-200 ring-8 cursor-pointer mt-8`}
        onClick={()=>setsetting(true)}/>
       <CiLogout className='scale-150 ml-4 rounded-xl ring-gray-200 ring-8 cursor-pointer mt-8 bg-gray-200' onClick={()=>logout()} />
        </div>
 { setting &&  <Settings setsetting={setsetting} />

    }
        </>
    )
}