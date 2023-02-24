import '../css/scrollbar.css';
import Input from './Input';
import {MdDelete} from 'react-icons/md';
import {TiTick} from 'react-icons/ti';
import {BsThreeDotsVertical} from 'react-icons/bs';
import ScrollReveal from 'scrollreveal';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import { useEffect, useRef, useState } from 'react';
import useWindowDimensions from '../hook/useWindowDimensions';
import axios from 'axios';
export default function DisplayMessage({user,setuser,unseen,updateunseen,socket}){
    const [conversation,setconversation]=useState([]);
    const {width,height}=useWindowDimensions();
    const my=localStorage.getItem('userid');
    const [loading,setloading]=useState(false);
    const [typing,updatetyping]=useState(false);
    const [status,setstatus]=useState('');
    const othername=user.from===my?user.toname:user.fromname;
const otherdp='https://api.dicebear.com/5.x/personas/svg?seed=' + (user.from===my?user.todp:user.fromdp);
const medp='https://api.dicebear.com/5.x/personas/svg?seed=' + (user.from===my?user.fromdp:user.todp);
const otherid=user.from===my?user.to:user.from;
const myname=user.from===my?user.fromname:user.toname
const [end,updateend]=useState(0);
const div=useRef();
//const pagesize=50
useEffect(()=>{
    window.scrollTo(0,0)
    async function ReadReciept(arr){
const newArray=arr.filter((el)=>el.to===my && el.seen===false);
 for(let i=0;i<newArray.length;i++)
 socket.emit('readrecipt',newArray[i]);
    }
async function fetchConversation(){
    setloading(true);
    try{
  const res=await axios.post(process.env.REACT_APP_NODE+'/message/allmessage?end='+end,{to:otherid},{
    withCredentials: true,
    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
});

setconversation(res.data.arr);

//div.current.scrollTo(0,900000);
document.getElementById('dv').scrollTo(0,500000);
updateunseen(prev=>{
    let obj=new Object(prev)
    if(prev[otherid])
        {
            obj[otherid].count=0;
        }
    return obj;
})
updateend(res.data.arr.length);
if(localStorage.getItem('receipts'))
ReadReciept(res.data.arr);
    }catch(err){
console.log(err);
    }
    setloading(false);
}
fetchConversation();
socket.on('newmsg',(doc,callback)=>{
   
   if((doc.from===otherid  && doc.to==my) || (doc.from===my && doc.to===otherid))
   {
    setconversation(prev=>[...prev,doc]);
    if(doc.from===otherid  && localStorage['receipts'])
    socket.emit('readrecipt',doc);
   // div.current.scrollTo(0,60000);
   document.getElementById('dv').scrollTo(0,500000);
   }
})

socket.on('readrecipt',(doc)=>{
    console.log('msg seen',doc);
  
    setconversation(prev=>{
        let newconv=[...prev];
        for(let i=0;i<newconv.length;i++){
        if(newconv[i]._id==doc._id){
           console.log('found recp')
           newconv[i].seen=true;
           break;
        }
    }
        return newconv;
      })
     
      
})

socket.on('received',(doc)=>{
    console.log('msg recv',doc)

    setconversation(prev=>{
        let newconv=[...prev];
        for(let i=0;i<newconv.length;i++){
        if(newconv[i]._id==doc._id){
           console.log('found recv')
           newconv[i].received=true;
           break;
        }
    }
        return newconv;
      })
     
})
socket.on('delete',(doc)=>{
    
    setconversation(prev=>{
        let arr=[...prev];
        for(let i=0;i<arr.length;i++)
        if(arr[i]._id==doc._id){
            arr[i].deleted=true;
            arr[i].data='';
            break;
        }
        return arr;
    })
})
const timer=setInterval(() => {
    socket.emit('status',otherid,(status)=>{
        setstatus(status);
      })
    
}, 2000);
socket.on('typing',(userid)=>{
    if(otherid===userid){
        updatetyping(true);
        setTimeout(() => {
            updatetyping(false);
        }, 1000);
    }
})
return ()=>clearInterval(timer);
},[])

 async function fetchMore(){
    if(loading)
    return;
    setloading(true);
    console.log(end);
    try {
        const res=await axios.post(process.env.REACT_APP_NODE+'/message/allmessage?end='+end,{to:otherid},{
            withCredentials: true,
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
        }); 
        setconversation(prev=>[...res.data.arr,...prev]);
        updateend(conversation.length);
    } catch (error) {
        console.log(error);
    }
    setloading(false);
 }
 async function DeleteMessage(doc){
    socket.emit('delete',doc);
    setconversation(prev=>{
        let arr=[...prev];
        for(let i=0;i<arr.length;i++)
        if(arr[i]._id==doc._id){
            arr[i].deleted=true;
            arr[i].data='';
            break;
        }
        return arr;
    })
 }
 //console.log(conversation[conversation.length-1]);

if(width>=768)
    return(
       
        <div className=" border-l-2 border-l-gray-200 w-3/4 ">
            <div className='bg-white fixed w-full z-20 p-2 flex font-Montserrat shadow-lg'>
                <img src={otherdp} className='w-12 h-12 rounded-lg ring-2 mr-2' />
               <div className='flex-row'>
               <p className='font-bold'>{othername}</p>
                <p>@{otherid}</p>
               </div>
            <p className='ml-1 text-green-600 font-bold'>{typing?'Typing...':status}</p>
            </div>
            <div className='space-y-5 p-5 overflow-y-scroll h-4/5 mt-16 overflow-x-hidden
             ' ref={div} id='dv' >
            {conversation.length>0 && <button onClick={()=>fetchMore()}>Load more....</button> }
          { 
         // !loading &&
        
           conversation.map((el,index)=>{
            let bgcolor;
       if(el.datatype==='text'  && el.from===my)
       bgcolor='grey';
       else if(el.datatype==='text'  && el.from!==my)
       bgcolor='#1c9dea';
       else
       bgcolor='none';
     
            return(
                <div  className={`flex ${my===el.from?'translate-x-2/4 mr-32':'translate-x-0'} msg`} key={index}>
              <img src={el.from===my?medp:otherdp} className="w-12 h-12 rounded-xl mr-2"/>
              <div className="flex-row">
                <div className="flex"><p className="font-Montserrat font-bold">{el.fromname}</p>
                <p className="font-Montserrat scale-75 text-gray-500 ">{el.date }</p>  </div>
               <div> <p style={{backgroundColor:bgcolor}} 
               className={`${el.deleted?'text-rose-800':'text-white'} p-4  font-medium  ${el.from===my?'rounded-br-xl rounded-l-xl':'rounded-tl-xl rounded-r-xl'} ${el.datatype==='emoji'&& !el.deleted?'text-7xl ':'text-base'}`} >
                {el.deleted?'This message was deleted':el.data.trim()}</p>
            <div className='flex'> 
            {el.from===my  && el.received && <TiTick className='fill-blue-500'/>}
              {el.from===my  && el.seen  &&  <TiTick className='fill-blue-500 -translate-x-3'/>}
                 </div>
                 </div>
                </div>
               {el.from===my && !el.deleted &&
               <div>
 <BsThreeDotsVertical  className='cursor-pointer' onClick={()=>{
    let element= document.getElementById(index);
if(element.style.display=='block')
element.style.display='none'
else
element.style.display='block';
    }}/>
 <div id={index} onClick={()=>DeleteMessage(el)} className=' hidden bg-white font-Montserrat -translate-x-full rounded-sm shadow-sm shadow-white font-medium p-1 cursor-pointer'>   

<div className='flex '>
         <p >Delete</p>
         <MdDelete className='translate-y-1'/> </div>
 </div>  
                </div>
               }
                    </div>
            )
           })
          }
          </div>
          <Input from={my} to={otherid} socket={socket} setconversation={setconversation} othername={othername} myname={myname}/>
        </div>
    );
    else
    return(
       
        <div className=" border-l-2 border-l-gray-200 bg-blue-100   fixed w-full -translate-y-60 h-full">
            <div className='bg-white fixed w-full  p-2 flex font-Montserrat '>
                <img src={otherdp} className='w-12 h-12 rounded-lg ring-2 mr-2' />
               <div className='flex-row'>
               <p className='font-bold '>{othername}</p>
                <p>@{otherid}</p>
               </div>
            <p className='ml-1 text-green-600 font-bold'>{typing?'Typing...':status}</p>
            <AiOutlineCloseCircle className='ml-auto scale-150 mr-4 mt-2' onClick={()=>setuser(false)}/>
            </div>
          
            <div className='space-y-5 p-5 overflow-y-scroll h-4/5 mb-10  mt-16  w-full  overflow-x-hidden
             '  ref={div}  id='dv'>
                {conversation.length>0 && <button onClick={()=>fetchMore()}>Load more....</button> }
          { //loading &&
         
           conversation.map((el,index)=>{
            let bgcolor;
       if(el.datatype==='text'  && el.from===my)
       bgcolor='grey';
       else if(el.datatype==='text'  && el.from!==my)
       bgcolor='#1c9dea';
       else
       bgcolor='none';
      
            return(
                <div  className={`flex ${my===el.from?'translate-x-1/4 mr-32':'translate-x-0'} ease-in`} key={index}>
              <img src={el.from===my?medp:otherdp} className="w-12 h-12 rounded-xl mr-2"/>
              <div className="flex-row">
                <div className="flex"><p className="font-Montserrat font-bold">{el.fromname}</p>
                <p className="font-Montserrat scale-75 text-gray-500">{el.date }</p>  </div>
               <div> <p style={{backgroundColor:bgcolor}} 
               className={`${el.deleted?'text-rose-800':'text-white'} p-4  font-medium  ${el.from===my?'rounded-br-xl rounded-l-xl':'rounded-tl-xl rounded-r-xl'} 
               ${el.datatype==='emoji' && !el.deleted?'text-7xl ':'text-base'}`} >
                {el.deleted?'This message was deleted':el.data}</p>
            <div className='flex'> 
            {el.from===my  && el.received && <TiTick className='fill-blue-500'/>}
              {el.from===my  && el.seen  &&  <TiTick className='fill-blue-500 -translate-x-3'/>}
                 </div>
                 </div>
                </div>
               {el.from===my && !el.deleted &&
               <div>
 <BsThreeDotsVertical  className='cursor-pointer' onClick={()=>{
    let element= document.getElementById(index);
if(element.style.display=='block')
element.style.display='none'
else
element.style.display='block';
    }}/>
 <div id={index} onClick={()=>DeleteMessage(el)}  className=' hidden bg-white font-Montserrat -translate-x-full rounded-sm shadow-sm shadow-white font-medium p-1 cursor-pointer'>   

<div className='flex '>
         <p >Delete</p>
         <MdDelete className='translate-y-1'/> </div>
 </div>  
                </div>
               }
                    </div>
            )
           })
          }
           
          </div>
       <Input from={my} to={otherid} socket={socket} setconversation={setconversation}  othername={othername} myname={myname}/> 
        </div>
    );
}