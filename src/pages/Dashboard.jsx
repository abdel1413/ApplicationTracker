import { useEffect, useState } from "react"
import {
  FaClipboardList,
  FaPaperPlane,
  FaHandshake,
  FaCheckCircle,
  FaTimesCircle,
  FaChevronRight,
  FaCalendarAlt
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { calculateStatistics } from "../utils/calculateStatistics";
import { toast } from "react-toastify";
import api from "../api/axios";

export const Dashboard =()=>{
   
    const [applications, setApplications] = useState([])
    useEffect(()=>{
        const display = async () => {
          try {
            const response = await api.get(`/api/applications`);
            setApplications(response.data);
            
          } catch (error) {
            console.error('Error loading applications:', error);
            toast.error("Failed to load dashboard")
          }
        };
        display();
    },[])

   const statistics = calculateStatistics(applications)

  const recentApplications =[ ...applications]
  .sort((a, b) => new Date(b.dateApplied) - new Date(a.dateApplied))
  .slice(0, 5);
  
      return (
    <div className=" pt-24  px-5 py-3">

      <h1 className=" text-lg sm:text-xl md:text-3xl font-bold mb-6 text-center">
        Dashboard Overview
      </h1>

      <p className=" text-lg sm:text-xl  md:text-2xl text-gray-600 text-center mb-2">
        Welcome back 👋</p>
        <p className="text-base sm:text-lg md:text-xl  text-gray-600 text-center mb-4">
        Track your applications, interviews, and offers at a glance.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">

        <div className="p-2 sm:p-3  border  shadow-md rounded-xl text-center bg-white  border-t-4 border-blue-500  transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer mb-2">

          <div className="flex items-center justify-center gap-2 mt-1">
            <FaClipboardList  className="text-blue-500 text-2xl md:text-3xl " />
            <h2 className="text-gray-500 text-base sm:text-lg md:text-xl">
              Total</h2>
          </div>
          <p className="text-2xl sm:text-3xl md:text-4xl  font-bold mt-1 ">{statistics.total}</p>
        </div>

        <div className="p-2 sm:p-3 sm:text-sm border rounded-xl shadow-md text-center bg-white  border-t-4 border-sky-500 transition-all duration-300   hover:-translate-y-1 hover:shadow-lg cursor-pointer mb-2">
           
            <div className="flex items-center justify-center gap-2 mt-2">
                <FaPaperPlane className="text-sky-500 text-2xl md:text-3xl" />
                <h2 className="text-gray-500 text-base sm:text-lg md:text-xl">
                  Applied</h2>
            </div>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold mt-0">{statistics.applied}</p>
          </div>

        <div className="p-2 sm:p-3  sm:text-sm border 
         shadow text-center bg-white rounded-xl border-t-4 border-yellow-500 
           shadow-md transition-all duration-300   hover:-translate-y-1 hover:shadow-lg cursor-pointer mb-2">
       <div className="flex items-center justify-center gap-2 mt-2">
            <FaHandshake  className="text-yellow-500 text-2xl md:text-3xl" />
          <h2 className="text-gray-500 text-base sm:text-lg md:text-xl">
            Interview</h2>
       </div>

          <p className="text-2xl sm:text-3xl md:text-4xl font-bold mt-0 ">{statistics.interview}</p>
        </div>

        <div className="p-2 sm:p-3 sm:text-sm  border  text-center bg-white rounded-xl border-t-4 border-green-500  p-4 shadow-md transition-all duration-300   hover:-translate-y-1 hover:shadow-lg cursor-pointer mb-2">
       <div className="flex items-center justify-center gap-2 mt-2">

            <FaCheckCircle className="text-green-500 text-2xl  "  />
          <h2 className="text-gray-500 text-base sm:text-lg md:text-xl">
            Offer</h2>
       </div>
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold mt-0">{statistics.offer}</p>
        </div>

        <div className="p-2 sm:p-3 border text-center bg-white rounded-xl border-t-4 border-red-500 shadow-md transition-all duration-300   hover:-translate-y-1 hover:shadow-lg cursor-pointer col-span-2 md:col-span-1">
           <div className="flex items-center justify-center gap-2 mt-2">

                <FaTimesCircle className="text-red-500 text-2xl md:text-3xl" />

              <h2 className="text-gray-500 text-lg sm:text-xl ">
                Rejected</h2>
            </div>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold mt-0 ">{statistics.rejected}</p>
        </div>

      </div>

      <div className="mt-9">
        <div className="flex items-center justify-between mb-0  px-3 py-2">
          <h2 className="text-base sm:text-lg md:text-xl font-bold  text-gray-700">
            Recent Applications  
          </h2>
          < Link to="/applications" className="text-blue-600 font-semibold text-base md:text-lg hover:underline cursor-pointer">
            View All →
          </Link>
           
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4 min-h-[180px] p-4 transition-all duration-300 bg-white rounded-lg shadow-md ">
          {recentApplications.length === 0 && (
            <p className="text-gray-500 text-lg text-center col-span-full py-8">No recent applications.</p>
          )}
          {recentApplications.map(app => (
              <Link to={`/applications/${app.id}`} 
              className="block border border-gray-300 rounded-lg p-4 bg-white shadow-md transition-all duration-300 hover:shadow-lg hover:border-blue-500 text-gray-700 no-underline" key={app.id}>
           
              <div  className="flex flex-col mb-3 gap-2">
                  <h3 className="text-lg md:text-xl font-bold mr-2 line-clamp-1 mb-2 text-gray-800">{app.company} 
                  <FaChevronRight className="inline-block ml-0 text-blue-500 cursor-pointer hover:translate-x-1 transition-transform duration-200"/>
                  </h3>
                  <p className="text-gray-600 font-medium text-lg mb-3">{app.role}</p>
                  <div className="flex items-center gap-3">
                    <span className={`w-4 h-4 rounded-full ${app.status==='applied' 
                      ? ' bg-blue-500' 
                      : app.status==='interview' 
                      ? 'bg-yellow-500' 
                      : app.status==='offer' 
                      ? 'bg-green-500 ' 
                      : 'bg-red-500 '} `}> </span>
                      <span className="text-gray-500 text-lg font-medium "> {app.status[0].toUpperCase() + app.status.slice(1)}</span>
                  </div>
                  <p className="text-gray-500 text-sm "><FaCalendarAlt className="inline-block mr-2 text-lg"/> 
                  {formatDate(app.dateApplied)}
                  </p>
              </div>
            
              </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
     