import * as React from 'react';
import {RiCheckboxBlankCircleLine} from 'react-icons/ri'
import Badge from '@mui/material/Badge';
import useWindowDimensions from '../hook/useWindowDimensions';
import axios from 'axios';
export default function Contact({user,unseen,updateunseen,socket}){
    const {width,height}=useWindowDimensions();
    const self_id=localStorage['userid'];
    const [islive,setislive]=React.useState(false);
    const [typing,updatetyping]=React.useState(false);
    const id=(self_id===user.from)?user.to:user.from;
    const username=(self_id===user.from)?user.toname:user.fromname;
    const dp=(self_id===user.from)?user.todp:user.fromdp;
      React.useEffect(()=>{
 async function fetchInfo(){
    try{
      
        let id;
        if(self_id===user.from)
        id=user.to;
        else
        id=user.from;
   const res=await axios.get(process.env.REACT_APP_NODE+'/contact/lastinfo?userid='+id,{
    withCredentials: true,
    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
})
const doc=res.data;
console.log(doc);
updateunseen(prev=>{
  prev[id]={
    text:doc.text,
    date:doc.date,
    count:doc.count
  }
   return prev; 
})
    }catch(err){
console.log(err);
    }
 }
 fetchInfo();

    },[])
    React.useEffect(()=>{
    const timer=  setInterval(() => {
        socket.emit('status',id,(status)=>{
          setislive(status);
        })  
      }, 2000);

      socket.on('typing',(userid)=>{
        if(id===userid)
        {
          updatetyping(true);
          setTimeout(() => {
            updatetyping(false);
          }, 1000);
        }
      })
return ()=>clearInterval(timer);
 /* socket.on('statuschange',(userid,status)=>{
    if(id===userid)
    setislive(status);
  })  */
    },[])
   
   let trailingname="";
    if(username && username.length>15)
     trailingname="..."
    const name=username.substring(0,15)+trailingname;
  
    let trailingtext="";
    const  text=unseen[id]?unseen[id].text:"";
    if(text && text.length>20)
     trailingtext="..."
    const usertext=text.substring(0,20)+trailingtext;
    if(width>=768)
    return (
        <div className="flex font-Montserrat p-2  cursor-pointer hover:bg-gray-100 ">
   <img  src={'https://api.dicebear.com/5.x/personas/svg?seed='+dp} className="w-12 h-10 ring-blue-500 ring-2 rounded-lg mt-4 cursor-pointer"/>
  {islive==='online' && <RiCheckboxBlankCircleLine className={`-translate-x-3 translate-y-2 bg-green-500 rounded-xl`} />  }
       <div className="flex-row mt-3 ml-2">
 <p className="text-base font-semibold">{name}</p>

<div className='flex'>
<p className={`text-sm ${typing?'text-green-800':'text-gray-600'} truncate ...`}>{typing?'Typing...':usertext}</p>
{unseen[id]  && unseen[id].count>0  && <div className='translate-x-20'><Badge badgeContent={unseen[id].count} color="primary" /></div>}
</div>
       </div>
      
       <p className="mt-3 ml-2 text-sm text-gray-500">{unseen[id]?unseen[id].date.slice(0,22):""}</p>
        </div>
    );
    else
    return (
        <div className="flex font-Montserrat p-2 cursor-pointer hover:bg-gray-100">
   <img  src={'https://api.dicebear.com/5.x/personas/svg?seed='+dp} className="w-12 h-10 ring-blue-500 ring-2 rounded-lg mt-4 cursor-pointer"/>
   { islive==='online'  &&
    <RiCheckboxBlankCircleLine className={`-translate-x-3 translate-y-2 bg-green-500 rounded-xl`} />  }
       <div className="flex-row mt-3 ml-2">
 <p className="text-base font-semibold">{name}</p>

<div className='flex'>
<p className={`text-sm ${typing?'text-green-800':'text-gray-600'}  truncate ...`}>{typing?'Typing...':usertext}</p>
{unseen[id]  && unseen[id].count>0  && <div className='translate-x-10'><Badge badgeContent={unseen[id].count} color="primary" /></div>}
</div>
       </div>
      
       <p className="mt-3 ml-auto text-sm text-gray-500">{unseen[id]?unseen[id].date.slice(0,22):""}</p>
        </div>
    )
}