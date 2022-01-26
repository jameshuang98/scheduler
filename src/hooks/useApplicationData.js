import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "components/DayList";


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

    useEffect(() => {
        Promise.all([
            axios.get('/api/days'),
            axios.get('/api/appointments'),
            axios.get('/api/interviewers')
        ])
            .then((all) => {
                console.log(all[0].data); // first
                console.log(all[1].data); // second
                console.log(all[2].data); // third

                // const [get_days, get_appointments, get_interviewers] = all;

                setState(prev => ({
                    ...prev,
                    days: all[0].data,
                    appointments: all[1].data,
                    interviewers: all[2].data
                }));
            });

    }, []);



    const updateSpots = (id, appointments) => {
        const day = state.days.find((day) => day.appointments.includes(id))
        // console.log('day', day)
        const dayNumber = day.id - 1;
        // console.log('dayArray', day.appointments)

        let spots = 0;
        for (const appointment of day.appointments) {
            if (!appointments[appointment].interview) {
                spots++;
            }
        }
        console.log('spots', spots)

        const dayUpdated = {
            ...state.days[dayNumber],
            spots: spots
        }
        // console.log('dayUpdated', dayUpdated)

        const days = [...state.days]
        days[dayNumber] = dayUpdated
        
        // console.log('days', days)

        return days;



    }

    const bookInterview = (id, interview) => {
        console.log('bookInterview, id, interview', id, interview)
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
                    // console.log(res)
                    const daysUpdated = updateSpots(id, appointments) 
                    setState((prev) => ({
                        ...prev,
                        appointments,
                        days: daysUpdated
                    }))
                })

            // .catch((err) =>{
            //   console.log('saving error', err)
            // })
        )
    }

    const deleteInterview = (id) => {
        console.log('del')

        const appointment = {
            ...state.appointments[id],
            interview: null
        }

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
        )
    }

    return { state, setDay, bookInterview, deleteInterview };
}