export const fetchAllPostsAPI = async (sortOrder, tags) => {
  const response = await fetch('/api/get_all_posts', {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({sortOrder: sortOrder, tags: tags})
  }
  ) 
  
  // Validate [{postID, title}]
  
  return response.posts
}

export const fetchPostDetailAPI = async (postID) => {
  const response = await fetch("/api/get_post", {
    method: "GET", 
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({'postID': postID})
  })

  // Validate

  return response
}

export const createPostAPI = async (title, body, tags) => {
  const response = await fetch("/api/create_post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({title: title, body: body, tags: tags})
  })

  // Validate

  return response
}

export const upVotePost = async (postID) => {
  const response = await fetch("/api/upvote", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }, 
    body: JSON.stringify({postID: postID})
  })

  return response // not sure what to return 
}

export const downVotePost = async (postID) => {
  const response = await fetch("/api/downvote", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }, 
    body: JSON.stringify({postID: postID})
  })

  return response // not sure what to return 
}

export const answerPost = async (postID, body) => {
  const response = await fetch("/api/create_comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({postID: postID, body: body})
  })

  return response
}
