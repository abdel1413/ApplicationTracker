import dayjs from "dayjs";
import { useEffect, useState } from "react"
import {
  FaClipboardList,
  FaPaperPlane,
  FaHandshake,
  FaCheckCircle,
  FaTimesCircle,
  FaChevronRight
} from "react-icons/fa";
import { Link } from "react-router-dom";
import {FaCalendarAlt} from "react-icons/fa"

export const Dashboard =()=>{
    //get all the applications
    //filter and display them base on their stats
    // applied, offer, ...
    const [applications, setApplications] = useState([])
    useEffect(()=>{

        const data = JSON.parse(localStorage.getItem('applications'))

        setApplications(data)

    },[])

const total =  applications.length; 

  const applied = applications.filter(app => app.status === 'applied').length;

  const offered = applications.filter(app => app.status === 'offer').length;

  const rejected = applications.filter(app => app.status === 'rejected').length;
  
  const interview  = applications.filter(app => app.status === 'interview').length;

  const recentApplications =[ ...applications]
  .sort((a, b) => new Date(b.dateApplied) - new Date(a.dateApplied))
  .slice(0, 5);
  
      return (
    <div className="p-6 mt-20 ">

      <h1 className="text-2xl font-bold mb-6 text-center">
        Dashboard Overview
      </h1>

      <p className="text-gray-600 text-center mb-2">
        Welcome back 👋</p>
        <p className="text-gray-600 text-center mb-6">
        Track your applications, interviews, and offers at a glance.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 flex-wrap justify-center">

        <div className="p-4 border rounded shadow text-center bg-white rounded-xl border-t-4 border-blue-500  p-4 shadow-md transition-all duration-300   hover: translate-y-1 hover:shadow-lg cursor-pointer">

          <div className="flex items-center justify-center gap-3 mt-2">

          <FaClipboardList  className="text-blue-500 text-3xl  " />
          <h2 className="text-gray-500 text-xl">
            Total</h2>
          </div>

          <p className="text-4xl font-bold mt-1">{total}</p>
        </div>

        <div className="p-4 border rounded shadow text-center bg-white rounded-xl border-t-4 border-sky-500  p-4 shadow-md transition-all duration-300   hover: translate-y-1 hover:shadow-lg cursor-pointer">
            <div className="flex items-center justify-center gap-3 mt-2">

                <FaPaperPlane className="text-sky-500 text-3xl " />
                <h2 className="text-gray-500 text-xl">
                  Applied</h2>
            </div>
            <p className="text-4xl font-bold mt-1">{applied}</p>
          </div>

        <div className="p-4 border rounded shadow text-center bg-white rounded-xl border-t-4 border-yellow-500  p-4 shadow-md transition-all duration-300   hover: translate-y-1 hover:shadow-lg cursor-pointer">
       <div className="flex items-center justify-center gap-3 mt-2">

            <FaHandshake  className="text-yellow-500 text-3xl" />
          <h2 className="text-gray-500 text-xl">
            Interview</h2>
       </div>

          <p className="text-4xl font-bold mt-1">{interview}</p>
        </div>

        <div className="p-4 border rounded shadow text-center bg-white rounded-xl border-t-4 border-green-500  p-4 shadow-md transition-all duration-300   hover: translate-y-1 hover:shadow-lg cursor-pointer">
       <div className="flex items-center justify-center gap-3 mt-2">

            <FaCheckCircle className="text-green-500 text-3xl "  />

          <h2 className="text-gray-500 text-xl">
            Offer</h2>
       </div>
          <p className="text-4xl font-bold mt-1">{offered}</p>
        </div>

        <div className="p-4 border rounded shadow text-center bg-white rounded-xl border-t-4 border-red-500  p-4 shadow-md transition-all duration-300   hover: translate-y-1 hover:shadow-lg cursor-pointer">
       <div className="flex items-center justify-center gap-3 mt-2">

            <FaTimesCircle className="text-red-500 text-3xl" />

          <h2 className="text-gray-500 text-xl">
            Rejected</h2>
       </div>
          <p className="text-4xl font-bold mt-1">{rejected}</p>
        </div>

      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">


      <h2>
        Recent Applications  
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        View All →
        </div>
           
        </div>
        <div>
          {recentApplications.map(app => (
              <Link to={`/edit/${app.id}`} className=" border border-gray-300 rounded-lg p-4 mb-2 bg-white shadow-md transition-all duration-300 hover:shadow-lg hover:border-blue-500" key={app.id}>
            <div key={app.id} className=" flex gap-6 border rounded p-4 mb-4 bg-white shadow-md transition-all duration-300 hover:shadow-lg">
              <div className="flex flex-col mb-2 gap-2 ">
                  <h3 className="text-xl md:text-lg font-semibold mr-2 ">{app.company} 
                  <FaChevronRight className="inline-block ml-0 text-blue-500 cursor-pointer"/>
                  </h3>
                  <p className="text-gray-700 font-medium">{app.role}</p>
                  <div className="flex items-center gap-2">
                 <span className={`w-4 h-4 rounded-full ${app.status==='applied' 
                  ? ' bg-blue-500' 
                  : app.status==='interview' 
                  ? 'bg-yellow-500' 
                  : app.status==='offered' 
                  ? 'bg-green-500 ' 
                  : 'bg-red-500 '} `}> </span>
                  <span className="text-gray-500 text-lg font-medium "> {app.status[0].toUpperCase() + app.status.slice(1)}</span>
                  </div>
                  <p className="text-gray-500 text-sm "><FaCalendarAlt className="inline-block mr-2 text-lg"/> {dayjs(app.dateApplied).format("MMMM D, YYYY")}</p>
              </div>
            </div>
              </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
     
//}