export function fetchCategories () {
  
    var request = new Request('http://localhost:3001/categories', {
	    headers: new Headers({
		    'Authorization': 'whatever'
	    })
    });

    return fetch(request)
        .then((res) => res.json())
}

export function fetchPosts () {
  
    var request = new Request('http://localhost:3001/posts', {
	    headers: new Headers({
		    'Authorization': 'whatever'
	    })
    });

    return fetch(request)
        .then((res) => res.json())
}

