export const calculateStatistics =(applications)=>{
    
    return applications.reduce((statistics, application)=>{
        statistics.total +=1;
        const status = application.status?.toLowerCase()
        if(status && status in statistics){
            statistics[status] +=1
        }
        console.log(statistics)
        return statistics
    },{
        total: 0,
        applied: 0,
        interview:0,
        offer: 0,
        rejected:0
    })
}