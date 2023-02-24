import * as React from 'react';
import {CiSearch} from 'react-icons/ci';
import {IoPersonAddOutline} from 'react-icons/io5';
import Contact from './Contact';
import "../css/scrollbar.css";
import ScrollReveal from 'scrollreveal';
import Addnew from './Addnew';
import Search from './Search';
import useWindowDimensions from '../hook/useWindowDimensions';
import axios from 'axios';
export default function Contactlist({setuser,unseen,updateunseen,socket}){
  const [add,setadd]=React.useState(false); 
  const [search,setsearch]=React.useState(false);
  const {width,height}=useWindowDimensions();
  const [userid,setuserid]=React.useState(localStorage.getItem('userid'));
  React.useEffect(()=>{
    ScrollReveal({ distance: '60px' });
    ScrollReveal().reveal('.list',{origin:'top'});
  },[])
  const iconstyle=' rounded-xl ring-gray-200 ring-4 cursor-pointer mt-6 fill-black scale-150'
const [contactlist,updatecontactlist]=React.useState([]);
const [loading,setloading]=React.useState(false);
React.useEffect(()=>{
   async function fetchContactList(){
    setloading(true);
    console.log('hd')
    try{
  const res=await axios.get(process.env.REACT_APP_NODE+'/contact/allcontact',{
    withCredentials: true,
    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
});
console.log(res.data);
updatecontactlist(prev=>[...res.data.arr,...prev]);
    }catch(err){
console.log(err);
    }
    setloading(false);
   }
   fetchContactList();
},[])
if(width>=768)
  return(

    <div className="w-2/7  bg-white shadow-lg font-Montserrat font-w ">
<div className='flex'>
<p className="text-2xl m-4 font-extrabold">Contact</p>

  <CiSearch  className={`${iconstyle} ml-20 bg-gray-200`} onClick={()=>setsearch(true)}/>
  <IoPersonAddOutline  className={`${iconstyle} ml-10 mr-4  bg-gray-200`} onClick={()=>setadd(true)}/>
  {
    add && <Addnew setadd={setadd} updatecontactlist={updatecontactlist}/>
  }
{
  search && <Search setsearch={setsearch}  contactlist={contactlist} updatecontactlist={updatecontactlist} />
}
</div>
<p className="text-sm ml-4 text-gray-500 font-bold">Start talking now</p>
 <div className='overflow-y-scroll h-4/5' id='contactlist'>
 {
    contactlist.map((el,ind)=>{
      let id=el.from===userid?el.to:el.from
      return (<div key={ind} className='list' onClick={()=>setuser(el)}>
        <Contact user={el} unseen={unseen} updateunseen={updateunseen} socket={socket}/>
      </div>)
    })
  }
 </div>
    </div>
)
else
return(

  <div className="w-full bg-white shadow-lg font-Montserrat font-w ">
<div className='flex'>
<p className="text-2xl m-4 font-extrabold">Contact</p>

<CiSearch  className={`${iconstyle} ml-auto bg-gray-200 `} onClick={()=>setsearch(true)}/>
<IoPersonAddOutline  className={`${iconstyle} ml-10 mr-4  bg-gray-200`} onClick={()=>setadd(true)}/>
{
  add && <Addnew setadd={setadd} updatecontactlist={updatecontactlist} />
}
{
search && <Search setsearch={setsearch}  contactlist={contactlist} updatecontactlist={updatecontactlist} />
}
</div>
<p className="text-sm ml-4 text-gray-500 font-bold">Start talking now</p>
<div className='overflow-y-scroll h-4/5' id='contactlist'>
{
  contactlist.map((el,ind)=>{
    let id=el.from===userid?el.to:el.from
    return (<div key={ind} className='list' onClick={()=>setuser(el)}>
     <Contact user={el} unseen={unseen} updateunseen={updateunseen} socket={socket}/>
    </div>)
  })
}
</div>
  </div>
);
}