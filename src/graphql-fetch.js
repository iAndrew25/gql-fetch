const isFunction = fn => typeof fn === 'function';

const getBody = (body, middleware = {}) => ({
	method: 'POST',
	body: JSON.stringify(body),
	...middleware
});

async function customFetch(url, middleware, body, afterware) {
	try {
		let bodyOptions = isFunction(middleware) ? await getBody(body, middleware()) : getBody(body),
			response = await fetch(url, bodyOptions);

		isFunction(afterware) && afterware(response);

		return await response.json();
	} catch(error) {
		return Promise.reject();
	}
}

export default (url, middleware, afterware) => body => customFetch(url, middleware, body, afterware);