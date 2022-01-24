import React, { Fragment } from 'react'
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import FORM from './Form';
import Empty from "./Empty";
import useVisualMode from 'hooks/useVisualMode';
import { getInterviewersForDay } from 'helpers/selectors'

export default function Appointment(props) {

    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const CREATE = "CREATE";

    // let timeslot = props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />;

    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
    );


    return (
        <article className="appointment">
            <Header time={props.time} />
            {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
            {mode === SHOW && (
                <Show
                    student={props.interview.student}
                    interviewer={props.interview.interviewer}
                />
            )}
            {mode === CREATE && <FORM interviewers={getInterviewersForDay(props.state, props.day)} onCancel={back} />}

        </article>
    );
}