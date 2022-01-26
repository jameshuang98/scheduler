import React from "react";
import PropTypes from 'prop-types';

import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {

    const parsedInterviewers = props.interviewers.map((i) =>
        <InterviewerListItem
            key={i.id}
            name={i.name}
            avatar={i.avatar}
            selected={i.id === props.value}
            setInterviewer={() => props.onChange(i.id)} />
    );

    return (
        <section className="interviewers">
            <h4 className="interviewers__header text--light">Interviewer</h4>
            <ul className="interviewers__list">{parsedInterviewers}</ul>
        </section>
    );
}

InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  };