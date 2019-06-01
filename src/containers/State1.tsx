import React from 'react';
import { actions, selectors, connectProps } from "../store";
import { times } from 'lodash';
import { createSelector } from 'reselect'

function mapResults(results: string[]) {
    times(1000, () => {
        console.log('heavy computation');
    });
    return results.map(result => result);
}

const getResultsSelector = createSelector(
    selectors.state1.results,
    mapResults
)

export const { Connected: State1ComponentConnected, Component } = connectProps(
    (state, {value}) => {
        const input = selectors.state1.input(state);
        const results = getResultsSelector(state);
        return {
            input,
            results
        }
    },
    {
        onChange: actions.state1.input,
        getResults: actions.state1.getResults,
        resetAll: actions.state1.resetAll
    }
)(({ input, results, onChange, getResults, resetAll }) => {
    return (
        <>
            <input value={input} onChange={event => onChange(event.target.value)} />
            <button onClick={getResults}> Get Results </button>
            <button onClick={() => resetAll()}>Reset</button>
            <ul>
                {results.map(result => {
                    return <li key={result}>{result}</li>
                })}
            </ul>
        </>
    )
});

console.log('Component', Component);