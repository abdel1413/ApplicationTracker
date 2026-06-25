import { ApplicationForm } from "../components/application/ApplicationForm"
export const AddApplication = ()=>{

   // created a save fnc to save application
   // use local storage
   // try pull the existing applications
   // if there are any, append the new app to them
   // if not return [] and  save new app to storage

   const saveApplication =(data)=>{
      const existingApplications =JSON.parse(localStorage.getItem("applications"))|| []

      localStorage.setItem('applications', JSON.stringify([...existingApplications, data]))
     
   }

    
 return  (
   <div className="gap-6">

      <ApplicationForm onSubmit={saveApplication} />

   </div>)

}