import { Link, NavLink } from "react-router-dom"

export const Navbar =()=>{


    return(<>
   

 

    <nav className=" fixed top-0 left-0 w-full mb-9 border-b h-16 text-lg  bg-white  px-8 shadow-sm z-50 ">
       <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex  items-center justify-between">
         <h1 className=" text-lg sm:text-xl font-bold text-blue-600">
        JobTracker
        </h1>
        <div  className="flex gap-4 sm:gap-8 sm:text-base font-medium">
            <NavLink to="/"  end
            className={activeNavLink}>
            Dashboard
            </NavLink>

            <NavLink to="/Add"
            className={activeNavLink}>
            Add 
            </NavLink>

            <NavLink to="/Applications"
            className={activeNavLink}>
            Applications
            </NavLink>
         </div>
       </div>
     </nav>
    </>)
}


const activeNavLink = ({isActive}) => isActive ? "text-blue-500  border-b-2 border-blue-500 pb-1" : "text-gray-700 hover:text-blue-500 pb-1 transition-colors duration-200"