import React, { useState } from 'react';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {

    const [error, setError] = useState("");

    const reset = () => {
        props.setStudent('');
        props.setInterviewer('');
    };

    const cancel = () => {
        reset()
        props.onCancel()
    };

    function validate() {
        if (props.student === "") {
            setError("Student name cannot be blank");
            return;
        }

        setError("");
        props.onSave(props.student, props.interviewer);
    };

    return (
        <main className="appointment__card appointment__card--create">
            <section className="appointment__card-left">
                <form onSubmit={event => event.preventDefault()} autoComplete="off">
                    <input
                        className="appointment__create-input text--semi-bold"
                        name="name"
                        type="text"
                        placeholder="Enter Student Name"
                        data-testid="student-name-input"
                        value={props.student}
                        onChange={(event) => props.setStudent(event.target.value)}
                    />
                    <section className="appointment__validation">{error}</section>
                </form>
                <InterviewerList
                    interviewers={props.interviewers}
                    onChange={props.setInterviewer}
                    value={props.interviewer}
                />
            </section>
            <section className="appointment__card-right">
                <section className="appointment__actions">
                    <Button danger onClick={() => cancel()}>Cancel</Button>
                    <Button confirm onClick={() => validate()}>Save</Button>
                </section>
            </section>
        </main>
    );
};