import React from 'react';
import { storeActions, connectedNoOwnProps } from "./store";


export const { Connected: State1ComponentConnected } = connectedNoOwnProps(
    state => {
        const { input, results } = state.state1;
        return {
            input,
            results
        }
    }, 
    {
        onChange: storeActions.state1.input,
        getResults: storeActions.state1.getResults,
        reset: storeActions.state1.reset
    }, 
    {button: {backgroundColor: 'green'}},
    ({ input, results, onChange, getResults, reset, classes }) => {
        const component = (
            <>
                <input value={input} onChange={event => onChange(event.target.value)} />
                <button onClick={getResults} className={classes.button}> Get Results </button>
                <button onClick={reset}>Reset</button>
                <ul>
                    {results.map(result => {
                        return <li>{result}</li>
                    })}
                </ul>
            </>
        )

        return component;
    })
