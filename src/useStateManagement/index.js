import React from 'react';
import computeDerivedStates from '../computeDerivedStates';
import traceUpdates from '../traceUpdates';
import updater from '../updater';

/**
 * The state management core.
 *
 * @param initialState
 * @param derivedStateSyncers
 * @returns getter/setter to the context
 */
const useStateManagement = (initialState, derivedStateSyncers, debug) => {
    const [state, setState] = React.useState(initialState);
    const [initState, setInitState] = React.useState(true);

    const setContext = React.useCallback((path, value) => {
        if (debug) {
            traceUpdates({ path, value });
        }

        setState((state) => {
            const newState = updater(path, value, state);
            const syncerStatus = {};
            syncerStatus.done = false;
            const stateAfterDerived = computeDerivedStates({ prevState: state, state: newState, derivedStateSyncers, debug, syncerStatus });
            syncerStatus.done = true;
            return stateAfterDerived;
        });
    }, [derivedStateSyncers, debug]);

    if (initState) {
        const syncerStatus = {};
        syncerStatus.done = false;
        const stateAfterDerived = computeDerivedStates({ prevState: {}, state, derivedStateSyncers, debug, syncerStatus });
        syncerStatus.done = true;
        setState(stateAfterDerived);
        setInitState(false);
    }

    return [state, setContext];
};

export default useStateManagement;