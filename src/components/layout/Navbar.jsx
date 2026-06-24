import { Link } from "react-router-dom"

export const Navbar =()=>{
    return(<>
   
       <nav>
        <Link to="/" >Dashboard</Link>
        <Link to="/AddApplication"> Add </Link>
        <Link to="/Applications">Applications</Link>
        <Link to="/EditApplication">Edit</Link>
        <Link to="/NotFound">Not Found</Link>
        
       </nav>
    </>)
}