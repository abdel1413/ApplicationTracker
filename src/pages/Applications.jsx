
//display all the applications 
// use mvp 
// use local storage to pull and the  existing application
// loop thru them and display each application on the screen.

import { useEffect, useState } from "react"


export const Applications =()=>{    
    const [applications, setApplications] = useState([])

   // get all applications once so we use useEffect()
   useEffect(()=>{
    const data =JSON.parse(localStorage.getItem('applications'))||[]
    
    setApplications(data)
   },[])

   //to delete filter out all the items whose id is same as the param's id
   // update the application using setApplication
   // save updated into storage
   const handleDelete =(id)=>{
    const filtered = applications.filter(item => item.id !==id)
    setApplications(filtered)

    localStorage.setItem('applications',JSON.stringify(filtered))

   }

    return (<div className="p-6">
          <h1 className="text-2xl font-bold mb-4 text-center justify">
            Applications
          </h1>
          <div className="space-y-4">
            {applications?.map(app =>{
           return   <div className="border p-4 rounded shadow flex justify-between items-center"
             key={app.id}>
                <div>
                <h2 className="font-bold ">{app.company}</h2>
                <p>{app.role}</p>
                <p>{app.dateApplied}</p>
                <span>{app.status}</span>
                </div>
                <button className="bg-red-500  text-white rounded px-3 py-1"
                onClick={()=>handleDelete(app.id)}>
                    Delete
                </button>
             </div>
            })}
          </div>
           
   {} </div>)
}