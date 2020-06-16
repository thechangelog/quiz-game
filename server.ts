import { createServer, IncomingMessage, ServerResponse } from 'http';
import fetch from 'node-fetch';
import * as FormData from 'form-data';
import * as url from 'url';

const port = 8888;
let bearer: string;

/**
 * Fetch the Twitter API bearer token using the API Key and API Secret.
 * To obtain, create a new application https://developer.twitter.com/en/apps
 * @param key The API Key
 * @param secret The API Secret
 */
async function getToken(
	key: string = process.env.TWITTER_API_KEY!,
	secret: string = process.env.TWITTER_API_SECRET!
) {
	const body = new FormData();
	body.append('grant_type', 'client_credentials');
	const response = await fetch('https://api.twitter.com/oauth2/token', {
		method: 'POST',
		headers: {
			Authorization: 'Basic ' + Buffer.from(`${key}:${secret}`).toString('base64')
		},
		body
	});
	const json = await response.json();
	bearer = json.access_token;
}

getToken();

const requestHandler = async (req: IncomingMessage, res: ServerResponse) => {
	const { handle } = url.parse(req.url!, true).query;
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	res.setHeader('Access-Control-Allow-Headers', '*');
	const json = await (
		await fetch(`https://api.twitter.com/1.1/users/show.json?screen_name=${handle}`, {
			headers: {
				Authorization: `Bearer ${bearer}`
			}
		})
	).json();

	// the url provided is to a low-resolution version of the image. Remove '_normal'
	// to get a higher quality version.
	const avatarUrl = json.profile_image_url_https.replace('_normal', '');
	const avatar = await fetch(avatarUrl);
	res.setHeader('Content-Type', 'image/jpeg');
	avatar.body.pipe(res);
};

const server = createServer(requestHandler);

server.listen(port, (err: any) => {
	if (err) {
		return console.log('something happened', err);
	}

	console.log(`server listening on port ${port}`);
});
