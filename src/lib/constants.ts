export const POST_MAX_NUMBER_OF_CONTENT = 6;

const URL_EXP =
	/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
export const URL_REGEX = new RegExp(URL_EXP);

// GATEWAYS
export const ARWEAVE_URL = 'arweave.net';
export const ARWEAVE_PORT = 443;
export const ARWEAVE_PROTOCOL = 'https';
export const BUNDLER_URL = 'https://node2.irys.xyz';
export const DEFAULT_NODE_URL = 'https://veracy.app:8080';

// TEST GATEWAYS
// export const ARWEAVE_URL = 'localhost';
// export const ARWEAVE_PORT = 1984;
// export const ARWEAVE_PROTOCOL = 'http';
// export const BUNDLER_URL = 'https://devnet.irys.xyz';
// export const DEFAULT_NODE_URL = 'http://localhost:8080';

// POSTS
export const TX_APP_NAME = 'VeracyApp';
export const TX_APP_VERSION = '0.0.5';
export const TX_APP_JSON_CONTENT_TYPE = 'application/json';
export const TX_APP_TEXT_CONTENT_TYPE = 'text/plain';

export enum TxType {
	POST = 'post',
	PROFILE = 'profile',
	BUCKET = 'bucket',
	SEND_BUCKET = 'send-to-bucket'
}

export const REQUEST_TIMEOUT = 5000;

export const LANGUAGES = [
	'en', // English
	'es', // Spanish
	'fr', // French
	'de', // German
	'zh', // Chinese
	'ja', // Japanese
	'ru', // Russian
	'hu', // Hungarian
	'it', // Italian
	'hi', // Hindi
	'pt' // Portuguese
];
