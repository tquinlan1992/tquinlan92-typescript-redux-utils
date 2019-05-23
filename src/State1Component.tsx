import React from 'react';
import { storeActions, connectedNoOwnProps, connectedWithOwnProps } from "./store";
import { WithStyles, withStyles } from './tquinlan92-typescript-redux-utils';


export const { Connected: State1ComponentConnected } = connectedNoOwnProps(
    (state) => {
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
    { button: { background: 'green' } }
)(({ input, results, onChange, getResults, reset, classes }) => {
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
})

function TomComponent({ value, classes }: { value: string; } & WithStyles<typeof styles>) {
    return <h1 className={classes.header}>{value}</h1>
}

const styles = { header: { color: 'orange' } };
const StyledComponent = withStyles(styles)(TomComponent);

export const { Connected: ComponentWithProps } = connectedWithOwnProps<{ valueFromProp: string; }>()(
    (state, { valueFromProp }) => {
        return {
            valueFromProp
        }
    })(({ valueFromProp }) => {
        return <StyledComponent value={valueFromProp} />
    })
