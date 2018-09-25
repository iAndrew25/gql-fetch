const isFunction = fn => typeof fn === 'function';

const getBody = (body, middleware = {}) => ({
	method: 'POST',
	body: JSON.stringify(body),
	...middleware
});

async function customFetch(url, middleware, body, afterware) {
	try {
		let bodyOptions = isFunction(middleware) ? getBody(body, middleware()) : getBody(body),
			response = await fetch(url, bodyOptions);

		isFunction(afterware) && isFunction(response);

		return await response.json();
	} catch(error) {
		console.log("error", error);
	}
}

export default (url, middleware, afterware) => body => customFetch(url, middleware, body, afterware);