import { useState } from "react"

export const ApplicationForm = ()=>{
    const [formData, setFormData] = useState(initialState)
 
    const handleSubmit =()=>{}
    const handleChange =()=>{}

    return (<>
    <form className="max-w-xl mx-auto bg-white shadow rounded-lg p-6 space-y-5"
    onSubmit={handleSubmit}>
        <div>
            <h2 className="text-xl font-bold">
                Add Application
            </h2>
            <label htmlFor="" className="block mb-2">Company: </label>
            <input type="text" 
            placeholder="google"
            value={formData.company}
            onChange={handleChange} 
            className="w-full px-4 py-2 border rounded"
            />
        </div>
        <div>
            <label htmlFor="" className="block mb-2">Role: </label>
            <input type="text"
            value={formData.role}
            onChange={handleChange} 
            placeholder="Frontend developer"
            className="w-full px-4 py-2 border rounded"
            />
        </div>
        <div>
            <label htmlFor="" className="block mb-2">Date applied</label>
            <input type="text"
            value={formData.dateApplied}
            onChange={handleChange}
            placeholder="date applied" 
            className="w-full px-4 py-2 border rounder"/>
        </div>
        <div>
            <label htmlFor="" className="block mb-2">Status:</label>
            <select name="status" 
            id="" 
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