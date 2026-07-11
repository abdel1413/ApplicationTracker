import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { FaBriefcase, FaExchangeAlt } from "react-icons/fa"
import { Link, useParams } from "react-router-dom"

export const ViewApplication =()=>{
    const {id} = useParams()
  const [application, setApplication] = useState(null)  
   
  useEffect(()=>{
      const data = JSON.parse(localStorage.getItem('applications'))||[]
  
      const selectedApplication = data.find(app => app.id === id) 
      setApplication(selectedApplication)|| null
  },[id])
  console.log('app',application)
  if(!application){
      return (
      <div className="pt-24 px-4 text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-3">Application not found</h1>
           <Link to="/applications"
           className="text-blue-500 text-medium hover:underline"/>
            Back to Applications
  
      </div>)
  }

  const formattedStatus = application.status.charAt(0).toUpperCase() + application.slice(1)
 return (
    <div>
        <h1>{application.company}</h1>
        <p><FaBriefcase /> {application.role}</p>
        <span
        className={`self-start px-3 py-1 text-sm font-medium"${
            application.status==="applied"
        ? "bg-blue-100 text-blue-700"
        : application.status==='offer'
        ? 'bg-green-100 text-green-700'
        : application.status==='interview'
        ? 'bg-yellow-100 text-yellow-700'
        : "bg-red-100 text-red-700"}`}
    
        >{formattedStatus}</span>
        <div>{dayjs(application.dateApplied).format("MMMM D, YYYY")}</div>
        {application.jobPostingUrl &&(
            <div>
                <h2>Job posting</h2>
                <a href={application.jobPostingUrl}
                rel='noopener noreferrer'
                target="_blank"
                > open job url
                <FaExchangeAlt className="text-sm"/>
                </a>
            </div>
        )
    }
    <div>
        <h2>Notes</h2>
       <p>{application.note || "No note added."}</p> 
    </div>
        
        <div>
            <Link to="/applications">Back</Link>
            <Link to={`/edit/${application.id}`}>Edit application</Link>
        </div>
    </div>

 )
}
