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
        getResults: storeActions.state1.getResults
    }, 
    ({ input, results, onChange, getResults }) => {
        return (
            <>
                <input value={input} onChange={event => onChange(event.target.value)} />
                <button onClick={getResults}> Get Results </button>
                <ul>
                    {results.map(result => {
                        return <li>{result}</li>
                    })}
                </ul>
            </>
        )
    })
