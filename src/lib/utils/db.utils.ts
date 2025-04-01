import Dexie, { type EntityTable } from 'dexie';
import type { PostAge } from '../models/post.model';

export type Profile = {
	address: string;
	key: JsonWebKey;
};

// export type Watcher = {
// 	id: string;
// 	data: {
// 		type: "set-price" | "payment";
// 	};
// };

export type Bucket = {
	name: string;
	open: boolean;
	contributors?: string[];
	age?: PostAge[];
	img?: string;
};

export type Friend = {
	id: string;
};

export type Chat = {
	userId: string;
	roomId: string;
	messages: ChatMessage[];
};
export type ChatMessage = {
	fromId: string;
	message: string;
	timestamp: number;
};

export type DbEntry<T> = {
	address: string;
	data: T;
};

export class DB {
	static db = new Dexie('veracy') as Dexie & {
		profile: EntityTable<Profile, 'address'>;
		friends: EntityTable<DbEntry<Friend[]>, 'address'>;
		buckets: EntityTable<DbEntry<Bucket[]>, 'address'>;
		// watcher: EntityTable<DbEntry<Watcher[]>, 'address'>;
		chats: EntityTable<DbEntry<Chat[]>, 'address'>;
	};

	static async init(): Promise<void> {
		this.db.version(1).stores({
			profile: '&address',
			friends: '&address',
			buckets: '&address, data.name',
			chats: '&address data.roomId data.userId'
		});
	}

	static friends = {
		get: () => {
			
		}
	}
}
