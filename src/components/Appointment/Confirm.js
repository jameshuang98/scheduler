import React from "react";
import classNames from "classnames";
import Button from "components/Button";

export default function Confirm(props) {

    const deleteInterview = (id) => {
        props.transition('DELETING')
        props.onDelete(id)
            .then(() => {
                props.transition('EMPTY')
            })
    };

    return (
        <main className="appointment__card appointment__card--confirm">
            <h1 className="text--semi-bold">{props.message}</h1>
            <section className="appointment__actions">
                <Button onClick={props.onCancel} danger>Cancel</Button>
                <Button onClick={() => deleteInterview(props.id)} danger>Confirm</Button>
            </section>
        </main>
    );
}