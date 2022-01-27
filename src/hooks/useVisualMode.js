import { useState } from "react";

export default function useVisualMode(initialMode) {

    const [mode, setMode] = useState(initialMode);
    const [history, setHistory] = useState([initialMode]);

    function transition(newMode, replace = false) {
        const newHistory = [...history];
        if (replace === true) {
            newHistory[newHistory.length - 1] = newMode
        } else {
            newHistory.push(newMode)
        }
        setHistory(newHistory);
        setMode(newMode);
    };

    const back = function () {
        if (history.length === 1) {
            return;
        }

        const newHistory = [...history];
        newHistory.pop();
        setHistory(newHistory);

        const prevMode = newHistory.slice(-1)[0];
        setMode(prevMode);
    };

    return { mode, transition, back, history };
}