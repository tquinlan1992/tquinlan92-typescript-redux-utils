import React from 'react';
import { storeActions, connectedNoOwnProps, connectedWithOwnProps } from "./store";


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
    { button: { background: 'green' } },
    ({ input, results, onChange, getResults, reset, classes }) => {
        return (
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
    }
)

export const { Connected: ComponentWithProps } = connectedWithOwnProps<{ valueFromProp: string; }>()(
    (state, { valueFromProp }) => {
        return {
            valueFromProp
        }
    },
    {
    },
    {},
    ({ valueFromProp }) => {
        return (
            <h1>{valueFromProp}</h1>
        )
    }
)
