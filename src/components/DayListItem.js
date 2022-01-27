import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {

    const dayClass = classNames(
        'day-list__item',
        { 'day-list__item--selected': props.selected },
        { 'day-list__item--full': props.spots === 0 },
    );

    
    const formatSpots = (spots) => {
        let spotsRemaining = ''
        if (spots > 1) {
            spotsRemaining = `${spots} spots remaining`
        } else if (spots === 1) {
            spotsRemaining = '1 spot remaining'
        } else {
            spotsRemaining = 'no spots remaining'
        }
        return spotsRemaining;
    };
    

    return (
        <li className={dayClass} data-testid='day' onClick={() => props.setDay(props.name)}>
            <h2 className="text--regular">{props.name}</h2>
            <h3 className="text--light">{formatSpots(props.spots)}</h3>
        </li>
    );
};