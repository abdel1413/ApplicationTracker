
//display all the applications 
// use mvp 
// use local storage to pull and the  existing application
// loop thru them and display each application on the screen.

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {FaCalendarAlt,FaBriefcase, FaExternalLinkAlt} from "react-icons/fa"
import dayjs from "dayjs"
 import {toast} from "react-toastify"



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

    // 1 for permanent deletion, get data from storage
    const data =JSON.parse(localStorage.getItem("applications"))||[]

    // 2 create a variable to hold the  app to be deleted  from localstorage
      const deletedApp = data.find(item => item.id === id)

   

   // 3 update the state with filtered apps
   //  setApplications(filtered)

   // 4 save filtered  to storage 
   //  localStorage.setItem('applications',JSON.stringify(filtered))


      
    //remove the app from the local storage
    const filteredApp = data.filter(app => app.id !==id )

    if(!filteredApp) return;

   // remove the delete app immediately from ui 
   setApplications(filteredApp)

   //wait to 5 sec to delete it permanently from storage
  const deleteTimer =  setTimeout(() => {
     localStorage.setItem('applications', JSON.stringify(filteredApp))
   }, 5000);



     toast(({closeToast})=>(
      
         <div className="flex items-center justify-between gap-4" >
        <span className="">Application deleted successfully!</span>
    
        <button className="ml-4 px-2 py-1  text-blue-500 semi-bold rounded hover:underline transition"
        onClick={()=>{
          //restore the deleted app to the applications list
         // const restoredApplications = [...filtered, deletedApp]
          
         clearTimeout(deleteTimer)

          //restore the app deleted from ui 
          const restoredAppUi = [...filteredApp, deletedApp]

          //setApplications(restoredApplications)

          // update state with restoredAppUi
          // setApplications(restoredAppUi)
          setApplications((prev)=>[...prev, deletedApp])

          closeToast()
          setTimeout(() => {
            
            toast.success("Application restored successfully!")
          }, 100);
      
        }}
        >
          Undo
        </button>
       </div> 
     )),
     
      {
        autoClose: 5000,
         closeOnClick: false,
        // pauseOnHover: true,
        // draggable: true,
        // progress: undefined,
        // theme: "light", 
      }
     
 



    

   }

     // use select option to filter applications 
  
    //  const filtered = filter ==="all"
    //  ? applications
    //  : applications.filter(app => app.status.toLowerCase() === filter)

    //combine  select option with search input result

     const filtered = applications.filter(app =>{
      
      const statusMatch = filter ==='all'||app.status.toLowerCase() === filter

      const searchMatch = search === ""
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
    <div className="pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
       <h1 className="text-2xl font-bold text-center flex items-center justify-center gap-2 mb-4 md:mb-0">
              Applications <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
                {filtered.length}
              </span>
         </h1>
             
        <div className="flex flex-col sm:flex-row  items-stretch sm:items-center justify-center gap-3 my-8 ">
            
                <select name="applications" 
                   value={filter}
                   key={1}
                   onChange={e => setFilter(e.target.value)}
                   className="border rounded px-3 h-10  w-full  sm:w-36"> 
                  <option value="all">All</option>
                  <option value="applied">Applied</option>
                  <option value="interview">Interview</option>
                  <option value="offer">Offer</option>
                  <option value="rejected">Rejected</option>
                </select>
              
           
                <input 
                  type="text" 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search company or role..."
                  className="border rounded px-3 h-10  w-full sm:w-80 lg:w-96"/>
             
           
                <select name="" id=""
                 className="border rounded px-3 h-10 w-full  sm:w-44"
                  value={sortOrder} 
                  onChange={e => setSortOrder(e.target.value)}>
                  <option value="latest">Latest first</option>
                  <option value="oldest">Oldest first</option>
                  <option value="az"> Company A-Z</option>
                  <option value="za">Company Z-A</option>
                </select>
              
           </div>
           
          <div className="space-y-5 ">
            {!filtered.length &&(
              <div className="text-center py-10 bg-gray-50 border rounded">

                <h2 className="text-2xl font-semibold text-red-400">No applications found</h2>
                <p className="text-gray-500  ">
                  try changing your search or filter
                </p>

              </div>
            )}

            {filtered.map(app =>{

           return ( <div 
           className="border border-gray-200 p-4 sm:p-5  rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between  gap-4 hover:shadow-lg transition-all  duration-300"
             key={app.id}>
                
                  <div className="space-y-2 mb-2">
                  
                  <h2 className=" text-lg sm:text-xl font-semibold mb-2">
                    {app.jobPostingUrl? (
                      <a href={app.jobPostingUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline transition-colors duration-200 cursor-pointer">
                        {app.company[0].toUpperCase() + app.company.slice(1)}
                        <FaExternalLinkAlt className="inline-block ml-1 text-sm text-gray-400" />
                      </a>
                    ) : (
                      <span className="  text-lg sm:text-xl font-semibold">{app.company}</span>
                    )}
                  </h2>
                  <p className="flex items-center gap-2 mb-2 text-gray-600 ">
                    <FaBriefcase />
                    {app.role}
                    </p>

                  <p className="flex items-center gap-2 mb-2 text-gray-600">
                    <FaCalendarAlt /> 
                    {dayjs(app.dateApplied).format("MMMM D, YYYY")}
                  </p>
                  <span
                    className={`px-3 py-1 rounded-full inline-block text-sm font-medium mb-2 ${
                      app.status ==="applied"
                      ? "bg-blue-100 text-blue-700 mb-2"
                      : app.status ==="offer"
                      ?"bg-green-100 text-green-700 mb-2"
                      : app.status ==="interview"
                      ? "bg-yellow-100 text-yellow-700 mb-2"
                      : "bg-red-100 text-red-700 mb-2"
                    } `}>{app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  {/* <span className="text-xl space-y-2">{app.status}</span> */}
                   </div>

                   <div className="flex gap-3" >

                      <Link to={`/edit/${app.id}`}
                            className="flex-1 sm:flex-none bg-blue-400 text-white text-sm text-center px-4 py-2  rounded hover:bg-blue-600 transition">
                             Edit
                      </Link>

                     <button 
                     className="flex-1 sm:flex-none bg-red-400  text-white text-sm rounded px-4 py-2 hover:bg-red-600 transition"
                      onClick={()=>{
                        // const confirmDelete = window.confirm(`Are you sure you want to delete ${app.company}?`)
                        // if (confirmDelete) {
                        //   handleDelete(app.id)
                        // }
                        handleDelete(app.id)
                      }}>
                       Delete
                     </button>
                 </div>
             </div>
             )
            })}
          </div>
       </div>
      </div>
       )
}