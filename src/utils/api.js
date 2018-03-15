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
