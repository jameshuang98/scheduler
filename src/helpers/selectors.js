
export function getAppointmentsForDay(state, day) {
    let appointmentsForDay = [];
    const dayObj = state.days.filter(d => d.name === day);
    const appointments = dayObj[0] ? dayObj[0].appointments : [];

    for (const id in state.appointments) {
        if (appointments.includes(Number(id))) {
            appointmentsForDay.push(state.appointments[id])
        }
    }

    return appointmentsForDay;
}



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


export function getInterviewersForDay(state, day) {
    let interviewersForDay = [];
    const dayObj = state.days.filter(d => d.name === day);
    const interviewers = dayObj[0] ? dayObj[0].interviewers : [];

    for (const id in state.interviewers) {
        if (interviewers.includes(Number(id))) {
            interviewersForDay.push(state.interviewers[id])
        }
    }

    return interviewersForDay;
}