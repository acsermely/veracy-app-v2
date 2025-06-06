export type PostContentType = 'TEXT' | 'IMG';
export type PostContentPrivacy = 'PUBLIC' | 'PRIVATE';
export type PostContentAlign = 'left' | 'center' | 'right';
export type PostAge = '12+' | '16+' | '18+';

export type PostData = {
	id: string;
	content: PostContent[];
	age: PostAge;
	uploader: string;
	ref?: string;
	lang?: string;
};

export type PostContent = {
	type: PostContentType;
	privacy: PostContentPrivacy;
	data: string;
	hash: string;
	align?: PostContentAlign;
};

export const genPostId = (): string => {
	return Date.now().toString(36);
};
