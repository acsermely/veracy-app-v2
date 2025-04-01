import Arweave from 'arweave';
import type Transaction from 'arweave/node/lib/transaction';
import {
	ARWEAVE_PORT,
	ARWEAVE_PROTOCOL,
	ARWEAVE_URL,
	BUNDLER_URL,
	REQUEST_TIMEOUT,
	TX_APP_JSON_CONTENT_TYPE,
	TX_APP_NAME,
	TX_APP_VERSION,
	TxType
} from '../constants';
import type { PostData } from '../models/post.model';

export class ArUtils {
	static arweave = Arweave.init({
		host: ARWEAVE_URL,
		port: ARWEAVE_PORT,
		protocol: ARWEAVE_PROTOCOL,
		timeout: REQUEST_TIMEOUT,
		logging: false
	});

	static bundler = {
		txById: <T>(txId: string): Promise<T> => {
			if (!txId) {
				throw 'Missing TxId';
			}
			return fetch(`${BUNDLER_URL}/${txId}`)
				.then((response) => response.json())
				.then((data) => data as T);
		},

		getPostsIds: (cursor?: string, friends?: string[]): Promise<ArCursoredIds[]> => {
			return runQuery<ArCursoredIds>(queryPosts(cursor, friends));
		}
	};

	static tx = {
		postTx: async (data: PostData): Promise<Transaction> => {
			const stringData = JSON.stringify(data);
			let tx = await this.arweave.createTransaction({
				data: stringData
			});
			tx.addTag('App-Name', TX_APP_NAME);
			tx.addTag('Content-Type', TX_APP_JSON_CONTENT_TYPE);
			tx.addTag('Version', TX_APP_VERSION);
			tx.addTag('Type', TxType.POST);
			tx.addTag('Age', data.age);
			return tx;
		}
	};
}

export type ArQueryResult<T> = {
	data: {
		transactions: {
			edges: Array<T>;
		};
	};
};

export type ArCursoredIds = {
	node: {
		id: string;
		timestamp: any;
	};
	cursor: string;
};

async function runQuery<T>(
	query: Object,
	gateway = BUNDLER_URL,
	accept = 'application/json'
): Promise<Array<T>> {
	const headers = new Headers({});
	headers.append('content-type', 'application/json');
	headers.append('accept', accept);
	return fetch(`${gateway}/graphql`, {
		method: 'POST',
		body: JSON.stringify(query),
		signal: AbortSignal.timeout(REQUEST_TIMEOUT),
		headers
	})
		.then((response) => response.json())
		.then((data: ArQueryResult<T>) => data.data.transactions.edges as Array<T>);
}

function queryPosts(cursor?: string, friends?: string[]) {
	return {
		query: `{
		transactions(
			${friends?.length ? 'owners: ["' + friends.join('","') + '"],' : ''}
			order: DESC,
			limit: 10,
			timestamp: {from: 1728246095432, to: ${new Date().getTime()}},
			${cursor ? 'after: "' + cursor + '",' : ''}
            tags: [
                { name: "App-Name", values: ["${TX_APP_NAME}"]},
                { name: "Version", values: ["${TX_APP_VERSION}"]},
                { name: "Type", values: ["${TxType.POST}"]}
            ]
        ) 
        {
            edges {
				node {
					id,
					timestamp
				},
				cursor
			}
        }
    }`
	};
}
