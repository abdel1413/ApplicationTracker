import { useEffect, useState } from "react"
import {
  FaClipboardList,
  FaPaperPlane,
  FaHandshake,
  FaCheckCircle,
  FaTimesCircle
} from "react-icons/fa";

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
    </div>
  );
}
     
//}