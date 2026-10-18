import dayjs from "dayjs"

export const formatDate = (date) => {
    if(!date) return "No date"
    const parseDate = dayjs(date)
    if(!parseDate.isValid()) return "Invalid date"
    return  parseDate.format("MMMM D, YYYY")
    
}

console.log(formatDate("2026-10-18"));
console.log(formatDate());
console.log(formatDate("hello"));