
import { ApplicationForm } from "../components/application/ApplicationForm"
import { useState } from "react"
export const AddApplication = ()=>{
   const [toastMessage, setToastMessage] = useState(false)  

   // created a save fnc to save application
   // use local storage
   // try pull the existing applications
   // if there are any, append the new app to them
   // if not return [] and  save new app to storage

   const saveApplication =(data)=>{
      const existingApplications =JSON.parse(localStorage.getItem("applications"))|| []

      localStorage.setItem('applications', JSON.stringify([...existingApplications, data]))

      setToastMessage(true)
      setTimeout(()=>{
         setToastMessage(false)
      },5000)

     
   }

    
 return  (
   <div className="gap-6">

      <ApplicationForm onSubmit={saveApplication} />

   </div>)

}