export class NodeUtils {
	static async getImages(host: string, imgId: string, txId: string): Promise<string> {
		return fetch(`${host}/img?id=${imgId}&tx=${txId}`).then((response) => {
			if (response.ok) {
				return response.text();
			} else if (response.status == 402) {
				throw response.status.toString();
			}
			throw response.statusText;
		});
	}
}
