import { Link } from "react-router-dom"

export const  NotFound =()=>{
    return (<div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-5xl font-bold mb-4 text-blue-500">404</h1>
        <h2 className="text-gray-800 font-semibold mb-2">Page not found</h2>
        <p className="text-gray-500 mb-6 ">the page you're looking for doesn't exist</p>

        <Link className="text-blue-500 px-4 py-2 text-white rounded  hover:text-blue-600 transition">Back to Dashboard</Link>
        </div>
        )

}