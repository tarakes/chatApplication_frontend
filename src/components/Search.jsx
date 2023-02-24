
import { useEffect, useState } from 'react';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import ScrollReveal from 'scrollreveal';
import useWindowDimensions from '../hook/useWindowDimensions';
export default function Search({setsearch,contactlist,updatecontactlist}){
const {width}=useWindowDimensions();
const [tempContactList,updatetempContactList]=useState(contactlist);
useEffect(()=>{
    ScrollReveal().reveal('.search',{origin:'left'});
    return ()=>{
        updatecontactlist(tempContactList);
    }
},[])

function Search(name){
    const pattern=`/${name}/`;
    const myuserid=localStorage.getItem('userid');
   
    updatecontactlist(prev=>{
    let arr=prev.filter((el)=>{
        let username=el.from===myuserid?el.toname:el.fromname;
        let userid=el.from===myuserid?el.to:el.from;
        return (username.match(pattern) || userid.match(pattern));
    })
       return arr;
    })

}
if(width>=768)
    return(
        <div className="fixed bg-white flex w-1/5
         translate-y-3 translate-x-3 p-3 z-20 search">
        <input type='text' placeholder='Type name to find...'   onChange={(e)=>Search(e.target.value)}
         className="rounded-lg p-3 border-gray-200 border-2 w-full "/>
      <AiOutlineCloseCircle className='scale-150 ml-2 mt-3  cursor-pointer' onClick={()=>setsearch(false)}/>
        </div>
    );
    else
    return(
        <div className="fixed bg-white flex w-3/5
         translate-y-3 translate-x-3 p-3 z-20 search">
        <input type='text' placeholder='Type name to find...'    onChange={(e)=>Search(e.target.value)}
         className="rounded-lg p-3 border-gray-200 border-2 w-full "/>
      <AiOutlineCloseCircle className='scale-150 ml-2 mt-3  cursor-pointer' onClick={()=>setsearch(false)}/>
        </div>
    );
}