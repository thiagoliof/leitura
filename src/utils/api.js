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

export function fetchPost (id) {
  
    var request = new Request(`http://localhost:3001/posts/${id}`, {
	    headers: new Headers({
		    'Authorization': 'whatever'
	    })
    });

    return fetch(request)
        .then((res) => res.json())
}



export function votePost (id, valueVote) {

    return fetch(`http://localhost:3001/posts/${id}`, {
        method: 'POST',
        headers: {
            'Authorization': 'whatever',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            option: valueVote,
        })
    }).then((res) => res.json())
}

export function addPost (id, timestamp, title, body, author, category) {

    return fetch(`http://localhost:3001/posts/`, {
        method: 'POST',
        headers: {
            'Authorization': 'whatever',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id:id,
            timestamp:timestamp,
            title: title,
            body: body,
            author: author,
            category: category
        })
    }).then((res) => res.json())
}

export function editPost (id, timestamp, title, body, author, category) {

    return fetch(`http://localhost:3001/posts/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': 'whatever',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            body: body,
            author: author,
            category: category
        })
    }).then((res) => res.json())
}

export function deletePost (id) {

    return fetch(`http://localhost:3001/posts/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'whatever',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            deleted: true,
        })
    }).then((res) => res.json())
}

export function fetchComents (id) {
  
    var request = new Request(`http://localhost:3001/posts/${id}/comments`, {
	    headers: new Headers({
		    'Authorization': 'whatever'
	    })
    });

    return fetch(request)
        .then((res) => res.json())
}