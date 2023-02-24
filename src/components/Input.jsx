import EmojiPicker from 'emoji-picker-react';
import {MdOutlineEmojiEmotions} from 'react-icons/md';
import {FiSend} from 'react-icons/fi';
import { useEffect, useState } from 'react';
import useWindowDimensions from '../hook/useWindowDimensions';
export default function Input({from, to, socket,setconversation,othername,myname}){
    const [open,setopen]=useState(false);
    const {width,height}=useWindowDimensions();
    const [loading,setloading]=useState(false);
    const [data,setdata]=useState("");
  
    async function send(type,data){
      if(!data.trim())
      return;

   socket.emit('newmsg',{
    from,
    to,
    fromname:myname,
    toname:othername,
    datatype:type,
    data:data.trim(),
    seen:false,
    received:false,
     deleted:false,
     date: new Date()
   })
   setdata("");
    }
    
  
    function Typing(){
      socket.emit('typing',localStorage.getItem('userid'));
    }
    if(width>=768)
    return(
    <div className='fixed  w-full translate-x-5 -translate-y-1/4 -ml-6'>
      
   
  <div className='fixed -translate-y-full ml-5 '>
  {
    open &&   <EmojiPicker  onEmojiClick={(e)=>send('emoji',e.emoji)}/>
   }
  </div>
   <div className='bg-white mt-10 -mb-8 flex'>
    <MdOutlineEmojiEmotions 
    className={`scale-150 translate-x-12 translate-y-7  rounded-2xl ${!open?'fill-black':'fill-white'}
     bg-blue-400 ring-blue-400 ring-4 cursor-pointer`} onClick={()=>setopen(prev=>!prev)}/>
   <input type='text' placeholder='Write your message...'  value={data}  onChange={(e)=>{setdata(e.target.value); Typing();}}  
   className='w-2/4 ml-28 mb-5 p-4 rounded-3xl border-2 border-gray-300 mt-1'/>
   <FiSend className='scale-150 translate-x-8 translate-y-7 ring-8 rounded-2xl bg-blue-400 ring-blue-400 cursor-pointer '
    onClick={()=>send('text',data)}/>
   </div>
    </div>
    );
 /*   else  if(width>=600 && width<768)
    return(
      <div className='fixed  w-full translate-x-5 -translate-y-1/4 -ml-6'>
        
     
    <div className='fixed -translate-y-full ml-5 '>
    {
      open && <emoji-picker >
    
      </emoji-picker>
     }
    </div>
     <div className='bg-white mt-10 -mb-8 flex'>
      <MdOutlineEmojiEmotions 
      className={`scale-150 translate-x-12 translate-y-7  rounded-2xl ${!open?'fill-black':'fill-white'}
       bg-blue-400 ring-blue-400 ring-4 cursor-pointer`} onClick={()=>setopen(prev=>!prev)}/>
     <input type='text' placeholder='Write your message...' 
     className='w-2/4 ml-28 mb-5 p-4 rounded-3xl border-2 border-gray-300 mt-1'/>
     <FiSend className='scale-150 translate-x-8 translate-y-7 ring-8 rounded-2xl bg-blue-400 ring-blue-400 cursor-pointer '/>
     </div>
      </div>
      );*/
      else
      return(
        <div className='  w-full -translate-y-7 '>
          
       
      <div className='fixed -translate-y-full  '>
      {
        open &&   <EmojiPicker   onEmojiClick={(e)=>send('emoji',e.emoji)} />
       }
      </div>
       <div className='bg-white mt-10 -mb-8 flex'>
        <MdOutlineEmojiEmotions 
        className={`scale-150 translate-x-10 translate-y-7  rounded-2xl ${!open?'fill-black':'fill-white'}
         bg-blue-400 ring-blue-400 ring-4 cursor-pointer`} onClick={()=>setopen(prev=>!prev)}/>
       <input type='text' placeholder='Write your message...' value={data} onChange={(e)=>{setdata(e.target.value); Typing();}} 
       className='w-3/5 ml-20 mb-5 p-4 rounded-3xl border-2 border-gray-300 mt-1'/>
       <FiSend className='scale-150 translate-x-6 translate-y-7 ring-8 rounded-2xl bg-blue-400 ring-blue-400 cursor-pointer '
        onClick={()=>send('text',data)}/>
       </div>
        </div>
        );
}