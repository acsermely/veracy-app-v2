export const POST_MAX_NUMBER_OF_CONTENT = 6;

const URL_EXP =
	/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
export const URL_REGEX = new RegExp(URL_EXP);
