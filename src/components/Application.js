import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });


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
          setState((prev) => ({
            ...prev,
            appointments
          }))
        })
    )
  }

  const deleteInterview = (id) => {
    console.log('del')

    const appointments = {
      ...state.appointments,
      id: null
    };

    return (
      axios.delete(`/api/appointments/${id}`)
        .then(() => {
          console.log('then')
          setState((prev) => ({
            ...prev,
            appointments
          }))
        })
    )
  }

  const dailyAppointments = getAppointmentsForDay(state, state.day)

  const parsedAppointments = dailyAppointments.map((a) => {
    const interview = getInterview(state, a.interview);

    return (
      <Appointment
        key={a.id}
        id={a.id}
        time={a.time}
        interview={interview}
        day={state.day}
        state={state}
        bookInterview={bookInterview}
        onDelete={deleteInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            value={state.day}
            onChange={setDay}
            days={state.days}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {parsedAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
