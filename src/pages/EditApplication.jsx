import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import api from "../api/axios"


export const  EditApplication =()=>{

    const [formData ,setFormData] = useState({
        company:"",
        jobPostingUrl:"",
        role:"",
        dateApplied:"",
        status:"applied",
        notes: ""
    })

    const {id }= useParams();
    const navigate = useNavigate();

    useEffect( ()=>{
        const loadSpecificApplication = async () => {
            try {
                const result = await api.get(`/api/applications/${id}`);
                setFormData({...result.data,
                     dateApplied: result.data.dateApplied.split("T")[0]
                    });

            } catch (error) {
                console.error("Error fetching application:", error);
                toast.error("Failed to fetch application!")
            }
        };
        loadSpecificApplication();
    },[id])

    const handleChange =(e)=>{
        const {name, value} = e.target;
        setFormData(prev =>({
            ...prev,
       [name] : value
        }))
    }

      const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
             await api.put(`/api/applications/${id}`, formData);
            toast.success("Application updated successfully!")
      
            setTimeout(()=>{       
        navigate('/applications')   
         },3000)
        }catch{
            toast.error("Failed to update application!")
        }
       
    }
    return (<div className="p-6 max-w-xl mx-auto pt-24">
        <h1 className="font-bold text-2xl mb-4 text-center  mt-5">
        Edit application
        </h1>
        <form 
        className="space-y-4"
        onSubmit={handleSubmit}>

          <input
          name="company"
          value={formData.company}
          onChange={handleChange}
            className="w-full border p-2"/>
            
            <input type="url"
            name="jobPostingUrl"
            value={formData.jobPostingUrl || ""}
            onChange={handleChange}
            placeholder="paste your new url"
            className="w-full border p-2"/>
          
          <input
          name="role"
          onChange={handleChange}
          value={formData.role}
            className="w-full border p-2"/>

            <textarea
            id="notes"
            name="notes"
            rows={4}
            value={formData.notes}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2  resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
          <input
          type="date"
          name="dateApplied"
          onChange={handleChange}
          value={formData.dateApplied}
          className="w-full border p-2"/>

          <select
          name="status"
          value={formData.status.toLowerCase()}
          onChange={handleChange}
            className="w-full border p-2">
                <option value ='applied'>Applied</option>
                <option value='interview'>Interview</option>
                <option value='offer'>Offer</option>
                <option value='rejected'>Rejected</option>
            </select>
            <button 
            type='submit'
            className="w-full bg-black text-white py-2">
                Update
            </button>
        </form>
         </div>)
}