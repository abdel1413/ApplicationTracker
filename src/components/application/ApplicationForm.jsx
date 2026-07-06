import { useState } from "react"
import {useNavigate} from "react-router-dom"
import { toast } from "react-toastify"
export const ApplicationForm = ({onSubmit})=>{
    const [formData, setFormData] = useState(initialState)
    // const [toastMessage, setToastMessage] = useState(false) 
    const navigate = useNavigate()
   
    const handleSubmit =(e)=>{ 
         e.preventDefault();
         if(!formData.company || !formData.role || !formData.status ) {
            alert("please, fill up  all the fields")
        return 
    }

    //create a new application 
    const newApplication = {
        id: crypto.randomUUID(),
        ...formData,
       createdAt: new Date().toISOString()
    }

      //pass new app to prop 
      
     onSubmit(newApplication)

//       setToastMessage(true)
//       setTimeout(()=>{
//          setToastMessage(false)

//       },5000)
//    setToastMessage(true)
//       setTimeout(()=>{
//          navigate('/Applications')
//       }  ,8000)

     
     toast.success("Application saved successfully!")
     setTimeout(()=>{
        navigate('/Applications')
     },7000)

     setFormData(initialState)

    }
    const handleChange =(e)=>{
        const {name, value} = e.target; 
        setFormData((prev) =>( {...prev, [name]: value }))
    }



    return (<>
    {/* {toastMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
             ✅ Application saved successfully!
        </div>
    )  } */}
    <form className="max-w-xl mx-auto bg-white shadow shadow-lg   p-6 space-y-5 mt-20 bg-gray-100  "
    onSubmit={handleSubmit}>
        <div>
            <h2 className="text-xl font-bold text-center mb-4">
                Add Application
            </h2>
            <label className="block ">Company: </label>
            <input
             type="text" 
            placeholder="company name "
            name="company"
            value={formData.company}
            onChange={handleChange} 
            className="w-full  md:w-96 px-3 h-10 border rounded placeholder-gray-400  "
            />
            <label className="block ">Job URL: </label> <input
             type="url" 
            placeholder="https://careers.company.com/..."
            name="jobPostingUrl"
            value={formData.jobPostingUrl}
            onChange={handleChange} 
            className="w-full  md:w-96 px-3 h-10 border rounded placeholder-gray-400  "
            />
        </div>
        <div className="mt-0">
            <label  className="block ">Role: </label>

            <input type="text"
            name="role"
            value={formData.role}
            onChange={handleChange} 
            placeholder="What role ? "
            className="w-full px-4 py-2 border rounded "
            />
        </div>
        <div  className="mt-0">
            <label  className="block ">Date applied</label>
            <input type="date"
            name="dateApplied"
            value={formData.dateApplied}
            onChange={handleChange}
            placeholder="date applied" 
            className="w-full px-4 py-2 border rounded "/>
        </div>
        <div>
            <label className="block ">Status:</label>
            <select
             name="status" 
            id="" 
            value={formData.status.toLowerCase()}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            >
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
            </select>
        </div>
        <div>
            <button
             type="submit"
             className=" w-full bg-black text-white py-3 rounded"
             >
               Save application
            </button>
        </div>
    </form>
    </>)
}


const initialState = {

    company: "",
    jobPostingUrl: "",
    role : "",
    dateApplied: "",
    status : "applied"
}