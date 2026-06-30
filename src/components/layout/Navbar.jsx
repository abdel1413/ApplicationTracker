import { Link } from "react-router-dom"

export const Navbar =()=>{
    return(<>
   


    <nav className="border-b h-16 text-lg flex  items-center justify-between bg-white  px-8">
       
         <h1 className="text-xl font-bold text-blue-600">
        JobTracker
        </h1>
        <div  className="flex gap-8 font-medium">
            <Link to="/" 
            className="hover:text-blue-500">
            Dashboard
            </Link>

            <Link to="/Add"
            className="hover:text-blue-500">
            Add 
            </Link>

            <Link to="/Applications"
            className="hover:text-blue-500">
            Applications
            </Link>
       </div>
     </nav>
    </>)
}