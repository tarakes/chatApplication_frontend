import * as React from 'react';
import Switch from '@mui/material/Switch';
import {AiOutlineClose} from 'react-icons/ai';
import ScrollReveal from 'scrollreveal';
import useWindowDimensions from '../hook/useWindowDimensions';
import axios from 'axios';
export default function Settings({setsetting}){
  const {width}=useWindowDimensions();
  const [loading,setloading]=React.useState(false);
  const [lastseen,setlastseen]=React.useState(localStorage.getItem('lastseen'));
  const [receipts,setrecipts]=React.useState(localStorage.getItem('receipts'));
  const [oldpassword,setoldpassword]=React.useState("");
  const [newpassword,setnewpassword]=React.useState("");
    React.useEffect(()=>{
        ScrollReveal().reveal('.setting',{origin:'left'});
        async function fetchSetting(){
          setloading(true);
          try {
            const res=await axios.get(process.env.REACT_APP_NODE+'/setting',{
              withCredentials: true,
              headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
          });
          setlastseen(res.data.lastseen);
          setrecipts(res.data.receipts);
          } catch (error) {
            console.log(error);
            alert('failed to fetch settings');
          }
          setloading(false);
        }
        if(!lastseen || !receipts)
        fetchSetting();
    },[])
  
   async function toggleLastseen(e){
    setloading(true);
    setlastseen(prev=>!prev);
  try {
  const res=  await axios.get(process.env.REACT_APP_NODE+'/setting/lastseen',{
      withCredentials: true,
      headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
  });
  localStorage.setItem('lastseen',res.data.value);
  } catch (error) {
    console.log(error);
    setlastseen(prev=>!prev);
  }
  setloading(false);
    }
  async  function toggleRecipts(e){
    setloading(true);
    setrecipts(prev=>!prev);
    try {
    const res=  await axios.get(process.env.REACT_APP_NODE+'/setting/receipts',{
        withCredentials: true,
        headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
    });
    localStorage.setItem('receipts',res.data.value);
    } catch (error) {
      console.log(error);
      setrecipts(prev=>!prev);
    }
    setloading(false);
  }
   
    async function updatePassword(){
  if(loading)
  return;
  setloading(true);
  try{
  await axios.post(process.env.REACT_APP_NODE+'/user/update',{oldpassword,newpassword},{
    withCredentials: true,
    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
})
alert('successfully changed password');
  }catch(err){
console.log(err);
alert('update failed please try again with correct password')
  }
  setloading(false);
    }
    if(width>=768)
    return (
       
             <div className="w-80   p-2
 h-full translate-x-16 fixed z-20 bg-white shadow-lg font-Montserrat font-w setting">
<div className='flex'>
<div>
<p className="font-bold text-2xl ml-4">Settings</p>
<p className="text-gray-800 ml-4">change your app settings</p>
</div>
<AiOutlineClose className='ml-auto ring-4 rounded-xl bg-gray-200 ring-gray-200 cursor-pointer'
onClick={()=>setsetting(false)} />
</div>
<div className="flex bg-gray-100 p-3 rounded-xl mt-4">
    <div className='flex-row'>
        <p className='text-md font-bold'>Last seen 
        </p>
        <p className='text-sm text-gray-500'><b> Note</b> : turn on this setting to whether your contact can see last seen or not</p>
    </div>
<Switch  defaultChecked={lastseen||true} onChange={(e)=>toggleLastseen(e)} disabled={loading}/>
</div>
<div className="flex bg-gray-100 p-3 rounded-xl mt-4">
    <div className='flex-row'>
        <p className='text-md font-bold'>Read receipts
        </p>
        <p className='text-sm text-gray-500'><b> Note</b> :  If turn off this option other won't be able to see read recipts from you</p>
    </div>
<Switch  defaultChecked={receipts||true} onChange={(e)=>toggleRecipts(e)}   disabled={loading}/>
</div>
<div className='mt-4'>
    <p className='text-md font-bold mb-2'>Change password</p>
    <input type='password' placeholder='old password'  className='w-full border-2 border-gray-400 rounded-lg p-2' onChange={(e)=>setoldpassword(e.target.value)}/>
    <input type='password' placeholder='new password' className=' mt-3 w-full border-2 border-gray-400 rounded-lg p-2' onChange={(e)=>setnewpassword(e.target.value)}/>
  <button className='bg-blue-200 ml-52 mt-2 p-1 rounded-md text-blue-500 font-bold pl-4 pr-4' onClick={()=>updatePassword()}>Submit</button>
</div>
             </div>
      
    )
else
return (
       
    <div className="w-full   p-4
h-full  fixed z-20 bg-white shadow-lg font-Montserrat font-w setting">
<div className='flex'>
<div>
<p className="font-bold text-2xl ml-4">Settings</p>
<p className="text-gray-800 ml-4">change your app settings</p>
</div>
<AiOutlineClose className='ml-auto ring-4 rounded-xl bg-gray-200 ring-gray-200 cursor-pointer'
onClick={()=>setsetting(false)} />
</div>
<div className="flex bg-gray-100 p-3 rounded-xl mt-4">
<div className='flex-row'>
<p className='text-md font-bold'>Last seen 
</p>
<p className='text-sm text-gray-500'><b> Note</b> : turn on this setting to whether your contact can see last seen or not</p>
</div>
<Switch  defaultChecked={lastseen||true} onChange={(e)=>toggleLastseen(e)} disabled={loading}/>
</div>
<div className="flex bg-gray-100 p-3 rounded-xl mt-4">
<div className='flex-row'>
<p className='text-md font-bold'>Read receipts
</p>
<p className='text-sm text-gray-500'><b> Note</b> :  If turn off this option other won't be able to see read recipts from you</p>
</div>
<Switch  defaultChecked={receipts||true} onChange={(e)=>toggleRecipts(e)} disabled={loading}/>
</div>
<div className='mt-4'>
<p className='text-md font-bold mb-2'>Change password</p>
<input type='password' placeholder='old password'  className='w-full border-2 border-gray-400 rounded-lg p-2'/>
<input type='password' placeholder='new password' className=' mt-3 w-full border-2 border-gray-400 rounded-lg p-2'/>
<button className='bg-blue-200 ml-60 mt-2 p-1 rounded-md text-blue-500 font-bold pl-4 pr-4' onClick={()=>updatePassword()}>Submit</button>
</div>
    </div>

)
}