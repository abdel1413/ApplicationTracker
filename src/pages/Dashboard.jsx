import { useEffect, useState } from "react"

export const Dashboard =()=>{
    //get all the applications
    //filter and display them base on their stats
    // applied, offer, ...
    const [applications, setApplications] = useState([])
    useEffect(()=>{

        const data = JSON.parse(localStorage.getItem('applications'))
        console.log(data)
        setApplications(data)

    },[])

  const applied = applications.filter(app => app.status === 'Applied').length;

  const offered = applications.filter(app => app.status === 'Offer').length;

  const rejected = applications.filter(app => app.status === 'Rejected').length;
  
  const interview  = applications.filter(app => app.status === 'Interview').length;


    return (
    <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="border-rounded p-6 text-center">
                <h2>Total</h2>
                <p >{applications.length}</p>
            </div>
            <div className="border-rounded p-6 text-center">
                <h2>Applied</h2>
                <p >{applied}</p>
            </div>
            <div className="border-rounded p-6 text-center">
                <h2>Interview</h2>
                <p  >{interview}</p>
            </div>
            <div className="border-rounded p-6 text-center">
                <h2>Offer</h2>
                <p >{offered}</p>
            </div>
            <div className="border-rounded p-6 text-center">
                <h2>Rejected</h2>
                <p>{rejected}</p>
            </div>
        </div>
     </div>
     )
}