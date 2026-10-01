
// need to load the application data for edit
// use use param to get the id 
//use useNavigate() to redirect 
// pull all the applications from storage
// try to find app whose id matches the param
//if found we display the data  using setFormdata function

import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import api from "../api/axios"

const API_URL = import.meta.env.VITE_API_URL;   

export const  EditApplication =()=>{

    const [formData ,setFormData] = useState({
        company:"",
        role:"",
        dateApplied:"",
        status:"applied",
        notes: ""
    })

    const {id }= useParams();
    const navigate = useNavigate();

    // pull any app from storage based on the [id];
    // useEffect(()=>{
    //      const data = JSON.parse(localStorage.getItem("applications"))||[];
    //     const found = data.find(app => app.id === id)
    //     if(found){
    //         setFormData(found)
    //     }
    // },[id])

    useEffect( ()=>{
        const loadSpecificApplication = async () => {
            try {
                const result = await api.get(`/api/applications/${id}`);
                setFormData({...result.data,
                     dateApplied: result.data.dateApplied.split("T")[0]
                    });

            } catch (error) {
                console.error("Error fetching application:", error);
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
    //pull data from storage
    // update the  app that matches param (id) 

   // “If the ID matches an application, replace 
   //that application with the updated form data. Otherwise, 
   // return the existing application unchanged.”
   
    // save news tate  back to storage
    //during the update we need to preserve id so we don't loose it
    // const handleSubmit = (e)=>{
    //     e.preventDefault();
    //     const data = JSON.parse(localStorage.getItem('applications'))||[];
    //     const updated = data.map(app => app.id ===id ? {...formData,id}: app);

    //      localStorage.setItem('applications',JSON.stringify(updated))
       
    //      //redirect to applications
    //      toast.success("Application updated successfully!")
    //      setTimeout(()=>{       
    //     navigate('/applications')   
    //      },3000)

    // }

    //using axios to update the application
      const handleSubmit = async (e)=>{
        e.preventDefault();

        // const data = JSON.parse(localStorage.getItem('applications'))||[];
       
        // const updated = data.map(app => app.id ===id ? {...formData,id}: app);

        //  localStorage.setItem('applications',JSON.stringify(updated))
       
        try {
            const result = await api.put(`/api/applications/${id}`, formData);
            toast.success("Application updated successfully!")
          //redirect to applications
            setTimeout(()=>{       
        navigate('/applications')   
         },3000)
        }catch(error){
            console.log(error)
            toast.error("Failed to update application!")

        }
       
        

    }
    return (<div className="p-6 max-w-xl mx-auto pt-24">
        <h1 className="font-bold text-2xl mb-4 text-center justify mt-5">
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
          <input
          name="role"
          onChange={handleChange}
          value={formData.role}
            className="w-full border p-2"/>

            <textarea
            id="notes"
            name="notes"
            row={4}
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