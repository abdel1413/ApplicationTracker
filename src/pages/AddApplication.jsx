
import api from "../api/axios";
import { ApplicationForm } from "../components/application/ApplicationForm"
export const AddApplication = ()=>{
      

   const saveApplication = async (data)=>{
       await api.post(`/api/applications`, data);
   }

    
 return  (
   <div className="gap-6">

      <ApplicationForm onSubmit={saveApplication}  />

   </div>)

}