import { getContext, setContext } from 'svelte';
import { SvelteMap } from 'svelte/reactivity';
import type { PostData } from '../../models/post.model';
import { ArUtils, type ArCursoredIds } from '../../utils/arweave.utils';

export type PostItem = {
	tx: ArCursoredIds;
	data: PostData;
};

export class AppState {
	mode: 'All' | 'Friends' = $state('All');
	list: SvelteMap<string, PostItem | undefined> = $state(new SvelteMap([]));
	scrollPosition = $state(0);

	private cursor: string | undefined = $state();

	hasMore = $derived(!!this.cursor);
	constructor() {
		this.queryList();
	}

	queryList(mode?: 'All' | 'Friends'): void {
		if (mode) {
			this.mode = mode;
		}
		this.cursor = undefined;
		switch (this.mode) {
			case 'All':
				this.queryAll();
				break;
			case 'Friends':
				break;
			default:
				break;
		}
	}

	queryAll(): Promise<void> {
		return ArUtils.bundler.getPostsIds(this.cursor).then((txIds) => {
			this.list = new SvelteMap(txIds.map((tx) => [tx.node.id, undefined]));
			this.cursor = txIds[txIds.length - 1]?.cursor || undefined;
			txIds.forEach((txId) => {
				ArUtils.bundler.txById<PostData>(txId.node.id).then((postData) => {
					this.list.set(txId.node.id, {
						tx: txId,
						data: postData
					});
				});
			});
		});
	}
}

const APP_STATE_KEY = 'app-state';

export function setAppState(): AppState {
	return setContext(APP_STATE_KEY, new AppState());
}

export function getAppState(): AppState {
	return getContext<AppState>(APP_STATE_KEY);
}
