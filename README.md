# GraphQL Fetch

## Example
```javascript
import gqlFetch from 'gql-fetch';

function middleware() {
	/* do whatever you want */

	return {
		headers: {
			'Content-Type': 'application/json',
		}
	}
}

function afterware(response) {
	if(response.statusCode === 200) {
		console.log('OK');
	} else {
		console.log('NOT OK');
	}
}

const decoratedGqlFetch = gqlFetch('http://example.com/graphql', middleware, afterware);

decoratedGqlFetch({
	query: `query {
		user {
			name
			email
		}
	}`
});
```