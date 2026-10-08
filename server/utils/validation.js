const validateApplication = (application) => {
    if(!application.company 
        || typeof application.company !== 'string' 
        || !application.company.trim()) {
        return 'Company name is required' ;
    }
    if(!application.role 
        || typeof application.role !== 'string' 
        || !application.role.trim()) {
        return  'Role is required' ;
    }
    if(!application.dateApplied ||
         typeof application.dateApplied !== 'string' ||
         !application.dateApplied.trim()) {
        return  'Date applied is required' ;
    }
    if(isNaN(Date.parse(application.dateApplied))) {
        return'Invalid date format' ;
    }
    if(!application.status 
        || typeof application.status !== 'string'
        || !application.status.trim()) {
        return 'Status is required' ;
    }

    const allowedStatuses =['applied', 'interview', 'offer', 'rejected']
    if(!allowedStatuses.includes(application.status)) {
        return 'Invalid status' ;
    }

    if(application.jobPostingUrl){
        try {
             new URL(application.jobPostingUrl)
        } catch (error) {
            return 'Invalid job posting URL' ;
        }
    }
    if(application.notes !== undefined && application.notes !==null){
      if(typeof application.notes !== 'string') {
        return 'Notes must be a string' ;
      }
    }
};

const validateId = (id) => {
    const applicationId = Number(id);
    //1 way using || operator
    if(!Number.isInteger(applicationId)|| applicationId <= 0) {
        return null;
    }
    return applicationId;

    //2nd way using && operator
    //   if (Number.isInteger(applicationId) && applicationId > 0) {
    //     return applicationId;
    // }
    //return null.

};  

module.exports ={ validateApplication, validateId }