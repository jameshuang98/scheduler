
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

