
//display all the applications 
// use mvp 
// use local storage to pull and the  existing application
// loop thru them and display each application on the screen.

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


export const Applications =()=>{    
    const [applications, setApplications] = useState([])
     const [filter, setFilter] = useState("all")

   

     const loadApplications= ()=>{

       const data =JSON.parse(localStorage.getItem('applications'))||[]
       setApplications(data)
     }

   // get all applications once so we use useEffect()
   useEffect(()=>{
    loadApplications()
   },[])

   //to delete filter out all the items whose id is same as the param's id
   // update the application using setApplication
   // save updated into storage
   const handleDelete =(id)=>{
    const data =JSON.parse(localStorage.getItem("applications"))||[]


    const filtered = data.filter(item => item.id !==id)

    setApplications(filtered)

    localStorage.setItem('applications',JSON.stringify(filtered))

   }

     // use select option to filter applications 
  
     const filtered = filter ==="all"
     ? applications
     : applications.filter(app => app.status.toLowerCase() === filter)

    
    console.log('filtered',filter)
    return (<div className="p-6">
         <div  className="flex  items-center justify m-auto">
            <h1 className="text-2xl font-bold text-center ">
              Applications
            </h1>
            <div className="border border-rounded m-6">
                <select name="applications" 
                   value={filter}
                   key={1}
                   onChange={e => setFilter(e.target.value)}>
                  <option value="all">All</option>
                  <option value="applied">Applied</option>
                  <option value="interview">Interview</option>
                  <option value="offer">Offer</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
         </div>
          <div className="space-y-4">
            {filtered.map(app =>{
           return   <div className="border p-4 rounded shadow flex justify-between items-center"
             key={app.id}>
                <div>
                <h2 className="font-bold ">{app.company}</h2>
                <p>{app.role}</p>
                <p>{app.dateApplied}</p>
                <span>{app.status}</span>
                </div>
                 <div className="flex gap-2" >
                    <Link to={`/edit/${app.id}`}
                    
                    className="bg-blue-500 text-white px-3 py-1 rounded">
                        Edit</Link>

                <button className="bg-red-500  text-white rounded px-3 py-1"
                onClick={()=>handleDelete(app.id)}>
                    Delete
                </button>
                 </div>
             </div>
            })}
          </div>
           
   {} </div>)
}