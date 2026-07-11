import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { FaBriefcase, FaCalendar, FaExchangeAlt } from "react-icons/fa"
import { Link, useParams } from "react-router-dom"

export const ViewApplication =()=>{
    const {id} = useParams()
  const [application, setApplication] = useState(null)  
   
  useEffect(()=>{
      const data = JSON.parse(localStorage.getItem('applications'))||[]
      
      const selectedApplication = data.find(app => app.id === id) 
      console.log(selectedApplication)
      setApplication(selectedApplication)|| null
  },[id])
 
  if(!application){
      return (
      <div className="pt-24 px-4 text-center mb-3">
          <h1 className="text-2xl font-bold text-red-500 mb-3">Application not found</h1>
           <Link to="/Applications"
           className="text-blue-500 text-medium hover:underline">
            Back to Applications 
            </Link>
  
      </div>
      )
  }

   console.log('app',application)

  const formattedStatus = application.status.charAt(0).toUpperCase() + application.status.slice(1)
 
  return (

    <div className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-xl shadow-sm p-6 sm:p-8">
        <div className="flex flex-col sm: flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div>

            <h1 className="text-2xl sm:3xl font-bold text-gray-800">{application.company}</h1>
            <p className="flex gap-2 items-center text-gray-600 mt-2 ">
                <FaBriefcase /> 
                {application.role}
            </p>
            </div>
            <span
            className={`self-start px-3 py-1 text-sm font-medium rounded-full"${
                application.status==="applied"
            ? "bg-blue-100 text-blue-700"
            : application.status==='offer'
            ? 'bg-green-100 text-green-700'
            : application.status==='interview'
            ? 'bg-yellow-100 text-yellow-700'
            : "bg-red-100 text-red-700"}`}
        
            >{formattedStatus}
            </span>

        </div>

        <div className="space-y-5">
            <div>
                <h1 className="font-semibold text-gray-800" >Date Applied</h1>
                <p className="flex items-center gap-2 mt-1 text-gray-600">
                    <FaCalendar/>
                    {dayjs(application.dateApplied).format("MMMM D, YYYY")}
                </p>  
            </div>
            {application.jobPostingUrl &&(
                <div>
                    <h2 className="text-gray-800 font-semibold">Job Posting</h2>
                    <a href={application.jobPostingUrl}
                    rel='noopener noreferrer'
                    target="_blank"
                    className="inline-flex gap-2 text-blue-600 items-center hove:underline break-all"
                    > open job url
                    <FaExchangeAlt className="text-sm"/>
                    </a>
                </div>
               )
             }
            <div>
                <h2 className="font-semibold text-gray-800">Notes</h2>
                <p className="text-gray-600 mt-1 whitespace-pre-wrap">
                {application.note || "No note added."}</p> 
            </div>
        </div>
        
        <div className="fex flex-col sm:flex-row gap-3 mt-8 ">
            <Link 
            to="/Applications"
            className="text-center border border-gray-300 px-4 py-2 rounded hover:border-gray-100 transition">
            Back
            </Link>

            <Link to={`/edit/${application.id}`}
            className="bg-blue-500 text-center px-4 py-3 text-white rounded hover:bg-blue-600 transition ">
            Edit application
            </Link>
        </div>
     </div>
 </div>

 )
}
