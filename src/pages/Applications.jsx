
//display all the applications 
// use mvp 
// use local storage to pull and the  existing application
// loop thru them and display each application on the screen.

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


export const Applications =()=>{    
    const [applications, setApplications] = useState([])
     const [filter, setFilter] = useState("all")
     const [search, setSearch] = useState("")
     const [sortOrder, setSortOrder] = useState('latest')

   

     const loadApplications= ()=>{

       const data =JSON.parse(localStorage.getItem('applications'))||[]
       setApplications(data)
     }

   // get all applications once so we use useEffect()and pass [] as dependency
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
  
    //  const filtered = filter ==="all"
    //  ? applications
    //  : applications.filter(app => app.status.toLowerCase() === filter)

    //combine  select option with search input result

     const filtered = applications.filter(app =>{
      const statusMatch = filter ==='all'||app.status.toLowerCase() ===filter

      const searchMatch = search ===""
      || app.company.toLowerCase().includes(search.toLowerCase())
      ||app.role.toLowerCase().includes(search.toLowerCase()) 

      return statusMatch && searchMatch
     }).sort((a,b)=> {
      if(sortOrder === 'latest'){
      return    new Date(b.dateApplied).getTime()
     - new Date(a.dateApplied).getTime()
    }else if(sortOrder === 'oldest'){
       return new Date(a.dateApplied).getTime()-
     new Date(b.dateApplied).getTime()
    } else if (sortOrder === 'az'){
      return a.company.localeCompare(b.company)
    }else if(sortOrder === 'za'){
      return b.company.localeCompare(a.company)
    }

   return 0
  
    
  }

     
    )
   
    
    return (
    <div className="p-6">
       <h1 className="text-2xl font-bold text-center ">
              Applications
            </h1>
             
        <div className="flex  items-center justify-center gap-4 my-8 mb-8">
            <div >
                <select name="applications" 
                
                   value={filter}
                   key={1}
                   onChange={e => setFilter(e.target.value)}
                   className="border rounded px-3 h-10 ">
                  <option value="all">All</option>
                  <option value="applied">Applied</option>
                  <option value="interview">Interview</option>
                  <option value="offer">Offer</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div >
                <input 
                  type="text" 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search company or role..."
                  className="border rounded   px-3 w-80  h-10 "/>
              </div>
              <div  >
                <select name="" id=""
                 className="border rounded px-3 h-10 "
                  value={sortOrder} 
                  onChange={e => setSortOrder(e.target.value)}>
                  <option value="latest">Latest first</option>
                  <option value="oldest">Oldest first</option>
                  <option value="az"> Company A-Z</option>
                  <option value="za">Company Z-A</option>
                </select>
              </div>
             </div>
           
          <div className="max-w-6xl mx:auto px-6 m-5 ">

            {!filtered.length &&(<div className="text-center py-10 bg-gray-50 border rounded">
              <h2 className="text-2xl font-semibold text-red-400">No applications found</h2>
              <p className="text-gray-500  ">
                try changing your search or filter
              </p>

              </div>)}

            {filtered.map(app =>{

           return  < div className="border p-4 rounded shadow flex justify-between  items-center m-5 "
             key={app.id}>
                <div  >
                  <h2 className="font-bold ">{app.company}</h2>
                  <p>{app.role}</p>
                  <p>{app.dateApplied}</p>
                  <span
                  className={`px-3 py-1 rounded-full text-sm font-medium m-1 ${
                    app.status ==="applied"
                    ? "bg-blue-400 text-blue-500"
                    : app.status ==="offer"
                    ?"bg-green-400 text-green-500"
                    : app.status ==="interview"
                    ? "bg-yellow-400 text-yellow-500"
                    : "bg-red-500 text-red-500"
                  } `}></span>
                  <span className="text-xl">{app.status}</span>
                </div>
                 <div className="flex gap-2" >
                    <Link to={`/edit/${app.id}`}
                    
                    className="bg-blue-500 text-white px-4 py-2 rounded">
                        Edit</Link>

                <button className="bg-red-500  text-white rounded px-4 py-2"
                onClick={()=>handleDelete(app.id)}>
                    Delete
                </button>
                 </div>
             </div>
            })}
          </div>
           
   {} </div>)
}