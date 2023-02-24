import Navigation from "../components/Navigation";
import Contactlist from "../components/Contactlist";
import DisplayMessage from "../components/DisplayMessage";
import useWindowDimensions from "../hook/useWindowDimensions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {socket} from '../utils/socket';
import axios from "axios";
////https://api.dicebear.com/5.x/personas/svg?seed=Arup_male
/*

{
  'tapu27':{
    count:5,
    text:'snsnsnn',
    date:smmsmm
  }
}
*/

export default function Message(){
   const {width}=useWindowDimensions();
   const [user,setuser]=useState();
   const [loading,setloading]=useState(false);
   const [userid,setuserid]=useState(localStorage.getItem('userid'))
   const [userdp,setuserdp]=useState(localStorage.getItem('dp'));

   const [unseen,updateunseen]=useState({});
   const Navigate=useNavigate();
   
  useEffect(()=>{
   function getCookie(cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
   
    setloading(true);
    const user=getCookie('validate_user');
    if(user==='' || !userid  || !userdp)
    Navigate("/");
     axios.get(process.env.REACT_APP_NODE+'/setting',{
      withCredentials: true,
      headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
  }).then((res)=>res.data)
  .then(data=>{
    localStorage.setItem('lastseen',data.lastseen);
    localStorage.setItem('receipts',data.receipts);
  }).catch(err=>console.log(err))
  .finally(()=>setloading(false))
    
  },[])
  useEffect(()=>{
  socket.on('newmsg',(doc,callback)=>{
   
    if(doc.from===userid)
    return;
    console.log('new message arrived');
    updateunseen(prev=>{
      if(prev[doc.from])
    {
      if(!user)
      prev[doc.from].count++;
      prev[doc.from].text=doc.data;
      prev[doc.from].date=doc.date;
    }else{
      if(!user){
    prev[doc.from]={
    
      count:1,
      text:doc.data,
      date:doc.date
    }  }
    else{
    prev[doc.from]={
    
      count:0,
      text:doc.data,
      date:doc.date
    }  }
    }
     
      return prev;
    })
    callback();
  })
  },[])
 
  if(loading)
  return 'loading...';
   if(width>=768)
    return(
    <div className="flex bg-blue-100 w-screen h-screen overflow-hidden">
     <Navigation />
     <Contactlist setuser={setuser} unseen={unseen} updateunseen={updateunseen} socket={socket}/>
   {user &&  <DisplayMessage user={user} setuser={setuser} unseen={unseen} updateunseen={updateunseen} socket={socket} /> }
    </div>
    );
 /*   else  if(width>=600 && width<768)
    return(
        <div className="flex bg-blue-100 w-screen h-screen overflow-hidden">
         <Navigation />
         <Contactlist />
         <DisplayMessage  me={"https://static.vecteezy.com/system/resources/previews/009/749/643/non_2x/woman-profile-mascot-illustration-female-avatar-character-icon-cartoon-girl-head-face-business-user-logo-free-vector.jpg"} other={"https://img.freepik.com/free-photo/portrait-young-indian-top-manager-t-shirt-tie-crossed-arms-smiling-white-isolated-wall_496169-1513.jpg?t=st=1675001489~exp=1675002089~hmac=64dc7b31d1fda3fd62473f8c0bc8c0cf186af462b201e6ffa6d7ce857b11e691"} /> 
        </div>
        );   */
        else
        return(
            <div className="flex-row bg-blue-100 w-screen h-screen overflow-hidden ">
             <Navigation />
             <Contactlist setuser={setuser}  unseen={unseen} updateunseen={updateunseen} socket={socket}/>
            {user &&  <DisplayMessage user={user} setuser={setuser}  unseen={unseen} updateunseen={updateunseen} socket={socket} /> 
}
           </div>
            );
}