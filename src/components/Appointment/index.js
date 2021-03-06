import React, { useState } from 'react'
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import FORM from './Form';
import Empty from "./Empty";
import Confirm from './Confirm';
import Status from './Status';
import Error from './Error';
import useVisualMode from 'hooks/useVisualMode';
import { getInterviewersForDay } from 'helpers/selectors'

export default function Appointment(props) {

    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const CREATE = "CREATE";
    const SAVING = "SAVING";
    const DELETING = "DELETING";
    const CONFIRM = "CONFIRM";
    const EDIT = "EDIT"
    const ERROR_SAVE = "ERROR_SAVE";
    const ERROR_DELETE = "ERROR_DELETE";

    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY // when props.interview contains an interview, pass the SHOW mode to useVisualMode
    );

    // define student and interviewer state outside of FORM component so data is intact if an error occurs
    const [student, setStudent] = useState(props.interview ? props.interview.student : "");
    const [interviewer, setInterviewer] = useState(props.interview ? props.interview.interviewer.id : null);


    // save interview to state
    function save(name, interviewer) {
        const interview = {
            student: name,
            interviewer
        };
        transition(SAVING); // show the SAVING mode before calling props.bookInterview
        props.bookInterview(props.id, interview)
            .then(() => transition(SHOW))
            .catch(() => {
                transition(ERROR_SAVE)
            })
    }

    // delete interview from state
    function deleteInterview(id) {
        transition('DELETING', true) // show the DELETING mode before calling props.deleteInterview
        props.deleteInterview(id)
            .then(() => {
                transition('EMPTY')
                setStudent('')
                setInterviewer(null)
            })
            .catch(() => {
                transition('ERROR_DELETE', true)
            })
    }
    
    function cancel() {
        setStudent(props.interview.student);
        setInterviewer(props.interview.interviewer.id);
        back();
    }

    // // reset the input data and transition back to the previous mode
    function reset() {
        setStudent('');
        setInterviewer(null);
        back();
    }

    return (
        <article className="appointment">
            <Header time={props.time} />

            {/* Depending on the mode, a different component will render in this Appointment timeslot */}
            {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

            {mode === SHOW && (
                <Show
                    student={props.interview.student}
                    interviewer={props.interview.interviewer}
                    deleteInterview={deleteInterview}
                    onEdit={() => transition(EDIT)}
                    id={props.id}
                    transition={transition}
                />
            )}

            {mode === CREATE && <FORM
                interviewers={getInterviewersForDay(props.state, props.day)}
                onCancel={reset} 
                onSave={save}
                student={student}
                setStudent={setStudent}
                interviewer={interviewer}
                setInterviewer={setInterviewer}
                 />}

            {mode === SAVING && <Status message='Saving' />}

            {mode === DELETING && <Status message='Deleting' />}

            {mode === CONFIRM && <Confirm message='Are you sure?'
                onCancel={back}
                deleteInterview={deleteInterview}
                id={props.id}
                transition={transition} />}

            {mode === EDIT && <FORM
                setStudent={setStudent}
                interviewers={getInterviewersForDay(props.state, props.day)}
                student={student}
                interviewer={interviewer}
                setInterviewer={setInterviewer}
                onCancel={cancel}
                onSave={save}
            />}

            {mode === ERROR_SAVE && <Error message='Error with saving' onClose={back} />}

            {mode === ERROR_DELETE && <Error message='Error with deleting' onClose={back} />}


        </article>
    );
};