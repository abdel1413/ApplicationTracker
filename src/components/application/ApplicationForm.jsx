import { useState } from "react"

export const ApplicationForm = ({onSubmit})=>{
    const [formData, setFormData] = useState(initialState)
 
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

 console.log(newApplication)
     onSubmit(newApplication)
     setFormData(initialState)

    }
    const handleChange =(e)=>{

        const {name, value} = e.target; 
  

        setFormData((prev) =>( {...prev, [name]: value }))


    }



    return (<>
    <form className="max-w-xl mx-auto bg-white shadow rounded-lg p-6 space-y-5"
    onSubmit={handleSubmit}>
        <div>
            <h2 className="text-xl font-bold">
                Add Application
            </h2>
            <label className="block mb-2">Company: </label>
            <input
             type="text" 
            placeholder="company name "
            name="company"
            value={formData.company}
            onChange={handleChange} 
            className="w-full px-4 py-2 border rounded"
            />
        </div>
        <div>
            <label  className="block mb-2">Role: </label>

            <input type="text"
            name="role"
            value={formData.role}
            onChange={handleChange} 
            placeholder="What role ? "
            className="w-full px-4 py-2 border rounded"
            />
        </div>
        <div>
            <label  className="block mb-2">Date applied</label>
            <input type="date"
            name="dateApplied"
            value={formData.dateApplied}
            onChange={handleChange}
            placeholder="date applied" 
            className="w-full px-4 py-2 border rounder"/>
        </div>
        <div>
            <label className="block mb-2">Status:</label>
            <select name="status" 
            id="" 
            name='status'
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
    role : "",
    dateApplied: "",
    status : "Applied"
}