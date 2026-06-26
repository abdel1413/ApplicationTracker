import { Link } from "react-router-dom"

export const Navbar =()=>{
    return(<>
   
       <nav className="border border-2 p-4 text-lg flex gap-6 items-center justify ">
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
       
       </nav>
    </>)
}