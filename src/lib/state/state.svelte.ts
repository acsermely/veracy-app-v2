import { getContext, setContext } from 'svelte';
import { DEFAULT_NODE_URL } from '../constants';

export class GlobalState {
	nodeUrl = $state(DEFAULT_NODE_URL);

	
}

const GLOBAL_STATE_KEY = 'global-state';

export function setState(): GlobalState {
	return setContext(GLOBAL_STATE_KEY, new GlobalState());
}

export function getState(): GlobalState {
	return getContext<GlobalState>(GLOBAL_STATE_KEY);
}
