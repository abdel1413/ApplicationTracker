import { useState } from "react"
import {useNavigate} from "react-router-dom"
import { toast } from "react-toastify"

export const ApplicationForm = ({onSubmit})=>{
    const [formData, setFormData] = useState(initialState)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate()
   
    const handleSubmit = async (e)=>{ 
         e.preventDefault();
         if(!formData.company.trim() 
            || !formData.role.trim()
            || !formData.status 
            || !formData.dateApplied) {
             toast.error("Please fill in all required fields.");
        return 
    }

  
    const newApplication = {
        ...formData,
        company:formData.company.trim(),
        role: formData.role.trim(),
        notes: formData.notes.trim(),
    }

    setIsSubmitting(true);
   try {
    await onSubmit(newApplication)
      toast.success("Application saved successfully!")
      setFormData(initialState)
     setTimeout(()=>{
        navigate('/Applications')
         },1500)
   } catch (error) {
    console.error('Error saving application:', error)
    toast.error("Failed to save application.")
   } finally {
    setIsSubmitting(false);
   }

    }

    const handleChange =  (e)=>{
        const {name, value} = e.target; 
        setFormData((prev) =>( {...prev, [name]: value }))
    }

    return (
    <form className="max-w-xl mx-auto bg-white shadow-lg p-6 space-y-5 mt-20 "
    onSubmit={ handleSubmit}>
        <div className="space-y-2">
            <h2 className="text-xl font-bold text-center mb-4">
                Add Application
            </h2>
            <label htmlFor="company" className="block">Company: </label>
            <input
             type="text" 
            placeholder="company name "
            id='company'
            name="company"
            value={formData.company}
            onChange={handleChange} 
            className="w-full  px-4 py-3 h-10 border rounded placeholder-gray-400  "
            />
            <label htmlFor="jobPostingUrl" className="block ">Job URL: </label> <input
             type="url" 
            placeholder="https://careers.company.com/..."
            id="jobPostingUrl"
            name="jobPostingUrl"
            value={formData.jobPostingUrl}
            onChange={handleChange} 
            className="w-full px-3 h-10 border rounded placeholder-gray-400  "
            />
        </div>
        <div className="mt-0">
            <label  htmlFor="role" className="block ">Role: </label>

            <input 
            type="text"
            name="role"
            id="role"
            value={formData.role}
            onChange={handleChange} 
            placeholder="What role ? "
            className="w-full px-4 py-2 border rounded "
            />
        </div>
        <div  className="mt-0">
            <label  htmlFor="dateApplied" className="block ">Date applied</label>
            <input type="date"
            name="dateApplied"
            id="dateApplied"
            value={formData.dateApplied}
            onChange={handleChange}
            placeholder="date applied" 
            className="w-full px-4 py-2 border rounded "/>
        </div>
         <div className="mt-0">
            <label  htmlFor="notes" className="block mt-1"> Notes: </label>
            <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            placeholder="Add any note about this application..."
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"/>
         </div>
         <div>
            <label htmlFor="status" className="block ">Status:</label>
            <select
             name="status" 
            id="status" 
            value={formData.status}
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
             disabled={isSubmitting}
             className=" w-full bg-black text-white py-3 rounded disabled:opacity-50 disabled:cursor-not-allowed"
             >
             {isSubmitting ? "Saving..." : "Save application"}
            </button>
        </div>
    </form>
    )
}


const initialState = {
    company: "",
    jobPostingUrl: "",
    role : "",
    dateApplied: "",
    status : "applied",
    notes: ""
}