import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(initialMode) {
    const [state, setState] = useState({
        day: "Monday",
        days: [],
        appointments: {},
        interviewers: {}
    });

    const setDay = day => setState((prev) => ({
        ...state,
        day
    }));

    // grouping 3 axios calls to scheduler-api to get the data
    useEffect(() => {
        Promise.all([
            axios.get('/api/days'),
            axios.get('/api/appointments'),
            axios.get('/api/interviewers')
        ])
            // data returned from Promise.all is stored in an array called 'all'
            .then((all) => {

                setState(prev => ({
                    ...prev,
                    days: all[0].data,
                    appointments: all[1].data,
                    interviewers: all[2].data
                }));
            });

    }, []);


    // counting number of empty appointments for certain day
    const updateSpots = (id, appointments) => {
        const day = state.days.find((day) => day.appointments.includes(id));
        const dayNumber = day.id - 1;

        let spots = 0;
        for (const appointment of day.appointments) {
            if (!appointments[appointment].interview) {
                spots++;
            }
        }

        const dayUpdated = {
            ...state.days[dayNumber],
            spots: spots
        };

        const days = [...state.days];
        days[dayNumber] = dayUpdated;

        return days;
    }

    const bookInterview = (id, interview) => {
        const appointment = {
            ...state.appointments[id],
            interview: { ...interview }
        };
        const appointments = {
            ...state.appointments,
            [id]: appointment
        };

        return (
            axios.put(`/api/appointments/${id}`, appointment)
                .then((req, res) => {
                    const daysUpdated = updateSpots(id, appointments)
                    setState((prev) => ({
                        ...prev,
                        appointments,
                        days: daysUpdated
                    }))
                })
        );
    };

    const deleteInterview = (id) => {

        const appointment = {
            ...state.appointments[id],
            interview: null
        };

        const appointments = {
            ...state.appointments,
            [id]: appointment // [id] evaluates to the variable id
        };

        return (
            axios.delete(`/api/appointments/${id}`)
                .then(() => {
                    const daysUpdated = updateSpots(id, appointments)
                    setState((prev) => ({
                        ...prev,
                        appointments,
                        days: daysUpdated
                    })
                    )
                })
            // .catch((err) => {
            //   console.log('deleting error', err)
            // })
        );
    }

    return { state, setDay, bookInterview, deleteInterview };
};