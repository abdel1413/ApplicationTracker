
// need to load the application data for edit
// use use param to get the id 
//use useNavigate() to redirect 
// pull all the applications from storage
// try to find app whose id matches the param
//if found we display the data  using setFormdata function

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const  EditApplication =()=>{

    const [formData ,setFormData] = useState({
        company:"",
        role:"",
        dateApplied:"",
        status:""
    })

    const {id }= useParams();
    const navigate = useNavigate();
  
    // pull all apps form storage;
    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem("applications"))||[];
        console.log('data',data)
        console.log('id',id)
        const found = data.find(app => app.id === id)
        console.log('found',found)
        if(found){
            setFormData(found)
        }
    },[id])
    console.log('formdata',formData)

    const handleChange =(e)=>{
        console.log(e.target.name, e.target.value)
        const {name, value} = e.target;
        setFormData(prev =>({
            ...prev,
       [name] : value
        }))

    }
    //pull data from storage
    // update the  app that matches param (id) 
    // if found go to edit page with current data otherwise existing data 
    //from storage
    // save news tate  back to storage
    const handleSubmit = (e)=>{
        e.preventDefault();
        const data = JSON.parse(localStorage.getItem('applications'))||[];
        const updated = data.map(app => app.id ===id? formData: app);

         localStorage.setItem('applications',JSON.stringify(updated))
         //redirect to applications
         console.log("id", id)
         console.log(navigate)
        navigate('/applications')

    }
    return (<div>
        <h1 className="font-bold text-2xl mb-4">
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
            
          <input
          
          name="dateApplied"
          onChange={handleChange}
          value={formData.dateApplied}
          className="w-full border p-2"/>
          <select
          name="status"
          value={formData.status}
          onChange={handleChange}
            className="w-full border p-2">
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
            </select>
            <button 
            type='submit'
            className="w-full bg-black text-white py-2">
                Update
            </button>
        </form>
         </div>)
}