export const fetchAllPostsAPI = async (searchRequests) => {
  const response = await fetch('/api/get_all_posts', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(searchRequests)// {sortOrder: sortOrder, tags: tags}
  }
  ) 
  
  // Validate [{postID, title}]
  
  return response.json()
}

export const fetchPostDetailAPI = async (postID) => {
  const response = await fetch("/api/get_post", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({'postID': postID})
  })

  // Validate

  return response.json()
}

export const createPostAPI = async (postDetails) => {
  const response = await fetch("/api/create_post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postDetails) // {title: title, body: body, tags: tags}
  })

  // Validate

  return response.json()
}

export const upvotePostAPI = async (postID) => {
  const response = await fetch("/api/upvote", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }, 
    body: JSON.stringify({postID: postID})
  })

  return response.json() // not sure what to return 
}

export const downvotePostAPI = async (postID) => {
  const response = await fetch("/api/downvote", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }, 
    body: JSON.stringify({postID: postID})
  })

  return response.json() // not sure what to return 
}

export const answerPostAPI = async (postID, body) => {
  const response = await fetch("/api/create_comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({postID: postID, body: body})
  })

  return response.json()
}
