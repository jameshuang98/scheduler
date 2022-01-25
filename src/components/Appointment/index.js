import React from 'react'
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
        props.interview ? SHOW : EMPTY
    );

    function save(name, interviewer) {
        console.log('save', props.interview)
        const interview = {
            student: name,
            interviewer
        };
        transition(SAVING);
        props.bookInterview(props.id, interview)
            .then(() => transition(SHOW))
            .catch((err) => {
                console.log('booking interview error', err)
                transition(ERROR_SAVE, true)
            })

    }


    return (
        <article className="appointment">
            <Header time={props.time} />

            {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

            {mode === SHOW && (
                <Show
                    student={props.interview.student}
                    interviewer={props.interview.interviewer}
                    onDelete={props.onDelete}
                    onEdit={() => transition(EDIT)}
                    id={props.id}
                    transition={transition}
                />
            )}

            {mode === CREATE && <FORM interviewers={getInterviewersForDay(props.state, props.day)} onCancel={back} onSave={save} />}

            {mode === SAVING && <Status message='Saving' />}

            {mode === DELETING && <Status message='Deleting' />}

            {mode === CONFIRM && <Confirm message='Are you sure?'
                onCancel={back}
                onDelete={props.onDelete}
                id={props.id}
                transition={transition} />}

            {mode === EDIT && <FORM
                interviewers={getInterviewersForDay(props.state, props.day)}
                student={props.interview.student}
                interviewer={props.interview.interviewer.id}
                onCancel={back}
                onSave={save}
            />}

            {mode === ERROR_SAVE && <Error message='Error with saving' onClose={back} />}

            {mode === ERROR_DELETE && <Error message='Error with deleting' onClose={back} />}


        </article>
    );
}