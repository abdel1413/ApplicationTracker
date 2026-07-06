import { Link, NavLink } from "react-router-dom"
 import{HiMenu, HiX} from "react-icons/hi"
 import { useState } from "react"
export const Navbar =()=>{
  const [menuOpen, setMenuOpen] = useState(false)



    return(<>
    <nav className=" fixed top-0 left-0 w-full mb-9 border-b h-16 text-lg  bg-white  px-8 shadow-sm z-50 ">
       <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <h1 className=" text-lg sm:text-xl font-bold text-blue-600">
            JobTracker
            </h1>
           <div  className="hidden sm:flex gap-8 font-medium ">
                <NavLink to="/"  end
                className={activeNavLink}>
                Dashboard </NavLink>

                <NavLink to="/Add"
                className={activeNavLink}>
                Add  </NavLink>

               <NavLink to="/Applications"
                className={activeNavLink}>
                Applications </NavLink>
            </div>
            <button className="sm:hidden "
            onClick={()=> setMenuOpen(!menuOpen)}>
                {menuOpen ? <HiX size={28}/> : <HiMenu size={28}/>}
            </button>

       </div>
       {menuOpen && (
        <div className={`sm:hidden overflow-hidden bg-white border-t shadow-md transition-all duration-300 ease-in-out ${
    menuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
  }`}>
            <div className="flex flex-col gap-4 p-4">
                <NavLink to="/"  end
                className={mobileNavLink}
                onClick={()=> setMenuOpen(false)}>
                Dashboard 
                </NavLink>

                <NavLink to="/Add"
                className={mobileNavLink}
                onClick={()=> setMenuOpen(false)}>
                Add  </NavLink>

               <NavLink to="/Applications"
                className={mobileNavLink}
                onClick={()=> setMenuOpen(false)}>
                Applications </NavLink>
            </div>
        </div>

       )}

     </nav>
    </>)
}


const activeNavLink = ({isActive}) => isActive 
? "text-blue-500  border-b-2 border-blue-500 pb-1" 
: "text-gray-700 hover:text-blue-500 pb-1 transition-colors duration-200"


const mobileNavLink = ({ isActive }) => isActive
    ? "block px-6 py-4 bg-blue-50 text-blue-600 font-semibold"
    : "block px-6 py-4 text-gray-700 hover:bg-gray-100";