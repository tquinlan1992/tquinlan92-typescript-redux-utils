import React from 'react';
import { actions, connectedNoOwnProps, connectedWithOwnProps, selectors } from "../store";
import { WithStyles, withStyles } from '../tquinlan92-typescript-redux-utils';
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

export const { Connected: State1ComponentConnected } = connectedNoOwnProps(
    (state) => {
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
    },
    { button: { background: 'green' } }
)(({ input, results, onChange, getResults, resetAll, classes }) => {
    return (
        <>
            <input value={input} onChange={event => onChange(event.target.value)} />
            <button onClick={getResults} className={classes.button}> Get Results </button>
            <button onClick={() => resetAll()}>Reset</button>
            <ul>
                {results.map(result => {
                    return <li key={result}>{result}</li>
                })}
            </ul>
        </>
    )
})

function ComponentToStyle({ value, classes }: { value: string; } & WithStyles<typeof styles>) {
    return <h1 className={classes.header}>{value}</h1>
}

const styles = { header: { color: 'orange' } };
const StyledComponent = withStyles(styles)(ComponentToStyle);

export const { Connected: ComponentWithProps } = connectedWithOwnProps<{ valueFromProp: string; }>()(
    (state, { valueFromProp }) => {
        return {
            valueFromProp
        }
    })(({ valueFromProp }) => {
        return <StyledComponent value={valueFromProp} />;
    })
