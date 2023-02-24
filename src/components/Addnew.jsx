import {AiOutlineCloseCircle} from 'react-icons/ai';
import {MdAdd} from 'react-icons/md';
import '../css/scrollbar.css';
import ScrollReveal from 'scrollreveal';
import { useEffect, useRef, useState } from 'react';
import useWindowDimensions from '../hook/useWindowDimensions';
import axios from 'axios';
export default function Addnew({setadd,updatecontactlist}){
    const {width,height}=useWindowDimensions();
    const [loading,setloading]=useState(false);
    useEffect(()=>{
        ScrollReveal().reveal('.addnew',{origin:'top'});
    },[])
    const [list,updatelist]=useState([]);
    
    let count=0;
 async function searchUser(userid){
    if(!userid)
    return;
    if(userid.length<2)
    return;
try{
    const tmpcount=count;
   count++;
 const res=await axios.get(process.env.REACT_APP_NODE+'/user/search?userid='+userid,{
    withCredentials: true,
    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
})
console.log(res.data);
if(tmpcount+1===count)
updatelist(res.data.arr);
}catch(err){
console.log(err);
}
 }
 async function adduser(user){
 if(loading)
 return;
 setloading(true);
 try {
   const res=await axios.post(process.env.REACT_APP_NODE+'/contact/createcontact',{
    from:localStorage.getItem('userid'),
    to:user.userid,
    fromname:localStorage.getItem('username'),
    toname:user.name,
    fromdp:localStorage.getItem('dp'),
    todp:user.dp
   },{
    withCredentials: true,
    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
});
console.log(res.data);
updatecontactlist(prev=>[res.data,...prev]);
 } catch (error) {
    console.log(error);
 }
 setloading(false);
 }
  if( width>=768)
    return (
        <div className="w-80  fixed translate-y-5 
         translate-x-1 bg-white shadow-lg shadow-slate-400 p-1 z-20 border-t-2
          border-t-slate-200 rounded-xl addnew">
            <AiOutlineCloseCircle className='ml-auto scale-150 cursor-pointer' onClick={()=>setadd(false)}/>
   <input type='text' placeholder="Type user name or id to search"  onChange={(e)=>searchUser(e.target.value)}
    className="border-2 border-gray-300 w-full rounded-3xl p-2 z-20 mt-1 "/>
    <div className='overflow-y-scroll max-h-80 overflow-x-hidden' >
       {
        list.map((el,ind)=>{
            let username=el.name;
            let trailingname="";
    if(username.length>15)
     trailingname="..."
    const name=username.substring(0,15)+trailingname;
            return(
                <div className='flex space-y-1 mt-2 ' key={ind} >
                    <img src={'https://api.dicebear.com/5.x/personas/svg?seed='+el.dp} className='w-12 h-12 rounded-lg mr-1 ring-2 ml-1'/>
                    <div className='flex-row'>  
                        <p className='font-Montserrat font-bold'>{name}</p>
                        <p className='font-Montserrat text-gray-500 font-bold'>{'@'+el.userid}</p>
                        </div>
                        <MdAdd className='ml-auto mr-5 scale-125 ring-gray-300 ring-4 rounded-3xl bg-gray-300 cursor-pointer'
                        onClick={()=>adduser(el)}/>
                    </div>
            )
        })
       }
    </div>  
        </div>
    );
    else
    return (
        <div className="w-80  fixed translate-y-5 
         translate-x-10 bg-white shadow-lg shadow-slate-400 p-1 z-20 border-t-2
          border-t-slate-200 rounded-xl addnew">
            <AiOutlineCloseCircle className='ml-auto scale-150 cursor-pointer' onClick={()=>setadd(false)}/>
   <input type='text' placeholder="Type user name or id to search"    onChange={(e)=>searchUser(e.target.value)}
    className="border-2 border-gray-300 w-full rounded-3xl p-2 z-20 mt-1 "/>
    <div className='overflow-y-scroll max-h-80 overflow-x-hidden' >
       {
        list.map((el,ind)=>{
            let username=el.name;
            let trailingname="";
    if(username.length>15)
     trailingname="..."
    const name=username.substring(0,15)+trailingname;
            return(
                <div className='flex space-y-1 mt-2 ' key={ind} >
                    <img src={'https://api.dicebear.com/5.x/personas/svg?seed='+el.dp} className='w-12 h-12 rounded-lg mr-1 ring-2 ml-1'/>
                    <div className='flex-row'>  
                        <p className='font-Montserrat font-bold'>{name}</p>
                        <p className='font-Montserrat text-gray-500 font-bold'>{'@'+el.userid}</p>
                        </div>
                        <MdAdd className='ml-auto mr-5 scale-125 ring-gray-300 ring-4 rounded-3xl bg-gray-300 cursor-pointer'
                        onClick={()=>adduser(el)}/>
                    </div>
            )
        })
       }
    </div>  
        </div>
    );
}