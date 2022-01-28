
// returning interview appointments for a certain day
export function getAppointmentsForDay(state, day) {
    let appointmentsForDay = [];
    const dayObj = state.days.find(d => d.name === day);
    const appointments = dayObj ? dayObj.appointments : [];

    for (const id in state.appointments) {
        if (appointments.includes(Number(id))) {
            appointmentsForDay.push(state.appointments[id])
        }
    }
    return appointmentsForDay;
}


// return interview information if interview exists
export function getInterview(state, interview) {
    let output = {};
    if (interview) {
        output.student = interview.student;
        output.interviewer = {
            id: interview.interviewer,
            name: state.interviewers[interview.interviewer].name,
            avatar:state.interviewers[interview.interviewer].avatar
        }
        return output;
    }
    return null;
}

// returning interviewers for a certain day
export function getInterviewersForDay(state, day) {
    let interviewersForDay = [];
    const dayObj = state.days.find(d => d.name === day);
    const interviewers = dayObj ? dayObj.interviewers : [];

    for (const id in state.interviewers) {
        if (interviewers.includes(Number(id))) {
            interviewersForDay.push(state.interviewers[id])
        }
    }
    return interviewersForDay;
}