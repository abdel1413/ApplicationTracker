import dayjs from "dayjs"

export const formatDate = (date)=>{
    if(!date) return "No date"
    return 
        dayjs(date).format("MMMM D, YYYY")
    
}