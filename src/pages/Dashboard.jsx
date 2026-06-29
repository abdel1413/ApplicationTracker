import { useEffect, useState } from "react"

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
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6 text-center">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

        <div className="p-4 border rounded shadow text-center">
          <h2 className="text-gray-500 text-xl">Total</h2>
          <p className="text-2xl font-bold mt-1">{total}</p>
        </div>

        <div className="p-4 border rounded shadow text-center">
          <h2 className="text-gray-500 text-xl">Applied</h2>
          <p className="text-2xl font-bold mt-1">{applied}</p>
        </div>

        <div className="p-4 border rounded shadow text-center">
          <h2 className="text-gray-500 tex-xl">Interview</h2>
          <p className="text-2xl font-bold mt-1">{interview}</p>
        </div>

        <div className="p-4 border rounded shadow text-center">
          <h2 className="text-gray-500 text-xl">Offer</h2>
          <p className="text-2xl font-bold mt-1">{offered}</p>
        </div>

        <div className="p-4 border rounded shadow text-center">
          <h2 className="text-gray-500 text-xl">Rejected</h2>
          <p className="text-2xl font-bold mt-1">{rejected}</p>
        </div>

      </div>
    </div>
  );
}
     
//}