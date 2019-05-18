import { connect, ResolveThunks } from "react-redux";
import React from 'react';
import { storeActions, AppState } from "./store";

function mapStateToProps(state: AppState) {
    const { input, results } = state.state1;
    return {
        input,
        results
    }
}

const mapDispatchToProps = {
    onChange: storeActions.state1.input,
    getResults: storeActions.state1.getResults
}

const State1Component: React.FC<ReturnType<typeof mapStateToProps> & ResolveThunks<typeof mapDispatchToProps>> = ({ input, results, onChange, getResults }) => {
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
}

export const State1ComponentConnected = connect(mapStateToProps, mapDispatchToProps)(State1Component);
