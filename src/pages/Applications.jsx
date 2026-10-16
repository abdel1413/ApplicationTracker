
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {FaCalendarAlt,FaBriefcase, FaExternalLinkAlt, FaEdit, FaEye, FaTrash, FaTimes} from "react-icons/fa"
 import {toast} from "react-toastify"
import { formatDate } from "../utils/formatDate"

import api from "../api/axios"

export const Applications =()=>{    
    const [applications, setApplications] = useState([])
     const [filter, setFilter] = useState("all")
     const [search, setSearch] = useState("")
     const [sortOrder, setSortOrder] = useState('latest')
     const [applicationToDelete, setApplicationToDelete] =useState(null)
   

     const loadApplications=  async ()=>{
       const response = await api.get(`/api/applications`);
       setApplications(response.data);
     }
   
   useEffect(()=>{
    loadApplications()
   },[])

   const handleDelete =(id)=>{
  
      const deletedApp = applications.find(item => item.id === id)
      const filteredApp = applications.filter(app => app.id !==id )
    if(!deletedApp) return;
   setApplications(filteredApp)
  const deleteTimer =  setTimeout(async () => {
    try {
      await api.delete(`/api/applications/${id}`)
    } catch (error) {
      console.log(error)
      setApplications(data)
      toast.error("Failed to delete application")
    }
   }, 5000);

     toast(({closeToast})=>(
         <div className="flex items-center justify-between gap-4" >
        <span className="">Application deleted successfully!</span>
    
        <button className="ml-4 px-2 py-1  text-blue-500 font-semibold rounded hover:underline transition"
        onClick={()=>{
           clearTimeout(deleteTimer)
          setApplications(applications)
          closeToast()
            toast.success("Application restored successfully!")
        }}
        >
          Undo
        </button>
       </div> 
     ), {
        autoClose: 5000,
         closeOnClick: false,
         pauseOnHover: false,
       
      });
     
   }

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

    //export the content or values of application as csv 
    //so customer can download and read on excel google sheet or apple numbers
    const exportToCSV =()=>{
    
      const data = applications;
      if(!data.length){
        toast('No application available to export ')
        return 
      }

     
       const headers = [
    "Company",
    "Role",
    "Status",
    "Date Applied",
    "Job Posting URL",
    "Notes",
  ];


  
  const rows = data.map(app =>[
    app.company,
    app.role,
    app.status,
    app.dateApplied,
    app.jobPostingUrl || "",
    app.notes||"",

  ]);


  const escapeCSVValue = (value)=>{
    const text = String(value??"").replace(/"/g, '""')
  
    return `"${text}"`
  }


  const cvsContent = [
    headers.map(escapeCSVValue).join(","),
    ...rows.map(row => 
      row.map(escapeCSVValue).join(",")
    ),
  ].join("\n")

  const blob = new Blob([cvsContent],{type:"text/csv;charset=utf-8;"});
  const url = URL.createObjectURL(blob);
  const  link = document.createElement('a')
  link.href = url;
  const today = new Date().toISOString().split("T")[0]
  link.download = `job-applications-${today}.csv`

  document.body.appendChild(link)
  link.click();
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
  toast.success('Applications exported successful!')
  
    } 
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
              <button
              onClick={exportToCSV}
              className="w-full sm:w-auto  bg-green-400 text-white px-4 py-2 rounded  hover:bg-green-600 transition cursor-pointer whitespace-nowrap"
              >Export CSV</button>
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
                      <a href={app.jobPostingUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline transition-colors duration-200 cursor-pointer flex items-center justify-center">
                       <span className="h-9 w-9 text-center rounded-full bg-blue-500  text-white font-bold  mr-2">{app.company[0].toUpperCase()}</span> {app.company[0].toUpperCase() + app.company.slice(1)}
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
                   
                    {formatDate(app.dateApplied)}
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
        
                   </div>

                   <div className="flex gap-3 " >
                      <Link to={ `/applications/${app.id}`}
                        className=" flex flex-1 sm:flex-none bg-gray-700 text-white text-sm text-center px-4 py-3 rounded hover:bg-gray-800 transition " >
                        <FaEye className="mr-1 text-xl"/>
                        View
                      </Link>

                      <Link to={`/edit/${app.id}`}
                            className=" flex flex-1 sm:flex-none bg-blue-400 text-white text-sm text-center px-4 py-3  rounded hover:bg-blue-600 transition">
                            <FaEdit className="mr-1 text-xl"/>
                             Edit
                      </Link>

                <button
                type="button"
                 className=" flex flex-1 sm:flex-none bg-red-500 text-white text-sm text-center px-4 py-3 rounded hover:bg-red-600 transition " 
                 onClick={()=>setApplicationToDelete(app)}>
                  <FaTrash  className="mr-1 text-xl"/>
                  Delete
                </button>
                 </div>
             </div>
             )
            })}
          </div>

       </div>
        {applicationToDelete &&(
              <div className="fixed inset-0 z-50 flex px-4 items-center justify-center bg-black/50">
                  <div className="w-full max-w-sm rounded-xl bg-white shadow-xl p-2  ">
                        <h2 className="text-xl font-bold text-gray-800">Delete application?</h2>
                        <p className="mt-2 text-gray-600">
                          Are you sure you want to delete  
                          <span className="font-semibold ml-1 mr-1">{applicationToDelete.company.charAt(0).toUpperCase()+ applicationToDelete.company.slice(1)}</span>
                           ?
                        </p>

                        <div className=" flex mt-6 gap-2 justify-end" >
                          <button
                          type="button"
                          className="  flex items-center border border-gray-500 rounded px-4 py-3 hover:bg-gray-100 transition"
                          onClick={()=>setApplicationToDelete(null)}
                          > 
                          <FaTimes className="mr-1 text-xl "/>
                              Cancel
                          </button>

                          <button type="button"
                          className="flex items-center sm:flex-none bg-red-400  text-white text-sm rounded px-4 py-3 hover:bg-red-600 transition"
                          onClick={()=>{
                            handleDelete(applicationToDelete.id)
                            setApplicationToDelete(null)
                          
                          }}>
                            < FaTrash className="mr-1 text-xl"/>
                          Delete
                         </button>
                      </div>
                 </div>
              </div>
            )}
      </div>
       )
}